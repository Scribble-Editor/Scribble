<template>
  <div class="editor">
    <m-ace-editor
      v-model="content"
      height="calc(100vh - 27px)"
      :line-height="config.lineHeight"
      :font-size="config.fontSize"
      :line-number="config.lineNumber"
      :highlight-active-line="config.highlightActiveLine"
      :mode="config.language"
      :theme="config.theme"
    />
    <EditorFooter />
  </div>
</template>

<script>
import EditorFooter from '~/components/EditorFooter'

export default {
  name: 'Editor',
  components: { EditorFooter },
  data () {
    return {
      content: 'console.log("Hello World!");'
    }
  },
  computed: {
    config () {
      return {
        'lineHeight': 1.5,
        'fontSize': 12, // in px
        'lineNumber': true,
        'highlightActiveLine': true,
        'language': this.$store.state.userConfig.defaultLanguage,
        'theme': this.$store.state.userConfig.theme
      }
    }
  }
}
</script>

<style lang="scss">
</style>
