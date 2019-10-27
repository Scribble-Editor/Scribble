<template>
  <span @click="gotoBeginningOfLine">Go to Beginning of Line</span>
</template>

<script>
export default {
  name: 'EditorMenuGotoBeginningofline',
  methods: {
    gotoBeginningOfLine () {
      this.$root.$emit('editor/command', (editor) => {
        editor.gotoLine(editor.selection.getCursor().row + 1, 0, true)
      })
    }
  }
}
</script>
