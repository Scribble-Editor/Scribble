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

.container {
  @media only screen and (max-width: 1024px) {
    max-width: 640px;
  }

  @media only screen and (max-width: 700px) {
    padding: 0 2rem;
  }
}
</style>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: { Navbar }
}
</script>
