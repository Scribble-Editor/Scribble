<template>
  <div />
</template>

<script>
import { logout as logoutMiddleware } from '~/middleware/authentication'

export default {
  layout: 'form',
  head () {
    return {
      title: 'Scribble - Log Out'
    }
  },
  middleware: logoutMiddleware
}
</script>
