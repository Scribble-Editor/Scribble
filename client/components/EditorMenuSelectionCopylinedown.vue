<template>
  <span @click="copyLineDown">Copy line down</span>
</template>

<script>
export default {
  name: 'EditorMenuSelectionCopylinedown',
  methods: {
    copyLineDown () {
      this.$root.$emit('editor/command', (editor) => {
        editor.copyLinesDown()
      })
    }
  }
}
</script>
