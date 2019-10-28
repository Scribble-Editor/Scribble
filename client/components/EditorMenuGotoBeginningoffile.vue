<template>
  <span @click="gotoBeginningOfFile">Go to Beginning of File</span>
</template>

<script>
export default {
  name: 'EditorMenuGotoBeginningoffile',
  methods: {
    gotoBeginningOfFile () {
      this.$root.$emit('editor/command', (editor) => {
        editor.selection.moveCursorFileStart()
        editor.selection.clearSelection()
      })
    }
  }
}
</script>
