<template>
  <div class="container">
    <b-navbar class="navigation">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img class="logo-image" src="~/assets/ScribbleLogoFull.svg" alt="A text editor in the browser">
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item :to="{ path: '/edit' }">
          Editor
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a href="" class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a href="" class="button is-secondary">
              Log in
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped>
.container {
  padding: 1.5rem;
}

.navigation {
  height: 80px;
}

.logo-image {
  max-height: 2.5rem !important;
}
</style>
