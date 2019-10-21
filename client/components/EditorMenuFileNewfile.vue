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
          // TODO: Automatically detect mode during file creation

          if (this.$store.state.documents[fileName]) {
            this.$buefy.toast.open({
              duration: 5000,
              message: 'A file with that name already exists',
              type: 'is-danger'
            })
          } else {
            this.addDocument({ name: fileName, content: '', mode: 'text' })
            this.$root.$emit('openDocument', fileName)
            this.$root.$emit('updateTree')
          }
        }
      })
    },
    ...mapMutations({
      addDocument: 'documents/add'
    })
  }
}
</script>
