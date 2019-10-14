<template>
  <div class="editor">
    <EditorMenu class="editor-menu" />
    <div class="editor-tree">
      TREE
    </div>
    <EditorTextarea :theme="config.theme" />
    <EditorFooter class="editor-footer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import EditorMenu from '~/components/EditorMenu'
import EditorTextarea from '~/components/EditorTextarea'
import EditorFooter from '~/components/EditorFooter'

export default {
  name: 'Editor',
  components: { EditorMenu, EditorTextarea, EditorFooter },
  computed: {
    config () {
      return {
        'lineHeight': 1.5,
        'fontSize': 12, // in px
        'lineNumber': true,
        'highlightActiveLine': true,
        'theme': this.$store.state.userConfig.theme
      }
    },
    content: {
      get () {
        return this.selectedFile.content
      },
      set (value) {
        this.$store.commit('openFiles/updateFileContent', { file: this.selectedFile.name, content: value })
      }
    },
    ...mapGetters({
      selectedFile: 'openFiles/selectedFile'
    })
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
