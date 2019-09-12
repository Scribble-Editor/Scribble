class FileDrop {
  isUploading = false;

  constructor(target, host) {
    if (typeof target !== "string")
      throw new Error("target must be of type string");
    this.rootElem = document.querySelector(target);
    if (!this.rootElem)
      throw new Error("No DOM element found with the selector " + target);

    this.rootElem.addEventListener("dragover", e => e.preventDefault(), false);
    this.rootElem.addEventListener("drop", this.dropHandler.bind(this), false);
    this.rootElem.addEventListener("dragenter", () =>
      this.rootElem.querySelector(".file-drop__dropzone").classList.add('dragover'),
      false);
    this.rootElem.addEventListener("dragleave", () =>
      this.rootElem.querySelector(".file-drop__dropzone").classList.remove('dragover'),
      false);
    this.rootElem.addEventListener("dragend", () =>
      this.rootElem.querySelector(".file-drop__dropzone").classList.remove('dragover'),
      false);
    this.rootElem.addEventListener("change", this.formHandler.bind(this), false);

    this.host = host;
    if (typeof this.host !== "string")
      throw new Error("host must be of type string");

    this.getTemplate()
      .then(template => { this.rootElem.innerHTML = template });
  }

  dropHandler(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    this.uploadFile(file, this);
  }

  formHandler() {
    const file = this.rootElem.querySelector('input[type="file"]').files[0];
    this.uploadFile(file, this);
  }
}

FileDrop.prototype.getTemplate = async () => {
  return new Promise(resolve => {
    fetch("filedrop.html")
      .then(res => res.text())
      .then(template => resolve(template));
  });
}

FileDrop.prototype.uploadFile = async (file, self) => {
  return new Promise((resolve, reject) => {
    if (self.isUploading) {
      resolve();
    }
    isUploading = true;
    self.rootElem.querySelector('.file-drop__dropzone').classList.add('disabled');
    let formData = new FormData;
    formData.append('file', file);
    let ajax = new XMLHttpRequest;

    // Progress Handler
    ajax.upload.addEventListener('progress', e => {
      const percent = Math.round((e.loaded / e.total) * 100);
      self.rootElem.querySelector('progress').value = percent;
      self.rootElem.querySelector('.file-drop__status').innerHTML = percent + '%';
    }, false);

    // Done Handler
    ajax.addEventListener("load", e => {
      self.rootElem.querySelector('.file-drop__status').innerHTML = 'Done!';
    }, false);

    // Error Handler
    ajax.addEventListener("error", e => {
      console.error(e);
      self.rootElem.querySelector('progress').value = 0;
      self.rootElem.querySelector('.file-drop__status').innerHTML = 'Upload failed';
    }, false);

    // Abort Handler
    ajax.addEventListener("abort", e => {
      self.rootElem.querySelector('progress').value = 0;
      self.rootElem.querySelector('.file-drop__status').innerHTML = 'Upload aborted';
    }, false);

    ajax.open("POST", self.host);
    ajax.send(formData);
  });
}