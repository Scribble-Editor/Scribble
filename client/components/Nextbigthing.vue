<template>
  <div class="hero next-big-thing">
    <div class="hero-body container">
      <div class="columns">
        <div class="column is-8 is-12-mobile text-column">
          <p class="title is-4">
            So, ready to dive into your next big project?
          </p>
          <nuxt-link to="/signup">
            <button class="button is-primary">
              Scribble it down
            </button>
          </nuxt-link>
        </div>
        <div class="column is-4 is-0-mobile">
          <img src="~/assets/NextBigThing.svg" alt="Start using scribble">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nextbigthing'
}
</script>

<style lang="scss">
.next-big-thing {
  .text-column {
    margin-top: 2rem;
  }
}
</style>
