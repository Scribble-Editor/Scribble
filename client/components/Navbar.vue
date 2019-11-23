<template>
  <section>
    <div class="container navbar-container">
      <b-navbar class="navigation">
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img class="logo-image" src="~/assets/ScribbleLogoFull.svg" alt="A text editor in the browser">
          </b-navbar-item>
        </template>
        <template slot="end">
          <b-navbar-item v-if="isLoggedIn" tag="router-link" :to="{ path: '/databases' }">
            Manage Databases
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/edit' }">
            Editor
          </b-navbar-item>
          <b-navbar-item tag="div">
            <div v-if="!isLoggedIn" class="buttons">
              <nuxt-link to="/signup" class="button is-primary">
                <strong>Sign up</strong>
              </nuxt-link>
              <nuxt-link to="/login" class="button is-secondary">
                Log in
              </nuxt-link>
            </div>
            <div v-if="isLoggedIn" class="buttons">
              <nuxt-link to="/logout" class="button is-secondary">
                Log out
              </nuxt-link>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({ isLoggedIn: 'authentication/isLoggedIn' })
  }
}
</script>

<style lang="scss">
.container.navbar-container {
  @media only screen and (max-width: 1024px) {
    max-width: 640px;
  }

  @media only screen and (max-width: 700px) {
    padding: 0 2rem;
  }

  .navigation {
    height: 80px;

    .navbar-menu {
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
    }
  }

  .logo-image {
    max-height: 2.5rem !important;
  }

  a.navbar-item {
    height: min-content;
    border-radius: 4px;
    align-self: center;
  }
}
</style>
