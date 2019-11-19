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
import axios from 'axios'

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
    handleSubmit () {
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
      }

      // Reset any previous error messages
      this.error.element = ''
      this.error.message = ''

      axios.post(process.env.apiURI + '/login', {
        username: this.username, password: this.password
      }).then(({ status, data }) => {
        // Success
        if (status !== 200) {
          // TODO: Handle token storage
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
