class FileDrop {
  files = [];
  hostUri = null;

  constructor(target, hostUri) {
    // If target is passed as CSS selector, convert to DOM object
    if (typeof target === "string") {
      try {
        target = document.querySelector(target);
      } catch (e) {
        throw e;
      }
    }

    // Validate that the DOM object is a form
    if (typeof target !== "object" || target.tagName !== "FORM")
      throw new Error("target is not a form element");
    this.rootElem = target;

    // Validates that there is a child element called .file-drop__file-display
    this.fileDisplayElem = target.querySelector('.file-drop__file-display');
    if (!this.fileDisplayElem)
      throw new Error("target does not contain child .file-drop__file-display");

    // Add drop event listener to FileDrop root
    this.rootElem.addEventListener('drop', this.dropHandler.bind(this), false);
    this.rootElem.addEventListener('dragover', this.dragOverHandler.bind(this), false);
    this.rootElem.addEventListener('dragleave', this.dragLeaveHandler.bind(this), false);
    this.rootElem.addEventListener('dragend', this.dragLeaveHandler.bind(this), false);

    // Validate host uri
    this.hostUri = hostUri;
    if (!typeof this.hostUri === "string")
      throw new Error("Host URI must be of type string");
  }

  pushFile(file) {
    this.files.push(file);
    this.updateFileDisplay();
    file.upload(this.hostUri, e => {
      if (e.lengthComputable) {
        console.log(e.loaded + '/' + e.total);
      }
    }, e => {
      console.log('done');
    });
  }

  async updateFileDisplay() {
    for (let file of this.files) {
      file.toBase64()
        .then(data => {
          this.fileDisplayElem.innerHTML += `<img src="${data}">`;
        });
    }
  }

  // Event handlers
  dropHandler = e => {
    e.preventDefault();
    this.dragLeaveHandler();

    if (e.dataTransfer.items) {
      for (let item of e.dataTransfer.items) {
        if (item.kind === "file") {
          this.pushFile(new FileUpload(item.getAsFile()));
        }
      }
    } else {
      for (let item of e.dataTransfer.files) {
        this.pushFile(new FileUpload(item.getAsFile()));
      }
    }
  }

  dragOverHandler = e => {
    e.preventDefault();
    this.rootElem.classList.add("drag-over");
  }

  dragLeaveHandler = e => {
    this.rootElem.classList.remove("drag-over");
  }
}

class FileUpload {
  constructor(file) {
    this.file = file;
  }

  async toBase64() {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader;
      fileReader.readAsDataURL(this.file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = err => reject(err);
    });
  }

  async toBinary() {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader;
      fileReader.readAsBinaryString(this.file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = err => resolve(err);
    })
  }

  async upload(host, prog, end) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest;
      xhr.open("POST", host);
      xhr.upload.onprogress = e => {
        if (prog) prog(e);
      };
      xhr.upload.onloadend = e => {
        if (end) end(e);
        resolve();
      };
      try {
        this.toBinary()
          .then(bin => { xhr.send(bin); });
      } catch (e) {
        reject(e);
      }
    });
  }
}