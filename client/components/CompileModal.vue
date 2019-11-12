<template>
  <form action="" @submit="$event.preventDefault()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Building {{ document }}
        </p>
      </header>
      <section class="modal-card-body">
        <CompileModalShell
          v-if="readyForWebsocket"
          :is-interactive="currentDocumentSupportsInteractive"
          :websocket-u-r-i="websocketURI + websocketPath"
          @downloadReady="enableExecutableDownload"
        />
      </section>
      <footer class="modal-card-foot">
        <b-button
          v-if="!currentDocumentSupportsInteractive"
          class="button is-secondary"
          type="button"
          :disabled="!isDownloadReady"
          @click="downloadExecutable"
        >
          Download Executable
        </b-button>
        <b-button class="button is-danger" type="button" @click="$parent.close()">
          Cancel
        </b-button>
      </footer>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import { LANGUAGE_INTERACTIVITY } from '~/plugins/compile-types'

import CompileModalShell from '~/components/CompileModalShell'

export default {
  name: 'CompileModal',
  components: { CompileModalShell },
  props: {
    document: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isDownloadReady: false,
      websocketPath: '',
      readyForWebsocket: false
    }
  },
  computed: {
    currentDocumentSupportsInteractive () {
      const currentDocumentMode = this.$store.state.documents[this.document].mode
      return LANGUAGE_INTERACTIVITY[currentDocumentMode]
    },
    websocketURI () {
      return process.env.websocketURI
    },
    documentBaseName () {
      return this.document.substr(this.document.lastIndexOf('/'))
    }
  },
  mounted () {
    this.uploadSource()
  },
  methods: {
    uploadSource () {
      const self = this
      this.$root.$emit('editor/command', (editor) => {
        const packagedSource = {
          name: this.documentBaseName,
          author: this.$store.state.documents[this.document].compileOptions.author,
          lang: this.$store.state.documents[this.document].mode,
          content: editor.getSession().getDocument().getAllLines()
        }
        axios.post(process.env.apiURI + process.env.apiCompileEndpoint, packagedSource)
          .then(({ data }) => {
            this.websocketPath = data
            this.readyForWebsocket = true
          })
          .catch((error) => {
            this.$buefy.snackbar.open({
              duration: 5000,
              message: 'An error occurred while uploading your file: ' + error,
              type: 'is-danger',
              position: 'is-bottom-right',
              actionText: 'Retry',
              onAction () {
                self.uploadSource()
              }
            })
          })
      })
    },
    downloadExecutable () {
      // TODO: Download compiled binary
    },
    enableExecutableDownload () {
      this.isDownloadReady = true
    }
  }
}
</script>

<style>

</style>
