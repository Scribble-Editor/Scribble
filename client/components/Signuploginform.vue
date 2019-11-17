<template>
  <section class="form-section">
    <slot />
    <b-message v-if="error" type="is-danger" has-icon>
      {{ error }}
    </b-message>
  </section>
</template>

<script>
export default {
  name: 'Signuploginform',
  props: {
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.form-section {
  margin-top: 4rem;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
  background: url("https://static.vecteezy.com/packs/media/components/home/masthead/img/lavakidneys_800x400@2x-2db5e5a0c944e2b16a11a18674570f76.jpg");
  background-size: cover;

  label {
    color: white;
  }

  p.help.is-danger {
    color: white !important;
  }

  article.message {
    margin-top: 1rem;
  }
}
</style>
