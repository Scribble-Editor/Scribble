<template>
  <nuxt-link to="/" class="EditorMenuFileExit">
    Exit
  </nuxt-link>
</template>

<script>
export default {
  name: 'EditorMenuFileExit'
}
</script>

<style lang="scss">
@import '~/assets/buefy.overrides';

.EditorMenuFileExit {
  color: $black !important;
}
</style>
