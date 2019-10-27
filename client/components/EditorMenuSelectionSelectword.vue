<template>
  <span @click="selectWord">Select Current Word</span>
</template>

<script>
export default {
  name: 'EditorMenuSelectionSelectword',
  methods: {
    selectWord () {
      this.$root.$emit('editor/command', (editor) => {
        editor.selection.selectAWord()
      })
    }
  }
}
</script>
