<template>
  <div v-if="!isLoggedIn">
    <Signupform />
    <section class="login-section">
      <span>Already have an account? <nuxt-link to="/login">Log in</nuxt-link> instead.</span>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { forceNonAuthentication as nonAuthenticationMiddleware } from '~/middleware/authentication'

import Signupform from '~/components/Signupform'

export default {
  layout: 'form',
  components: { Signupform },
  middleware: nonAuthenticationMiddleware,
  computed: {
    ...mapGetters({ isLoggedIn: 'authentication/isLoggedIn' })
  }
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
