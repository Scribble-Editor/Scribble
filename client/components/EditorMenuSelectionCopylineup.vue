<template>
  <span @click="copyLineUp">Copy line up</span>
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
