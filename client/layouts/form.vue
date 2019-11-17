<template>
  <div>
    <Navbar />
    <div class="form-wrapper">
      <nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: { Navbar }
}
</script>
