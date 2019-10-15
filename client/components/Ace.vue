<template>
  <div :style="`height: ${height}; width: ${width}`" />
</template>

<script>
export default {
  name: 'Ace',
  props: {
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    theme: {
      type: String,
      default: 'chrome'
    },
    language: {
      type: String,
      default: 'text'
    },
    session: {
      type: Object,
      default: null
    },
    value: {
      type: String,
      default: ''
    },

    // This is a workaround to update the file content only on document change
    // This is kind of a hack but is necessary since updating the value
    // resets the cursor position
    fileChangeContent: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      editor: null
    }
  },
  watch: {
    theme (newValue) {
      this.editor.setTheme('ace/theme/' + newValue)
    },
    language (newValue) {
      this.editor.getSession().setMode('ace/mode/' + newValue)
    },
    session (newValue) {
      this.editor.setSession(newValue)
      this.editor.getSession().setMode('ace/mode/' + this.language)
    },
    fileChangeContent (newValue) {
      this.editor.setValue(newValue, -1)
    }
  },
  mounted () {
    const ace = require('brace')
    require('~/plugins/ace-modes')
    require('~/plugins/ace-themes')

    // Initialize Ace
    const vm = this
    const editor = vm.editor = ace.edit(this.$el)
    editor.setTheme('ace/theme/' + this.theme)

    // Initialize Ace session
    if (this.session) { this.editor.setSession(this.session) }
    editor.getSession().setMode('ace/mode/' + this.language)

    // Initialize Ace Value
    if (this.value) {
      this.editor.setValue(this.value, 1)
    } else {
      const content = vm.editor.getValue()
      vm.$emit('input', content)
    }
    editor.on('change', () => {
      const content = vm.editor.getValue()
      vm.$emit('input', content)
    })
  },
  beforeDestroy () {
    this.editor.destroy()
    this.editor.container.remove()
  }
}
</script>
