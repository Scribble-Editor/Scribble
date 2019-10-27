<template>
  <span @click="gotoBeginningOfLine">Go to Beginning of Line</span>
</template>

<script>
export default {
  name: 'EditorMenuGotoBeginningofline',
  methods: {
    gotoBeginningOfLine () {
      this.$root.$emit('editor/command', (editor) => {
        editor.selection.moveCursorLineStart()
        editor.selection.clearSelection()
      })
    }
  }
}
</script>
