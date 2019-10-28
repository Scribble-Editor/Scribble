<template>
  <span @click="gotoEndOfFile">Go to End of File</span>
</template>

<script>
export default {
  name: 'EditorMenuGotoEndoffile',
  methods: {
    gotoEndOfFile () {
      this.$root.$emit('editor/command', (editor) => {
        editor.selection.moveCursorFileEnd()
        editor.selection.clearSelection()
      })
    }
  }
}
</script>
