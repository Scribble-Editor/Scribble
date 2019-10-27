<template>
  <span @click="redo">Redo</span>
</template>

<script>
export default {
  name: 'EditorMenuEditRedo',
  methods: {
    redo () {
      this.$root.$emit('editor/command', (editor) => {
        editor.redo()
      })
    }
  }
}
</script>
