<template>
  <Signuploginform :error="responseError">
    <form action="" @submit.prevent="handleSubmit">
      <b-field label="Username" :message="error.element === 'username' && error.message" :type="error.element === 'username' ? 'is-danger' : ''">
        <b-input v-model="username" placeholder="Username" type="text" icon="account" />
      </b-field>
      <b-field label="Password" :message="error.element === 'password' && error.message" :type="error.element === 'password' ? 'is-danger' : ''">
        <b-input v-model="password" placeholder="Password" type="password" icon="key" password-reveal />
      </b-field>
      <button class="button is-primary" type="submit">
        Log in
      </button>
    </form>
  </Signuploginform>
</template>

<script>
import { mapActions } from 'vuex'

import Signuploginform from '~/components/Signuploginform'

export default {
  name: 'Loginform',
  components: { Signuploginform },
  data () {
    return {
      username: '',
      password: '',
      error: {
        element: '',
        message: ''
      },
      responseError: ''
    }
  },
  methods: {
    async handleSubmit () {
      // No username provided
      if (this.username.length < 1) {
        this.error.element = 'username'
        this.error.message = 'Cannot be empty'
        return
      }

      // No password provided
      if (this.password.length < 1) {
        this.error.element = 'password'
        this.error.message = 'Cannot be empty'
        return
      }

      // Reset any previous error messages
      this.error.element = ''
      this.error.message = ''

      // Login to user account
      const error = await this.login({ username: this.username, password: this.password })
      if (error) {
        this.responseError = (error && error.repsonse && error.response.data.error) || error
        return
      }

      // Redirect to editor
      this.$router.push('/edit')
    },
    ...mapActions({ login: 'authentication/login' })
  }
}
</script>
