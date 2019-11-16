<template>
  <section class="steps container">
    <p class="title">
      Get your project running in 3 steps
    </p>

    <b-steps
      v-model="currentStep"
      size="is-large"
      :has-navigation="false"
      @mouseenter.native="isHovering = true"
      @mouseleave.native="isHovering = false"
    >
      <b-step-item label="Create" icon="file-document-edit-outline" clickable>
        <img src="~/assets/StepsCreate.svg" alt="Create a file">
        <p class="subtitle is-4">
          Create a new project. Or maybe upload one you are already working on.
        </p>
      </b-step-item>
      <b-step-item label="Scribble" icon="pencil-outline" clickable>
        <img src="~/assets/StepsScribble.svg" alt="Scibble down your thoughts">
        <p class="subtitle is-4">
          Scribble down your all your bright ideas.
        </p>
      </b-step-item>
      <b-step-item label="Build" icon="wrench-outline" clickable>
        <img src="~/assets/StepsBuild.svg" alt="Build your project online">
        <p class="subtitle is-4">
          Build and run your creation right inside your browser.
        </p>
      </b-step-item>
    </b-steps>
  </section>
</template>

<script>
export default {
  name: 'Steps',
  data () {
    return {
      currentStep: 0,
      STEP_TIMEOUT: 4000, // ms,
      NUM_STEPS: 3,
      isHovering: false
    }
  },
  mounted () {
    const self = this
    setInterval(() => {
      self.advanceSteps()
    }, this.STEP_TIMEOUT)
  },
  methods: {
    advanceSteps () {
      if (this.isHovering) { return }

      if (this.currentStep + 1 === this.NUM_STEPS) {
        this.currentStep = 0
      } else {
        ++this.currentStep
      }
    }
  }
}
</script>

<style lang="scss">
.steps {
  margin-top: 4rem;

  .title, .subtitle {
    text-align: center;
  }

  .title {
    margin-top: 4rem;
  }

  img {
    max-height: 380px;
    max-width: 100%;
    margin: 2rem auto;
    display: inherit;
  }
}
</style>
