<template>
  <span @click="moveLineUp">Move Line Up</span>
</template>

<script>
export default {
  name: 'EditorMenuSelectionCopylineup',
  methods: {
    moveLineUp () {
      this.$root.$emit('editor/command', (editor) => {
        editor.moveLinesUp()
      })
    }
  }
}
</script>
