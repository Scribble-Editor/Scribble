<template>
  <section class="landing">
    <div class="container">
      <div class="columns">
        <div class="column is-7 is-12-mobile">
          <div class="hero">
            <p class="title is-1">
              What's on your mind?
            </p>
            <p class="subtitle is-4">
              Write it down. Scribble is an online text editor where you can write and compile applications all in your browser.
            </p>
            <div class="buttons">
              <nuxt-link to="/signup" class="button is-primary">
                <strong>Sign Up for a Free Account</strong>
              </nuxt-link>
              <nuxt-link to="/edit" class="button is-secondary">
                Start Scribbling Without One
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<style lang="scss">
.landing {
  height: calc(100vh - 68px);
  background-image: url('/abstract.png');
  background-size: 56%;
  background-repeat: no-repeat;
  background-position: bottom right;

  .container {
    @media only screen and (max-width: 1024px) {
      max-width: 640px;
    }

    @media only screen and (max-width: 700px) {
      padding: 0 2rem;
    }
  }
}

.hero {
  margin-top: 4rem;
}
</style>
