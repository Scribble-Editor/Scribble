<template>
  <div class="container">
    <div class="section">
      <h2 class="subtitle is-2">
        Welcome!
      </h2>
      <h4 class="title is-4">
        Create a file and Scribble something down.
      </h4>
      <div class="image">
        <img src="~/assets/EditorTextareaWelcomeIllustration.svg" alt="Welcome Illustration">
      </div>
      <button class="button is-primary" @click="newFile">
        New File
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getModeForPath } from '~/plugins/ace-modelist'

export default {
  name: 'EditorTextareaWelcome',
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

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr min-content;
  height: 100%;
}

.image {
  display: flex;
  justify-content: center;

  img {
    width: 50%
  }
}

h2, h4 {
  text-align: center !important;
}

button {
  width: 40%;
  margin: 0 auto;
}
</style>
