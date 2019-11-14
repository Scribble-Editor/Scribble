<template>
  <section>
    <div class="container">
      <b-navbar class="navigation">
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img class="logo-image" src="~/assets/ScribbleLogoFull.svg" alt="A text editor in the browser">
          </b-navbar-item>
        </template>
        <template slot="end">
          <b-navbar-item tag="router-link" :to="{ path: '/edit' }">
            Editor
          </b-navbar-item>
          <b-navbar-item tag="div">
            <div class="buttons">
              <nuxt-link to="/signup" class="button is-primary">
                <strong>Sign up</strong>
              </nuxt-link>
              <nuxt-link to="/login" class="button is-secondary">
                Log in
              </nuxt-link>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped>
.navigation {
  height: 80px;
}

.logo-image {
  max-height: 2.5rem !important;
}

a.navbar-item {
  height: min-content;
  border-radius: 4px;
  align-self: center;
}
</style>
