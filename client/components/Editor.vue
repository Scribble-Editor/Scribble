<template>
  <div class="editor">
    <div class="editor-menu">
      MENU
    </div>
    <div class="editor-tree">
      TREE
    </div>
    <m-ace-editor
      v-model="content"
      height="100%"
      class="editor-textarea"
      :line-height="config.lineHeight"
      :font-size="config.fontSize"
      :line-number="config.lineNumber"
      :highlight-active-line="config.highlightActiveLine"
      :mode="config.language"
      :theme="config.theme"
    />
    <EditorFooter class="editor-footer" />
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

<style lang="scss" scoped>
.editor {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas:
    "menu menu"
    "tree textarea"
    "footer footer";
  grid-template-rows: min-content auto min-content;
  grid-template-columns: 250px auto;
}

.editor-menu {
  grid-area: menu;
}

.editor-tree {
  grid-area: tree;
}

.editor-textarea {
  grid-area: textarea;
}

.editor-footer {
  grid-area: footer;
}
</style>
