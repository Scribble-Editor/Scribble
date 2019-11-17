<template>
  <div>
    <div class="edit-page">
      <Editor />
    </div>
    <section class="landscape-error-message">
      <b-message type="is-danger" has-icon class="message">
        To use this app, please rotate your device to landscape mode
      </b-message>
    </section>
  </div>
</template>

<script>
import Editor from '~/components/Editor'

export default {
  layout: 'singlePage',
  components: { Editor },
  middleware: 'auth'
}
</script>

<style lang="scss" scoped>

@media screen and (orientation: portrait) {
  .edit-page {
    display: none;
  }

  .landscape-error-message {
    display: flex !important;
  }
}

.landscape-error-message {
  display: none;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .message {
    width: 80%;
    display: block;
    margin: 0 auto;
    align-self: center;
  }

}

</style>
