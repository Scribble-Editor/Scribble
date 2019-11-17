<template>
  <Signuploginform :error="responseError">
    <form action="" @submit.prevent="handleSubmit">
      <b-field label="Email" :message="error.element === 'email' && error.message" :type="error.element === 'email' ? 'is-danger' : ''">
        <b-input v-model="email" placeholder="Email" type="email" icon="mail" />
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
import axios from 'axios'

import Signuploginform from '~/components/Signuploginform'

export default {
  name: 'Loginform',
  components: { Signuploginform },
  data () {
    return {
      email: '',
      password: '',
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
      }

      // Reset any previous error messages
      this.error.element = ''
      this.error.message = ''

      axios.post(process.env.apiURI + '/login', {
        email: this.email, password: this.password
      }).then(({ status, data }) => {
        // Success
        if (status !== 200) {
          this.$router.push('/edit')
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

<style>

</style>
