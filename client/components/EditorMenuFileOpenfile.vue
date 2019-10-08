<template>
  <label>
    <span>Open File</span>
    <form>
      <input id="open-file-input" type="file" @change="openFile($event.target.files[0])">
    </form>
  </label>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'EditorMenuFileOpenfile',
  methods: {
    openFile (fileData) {
      this.createFile(fileData.name)
      fileData.text().then((text) => {
        this.updateFileContent({ file: fileData.name, content: text })
        this.changeSelectedFile(fileData.name)
      })
    },
    ...mapMutations({
      createFile: 'openFiles/createFile',
      updateFileContent: 'openFiles/updateFileContent',
      changeSelectedFile: 'openFiles/changeSelectedFile'
    })
  }
}
</script>

<style lang="scss" scoped>
  label {
    cursor: pointer;
    width: 100%;
  }

  form {
    display: none;
  }
</style>
