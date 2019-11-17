<template>
  <div>
    <Loginform />
    <section class="login-section">
      <span>Looking to create an account? <nuxt-link to="/signup">Sign up</nuxt-link> instead.</span>
    </section>
  </div>
</template>

<script>
import Loginform from '~/components/Loginform'

export default {
  layout: 'form',
  components: { Loginform }
}
</script>
