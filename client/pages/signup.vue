<template>
  <div>
    <Signupform />
    <section class="login-section">
      <span>Already have an account? <nuxt-link to="/login">Log in</nuxt-link> instead.</span>
    </section>
  </div>
</template>

<script>
import Signupform from '~/components/Signupform'

export default {
  layout: 'form',
  components: { Signupform }
}
</script>

<style lang="scss">
@import '~/assets/buefy.overrides';

.login-section {
  color: $grey;
  text-align: center;
  margin-top: 1rem;
}
</style>
