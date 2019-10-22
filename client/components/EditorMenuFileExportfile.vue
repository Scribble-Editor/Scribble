<template>
  <span @click="exportFile">Export File</span>
</template>

<script>
export default {
  name: 'EditorMenuFileExportfile',
  props: {
    activeDocument: {
      type: String,
      required: true
    }
  },
  computed: {
    activeFileContent () {
      return this.$store.state.documents[this.activeDocument].content
    }
  },
  methods: {
    exportFile () {
      const fileDownload = document.createElement('a')
      fileDownload.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.activeFileContent))
      fileDownload.setAttribute('download', this.activeDocument)

      fileDownload.style.display = 'none'
      document.body.appendChild(fileDownload)

      fileDownload.click()

      document.body.removeChild(fileDownload)
    }
  }
}
</script>
