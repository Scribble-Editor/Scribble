<template>
  <form action="" class="shell" @submit.prevent="executeCommand">
    <div v-for="line in out" :key="line + Math.random()" class="out-line">
      <span class="dollar" :class="{ 'is-command': line.isCommand }">&dollar;</span>
      <span>{{ line.content }}</span>
    </div>
    <div v-if="isInteractive" class="input-wrapper">
      <span class="dollar is-command">&dollar;</span>
      <input v-model="command" type="text" name="shell-command">
    </div>
  </form>
</template>

<script>
export default {
  name: 'CompileModalShell',
  props: {
    isInteractive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      command: '',
      out: [{ content: 'Establishing connection...', isCommand: false }]
    }
  },
  beforeDestroy () {
    // TODO: Close any open websockets and terminate compile / build jobs
  },
  methods: {
    executeCommand ($event) {
      this.out.push({ content: this.command, isCommand: true })
      this.command = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/buefy.overrides';

.shell {
  background-color: $dark;
  color: $text-invert;
  padding: 1.5rem 2rem;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 40vh;
  font-family: monospace;
}

.input-wrapper, .out-line {
  display: grid;
  grid-template-columns: min-content auto;

  .dollar {
    padding: 0 .5rem 0 0;
    user-select: none;

    &:not(.is-command) {
      font-size: 0;
      padding: 0;
    }
  }

  input {
    margin: 0;
    border: none;
    background-color: transparent;
    font-size: inherit;
    font-family: inherit;
    color: inherit;
  }
}
</style>
