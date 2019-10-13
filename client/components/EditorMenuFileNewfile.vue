<template>
  <span @click="newFile">New File</span>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'EditorMenuFileNewfile',
  methods: {
    newFile () {
      this.$buefy.dialog.prompt({
        message: 'File name:',
        inputAttrs: { placeholder: 'e.g. myFile.cpp' },
        trapFocus: true,
        onConfirm: (fileName) => {
          this.createFile(fileName)
          this.changeSelectedFile(fileName)
        }
      })
    },
    ...mapMutations({
      createFile: 'openFiles/createFile',
      changeSelectedFile: 'openFiles/changeSelectedFile'
    })
  }
}
</script>
