<template>
  <span @click="exportFile">Export File</span>
</template>

<script>
export default {
  name: 'EditorMenuFileExportfile',
  computed: {
    selectedFile () {
      return {
        name: this.$store.state.openFiles.selectedFileName,
        ...this.$store.state.openFiles.files[this.$store.state.openFiles.selectedFileName]
      }
    }
  },
  methods: {
    exportFile () {
      const fileDownload = document.createElement('a')
      fileDownload.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.selectedFile.content))
      fileDownload.setAttribute('download', this.selectedFile.name)

      fileDownload.style.display = 'none'
      document.body.appendChild(fileDownload)

      fileDownload.click()

      document.body.removeChild(fileDownload)
    }
  }
}
</script>
