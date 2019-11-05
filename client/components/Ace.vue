<template>
  <div :style="`height: ${height}; width: ${width}`" />
</template>

<script>
import 'brace/ext/searchbox'

import { themesByName } from '~/plugins/ace-themelist'
import { modesByName } from '~/plugins/ace-modelist'

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
    useSoftTabs: {
      type: Boolean,
      default: true
    },
    tabSize: {
      type: Number,
      default: 4
    },
    showLineNumbers: {
      type: Boolean,
      default: true
    },
    showInvisibles: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: Number,
      default: 14
    }
  },
  data () {
    return {
      editor: null
    }
  },
  watch: {
    theme (newValue) {
      this.editor.setTheme(themesByName[newValue].theme)
    },
    language (newValue) {
      this.editor.getSession().setMode(modesByName[newValue].mode)
    },
    session (newValue) {
      this.editor.setSession(newValue)
      this.editor.getSession().setMode(modesByName[this.language].mode)
    },
    useSoftTabs (newValue) {
      this.editor.getSession().setUseSoftTabs(newValue)
    },
    tabSize (newValue) {
      this.editor.getSession().setTabSize(newValue)
    },
    showLineNumbers (newValue) {
      this.editor.renderer.setShowGutter(newValue)
    },
    showInvisibles (newValue) {
      this.editor.renderer.setShowInvisibles(newValue)
    },
    fontSize (newValue) {
      this.editor.setFontSize(newValue)
    }
  },
  mounted () {
    const ace = require('brace')
    require('~/plugins/ace-modes-includes')
    require('~/plugins/ace-themes-includes')

    // Initialize Ace
    const vm = this
    const editor = vm.editor = ace.edit(this.$el)
    editor.setTheme(themesByName[this.theme].theme)

    // Initialize Ace session
    if (this.session) { this.editor.setSession(this.session) }
    editor.getSession().setMode(modesByName[this.language].mode)

    // Initialize Ace Value
    if (this.value) {
      this.editor.setValue(this.value, 1)
    } else {
      const content = vm.editor.getValue()
      vm.$emit('input', content)
    }

    editor.getSession().setUseSoftTabs(this.useSoftTabs)
    editor.getSession().setTabSize(this.tabSize)
    editor.setFontSize(this.fontSize)
    editor.renderer.setShowGutter(this.showLineNumbers)
    editor.renderer.setShowInvisibles(this.showInvisibles)

    editor.on('change', () => {
      const content = vm.editor.getValue()
      vm.$emit('input', content)
    })

    this.$root.$on('editor/command', cb => cb(editor))
  },
  beforeDestroy () {
    this.editor.destroy()
    this.editor.container.remove()
  }
}
</script>
