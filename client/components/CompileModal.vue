<template>
  <form action="" @submit="$event.preventDefault()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Building {{ document }}
        </p>
      </header>
      <section class="modal-card-body">
        <CompileModalShell />
      </section>
      <footer class="modal-card-foot">
        <b-button class="button is-secondary" type="button" :disabled="!isDownloadReady" @click="downloadExecutable">
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
  methods: {
    downloadExecutable () {
      // TODO: Download compiled binary
    }
  }
}
</script>

<style>

</style>
