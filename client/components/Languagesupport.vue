<template>
  <section class="hero is-light language-support">
    <div class="hero-body container">
      <div class="level">
        <div class="level-item">
          <p class="heading">
            Supported Langauages
          </p>
          <p class="title is-1">
            150+
          </p>
          <p class="description">
            Scribble supports syntax highlighting for 152 different languages, including not only
            the popular ones like C++, JavaScript, and PHP, but also the obscure languages like Bro and Dart.
          </p>
        </div>
        <div class="level-item">
          <div class="heading">
            Compilable Languages
          </div>
          <p class="title is-1">
            3
          </p>
          <p class="description">
            C++ and C can be compiled online through your browser. You can view the live output here too.
            Interpreted languages like Python can even be interacted with directly in your browser.
          </p>
        </div>
        <div class="level-item">
          <p class="heading">
            Editor
          </p>
          <p class="title is-1">
            1
          </p>
          <p class="description">
            All these features are in one packages for you to tinker with in an environment syncronized
            with all of your devices.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Languagesupport'
}
</script>

<style lang="scss">
.language-support {
  .level {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 4rem;
    align-items: start;

    @media only screen and (max-width: 680px) {
      grid-template-columns: 1fr;
    }
  }

  .description {
    text-align: left;
    margin-top: 1.5rem;
  }

  .level-item {
    flex-direction: column;
    align-items: start;
  }
}
</style>
