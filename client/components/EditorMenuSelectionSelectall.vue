<template>
  <span @click="selectAll">Select All</span>
</template>

<script>
export default {
  name: 'EditorMenuSelectionSelectall',
  methods: {
    selectAll () {
      this.$root.$emit('editor/command', (editor) => {
        editor.selectAll()
      })
    }
  }
}
</script>
