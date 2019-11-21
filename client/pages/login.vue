<template>
  <div v-if="!isLoggedIn">
    <Loginform />
    <section class="login-section">
      <span>Looking to create an account? <nuxt-link to="/signup">Sign up</nuxt-link> instead.</span>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { forceNonAuthentication as nonAuthenticationMiddleware } from '~/middleware/authentication'

import Loginform from '~/components/Loginform'

export default {
  layout: 'form',
  components: { Loginform },
  middleware: nonAuthenticationMiddleware,
  computed: {
    ...mapGetters({ isLoggedIn: 'authentication/isLoggedIn' })
  }
}
</script>
