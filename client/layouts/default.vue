<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">
.container {
  @media only screen and (max-width: 1024px) {
    max-width: 640px;
  }

  @media only screen and (max-width: 700px) {
    padding: 0 2rem;
  }
}
</style>
