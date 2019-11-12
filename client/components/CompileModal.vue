<template>
  <form action="" @submit="$event.preventDefault()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Building {{ document }}
        </p>
      </header>
      <section class="modal-card-body">
        <CompileModalShell :is-interactive="currentDocumentSupportsInteractive" />
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
      isDownloadReady: false
    }
  },
  computed: {
    currentDocumentSupportsInteractive () {
      const currentDocumentMode = this.$store.state.documents[this.document].mode
      return LANGUAGE_INTERACTIVITY[currentDocumentMode]
    }
  },
  methods: {
    downloadExecutable () {
      // TODO: Download compiled binary
    }
  }
}
</script>

<style>

</style>
