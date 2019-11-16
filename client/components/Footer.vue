<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Scribble</strong> by <a target="_blank" href="http://github.com/PatrickHoward">Patrick Howard</a>
        and <a target="_blank" href="http://github.com/link00000000">Logan Crandall</a>. The source code is licensed
        <a target="_blank" href="https://opensource.org/licenses/GPL-3.0">GPL 3.0</a>.
      </p>
      <br>
      <p>
        Made with <span class="heart">&hearts;</span> by the <a target="_blank" href="http://github.com/Scribble-Editor">@Scribble-Editor</a> team
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
@import '~/assets/buefy.overrides';

.footer {
  background-color: $white-ter;
}

.heart {
  color: $red;
}
</style>
