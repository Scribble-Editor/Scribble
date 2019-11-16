<template>
  <a href="https://github.com/Scribble-Editor/Scribble" target="_blank" rel="noopener noreferrer">
    <img class="github-shield" alt="GitHub forks" src="https://img.shields.io/github/forks/Scribble-Editor/Scribble?color=%2300d1b2&label=Forks&style=for-the-badge">
  </a>
</template>

<script>
export default {
  name: 'Githubfork'
}
</script>

<style lang="scss">
.github-shield {
  cursor: pointer !important;
  transition: 150ms all;

  &:hover {
    opacity: .8;
  }
}
</style>
