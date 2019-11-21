<template>
  <div />
</template>

<script>
import { logout as logoutMiddleware } from '~/middleware/authentication'

export default {
  layout: 'form',
  middleware: logoutMiddleware
}
</script>
