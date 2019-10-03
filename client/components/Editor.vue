<template>
  <div class="editor">
    <m-ace-editor
      v-model="content"
      height="100%"
      :line-height="config.lineHeight"
      :font-size="config.fontSize"
      :line-number="config.lineNumber"
      :highlight-active-line="config.highlightActiveLine"
      :mode="config.language"
      :theme="config.theme"
    />
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data () {
    return {
      content: 'console.log("Hello World!");',
      config: {
        'lineHeight': 1.5,
        'fontSize': 12, // in px
        'lineNumber': true,
        'highlightActiveLine': true,
        'language': 'html',
        'theme': null
      }
    }
  }
}
</script>

<style lang="scss">
.editor {
  height: 600px;
}
</style>
