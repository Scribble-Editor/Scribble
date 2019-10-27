<template>
  <span @click="gotoLineNumber">Go to Line Number</span>
</template>

<script>
export default {
  name: 'EditorMenuGotoLinenumber',
  methods: {
    gotoLineNumber () {
      this.$root.$emit('editor/command', (editor) => {
        this.$buefy.dialog.prompt({
          message: 'Line number:',
          inputAttrs: {
            type: 'number',
            placeholder: '1',
            min: 1,
            max: editor.getSession().getDocument().getLength()
          },
          trapFocus: true,
          onConfirm (lineNumber) {
            editor.gotoLine(lineNumber, 0, true)
          }
        })
      })
    }
  }
}
</script>
