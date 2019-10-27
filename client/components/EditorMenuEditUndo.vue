<template>
  <span @click="undo">Undo</span>
</template>

<script>
export default {
  name: 'EditorMenuEditUndo',
  methods: {
    undo () {
      this.$root.$emit('editor/command', (editor) => {
        editor.undo()
      })
    }
  }
}
</script>
