<template>
  <span @click="gotoEndOfLine">Go to End of Line</span>
</template>

<script>
export default {
  name: 'EditorMenuGotoEndofline',
  methods: {
    gotoEndOfLine () {
      this.$root.$emit('editor/command', (editor) => {
        editor.selection.moveCursorLineEnd()
        editor.selection.clearSelection()
      })
    }
  }
}
</script>
