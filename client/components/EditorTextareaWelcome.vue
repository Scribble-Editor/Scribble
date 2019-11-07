<template>
  <div class="container">
    <div class="section">
      <h2 class="subtitle is-2">
        Welcome!
      </h2>
      <h4 class="title is-4">
        Create a file and Scribble something down.
      </h4>
      <div class="image">
        <img src="~/assets/EditorTextareaWelcomeIllustration.svg" alt="Welcome Illustration">
      </div>
      <button class="button is-primary">
        New File
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorTextareaWelcome'
}
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr min-content;
  height: 100%;
}

.image {
  display: flex;
  justify-content: center;

  img {
    width: 50%
  }
}

h2, h4 {
  text-align: center !important;
}

button {
  width: 40%;
  margin: 0 auto;
}
</style>
