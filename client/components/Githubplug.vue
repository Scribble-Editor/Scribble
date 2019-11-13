<template>
  <section class="hero is-light github-plug">
    <div class="hero-body">
      <div class="container">
        <p class="subtitle is-5 text">
          Like working on open source projects? Scribble is open source! Feel free to fork us on GitHub!
          <Githubfork class="github-fork" />
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import Githubfork from '~/components/Githubfork'

export default {
  name: 'Githubplug',
  components: { Githubfork }
}
</script>

<style lang="scss">
.github-plug {
  margin-top: 0 !important;

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .github-fork {
    margin-top: 1.5rem;
  }
}
</style>
