<template>
  <Signuploginform :error="responseError">
    <form action="" @submit.prevent="handleSubmit">
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
import axios from 'axios'

import Signuploginform from '~/components/Signuploginform'

export default {
  name: 'Signupform',
  components: { Signuploginform },
  data () {
    return {
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
    handleSubmit () {
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

      axios.post(process.env.apiURI + '/signup', {
        email: this.email, password: this.password
      }).then(({ status, data }) => {
        // Success
        if (status !== 200) {
          this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
          this.router.push('/edit')
        // Error
        } else {
          this.responseError = data
        }
      }).catch((error) => {
        this.responseError = error
      })
    }
  }
}
</script>
