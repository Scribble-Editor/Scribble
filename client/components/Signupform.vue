<template>
  <Signuploginform :error="responseError">
    <form action="" @submit.prevent="handleSubmit">
      <b-field label="Username" :message="error.element === 'username' && error.message" :type="error.element === 'username' ? 'is-danger' : ''">
        <b-input v-model="username" placeholder="Username" type="text" icon="account" />
      </b-field>
      <b-field label="Email" :message="error.element === 'email' && error.message" :type="error.element === 'email' ? 'is-danger' : ''">
        <b-input v-model="email" placeholder="Email" type="email" icon="mail" />
      </b-field>
      <b-field label="Password" :message="error.element === 'password' && error.message" :type="error.element === 'password' ? 'is-danger' : ''">
        <b-input v-model="password" placeholder="Password" type="password" icon="key" password-reveal />
      </b-field>
      <b-field :type="error.element === 'password' ? 'is-danger' : ''">
        <b-input v-model="confirmPassword" placeholder="Confirm Password" type="password" icon="key" password-reveal />
      </b-field>
      <button class="button is-primary" type="submit">
        Sign Up
      </button>
    </form>
  </Signuploginform>
</template>

<script>
import { mapActions } from 'vuex'

import Signuploginform from '~/components/Signuploginform'

export default {
  name: 'Signupform',
  components: { Signuploginform },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
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

      // No email provided
      if (this.email.length < 1) {
        this.error.element = 'email'
        this.error.message = 'Cannot be empty'
        return
      }

      // No password provided
      if (this.password.length < 1) {
        this.error.element = 'password'
        this.error.message = 'Cannot be empty'
        return
      }

      // Password and password confirmation do not match
      if (this.password !== this.confirmPassword) {
        this.error.element = 'password'
        this.error.message = 'Passwords do not match'
        return
      }

      // Reset any previous error messages
      this.error.element = ''
      this.error.message = ''

      const error = await this.register({ email: this.email, username: this.username, password: this.password })
      if (error) {
        this.responseError = (error && error.repsonse && error.response.data.error) || error
        return
      }

      // Redirect to homepage
      this.$router.push('/')
    },
    ...mapActions({ register: 'authentication/register' })
  }
}
</script>
