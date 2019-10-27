<template>
  <span @click="copyLineDown">Copy Line Down</span>
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
