<template>
  <span @click="copyLineUp">Copy Line Up</span>
</template>

<script>
export default {
  name: 'EditorMenuSelectionCopylineup',
  methods: {
    copyLineUp () {
      this.$root.$emit('editor/command', (editor) => {
        editor.copyLinesUp()
      })
    }
  }
}
</script>
