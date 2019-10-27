<template>
  <span @click="selectLine">Select Current Line</span>
</template>

<script>
export default {
  name: 'EditorMenuSelectionSelectline',
  methods: {
    selectLine () {
      this.$root.$emit('editor/command', (editor) => {
        editor.selection.selectLine()
      })
    }
  }
}
</script>
