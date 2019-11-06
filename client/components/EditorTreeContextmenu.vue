<template>
  <div class="dropdown-menu" :style="{ display: displayType, left: `${x}px`, top: `${y}px` }">
    <div class="dropdown-content">
      <a class="dropdown-item" @click="deleteItem">Delete</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorTreeItemContextmenu',
  props: {
    value: {
      type: Boolean,
      default: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    event: {
      type: MouseEvent,
      required: true
    }
  },
  computed: {
    displayType () {
      return this.value ? 'block !important' : 'none !important'
    },
    isDirectory () {
      return this.event.target.parentElement.parentElement.querySelector('.children').children.length > 0
    },
    selectedFile () {
      let qualifiedName = ''

      let currentElement = this.event.target
      while (currentElement.parentElement.parentElement.parentElement.classList.contains('menu-item-wrapper')) {
        qualifiedName = currentElement.parentElement.parentElement.querySelector('.menu-item-label').textContent +
            '/' + qualifiedName
        currentElement = currentElement.parentElement.parentElement.parentElement
      }

      return qualifiedName.substring(0, qualifiedName.length - 1)
    },
    selectedFileDisplay () {
      return this.selectedFile.includes('/')
        ? this.selectedFile.substr(this.selectedFile.lastIndexOf('/') + 1)
        : this.selectedFile
    }
  },
  mounted () {
    // Clear context menu on mouse down anywhere in document
    document.addEventListener('click', e => this.$emit('input', false), false)
  },
  methods: {
    deleteItem ($event) {
      if (!this.isDirectory) {
        this.deleteDocument(this.selectedFile)
        this.$buefy.toast.open(this.selectedFileDisplay + ' deleted')
      } else {
        const childItemMatchExpression = new RegExp(`^${this.selectedFile}`)
        const documents = Object.keys(this.$store.state.documents).filter(file => file.match(childItemMatchExpression))

        const self = this
        this.$buefy.dialog.confirm({
          message: 'You are deleting a directory. This means that this directory and all items inside it will be deleted.',
          onConfirm () {
            documents.forEach((document) => {
              self.deleteDocument(document)
            })
            this.$buefy.toast.open(self.selectedFileDisplay + ' deleted')
          }
        })
      }
    },
    deleteDocument (documentName) {
      this.$store.commit('documents/remove', documentName)
      this.$root.$emit('updateTree')
    }
  }
}
</script>

<style>
</style>
