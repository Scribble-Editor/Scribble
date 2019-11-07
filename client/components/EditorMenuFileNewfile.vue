<template>
  <span @click="newFile">New File</span>
</template>

<script>
import { mapMutations } from 'vuex'
import { getModeForPath } from '~/plugins/ace-modelist'

export default {
  name: 'EditorMenuFileNewfile',
  methods: {
    newFile () {
      this.$buefy.dialog.prompt({
        message: 'File name:',
        inputAttrs: { placeholder: 'e.g. myFile.cpp' },
        trapFocus: true,
        onConfirm: (fileName) => {
          if (this.$store.state.documents[fileName]) {
            this.$buefy.toast.open({
              duration: 5000,
              message: 'A file with that name already exists',
              type: 'is-danger'
            })
          } else if (
            fileName.match(/^\//) || // File name begins with /
            fileName.match(/\/$/) || // File name ends with /
            fileName.match(/\/{2,}/) || // File name contains more than one consecutive /
            fileName.match(/\\/) // File name contains \
          ) {
            this.$buefy.toast.open({
              duration: 5000,
              message: 'Invalid file name',
              type: 'is-danger'
            })
          } else {
            this.addDocument({ name: fileName, content: '', mode: getModeForPath(fileName).name })
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
