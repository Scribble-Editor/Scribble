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
import { getModeForPath } from '~/plugins/ace-modelist'

export default {
  name: 'EditorMenuFileOpenfile',
  methods: {
    openFile (fileData) {
      if (this.$store.state.documents[fileData.name]) {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'A file with that name already exists',
          type: 'is-danger'
        })
      } else {
        fileData.text().then((fileContent) => {
          this.addDocument({ name: fileData.name, content: fileContent, mode: getModeForPath(fileData.name).name })
          this.$root.$emit('openDocument', fileData.name)
          this.$root.$emit('updateTree')
        })
      }
    },
    ...mapMutations({
      addDocument: 'documents/add'
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
