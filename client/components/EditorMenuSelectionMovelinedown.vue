<template>
  <span @click="moveLineDown">Move Line Down</span>
</template>

<script>
export default {
  name: 'EditorMenuSelectionCopylinedown',
  methods: {
    moveLineDown () {
      this.$root.$emit('editor/command', (editor) => {
        editor.moveLinesDown()
      })
    }
  }
}
</script>
