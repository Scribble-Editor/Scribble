<template>
  <div class="editor">
    <EditorMenu class="editor-menu" :active-document="activeDocument" />
    <EditorTree class="editor-tree" />
    <EditorTextarea v-model="activeDocument" :theme="config.theme" />
    <EditorFooter class="editor-footer" :active-document="activeDocument" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import EditorMenu from '~/components/EditorMenu'
import EditorTree from '~/components/EditorTree'
import EditorTextarea from '~/components/EditorTextarea'
import EditorFooter from '~/components/EditorFooter'

export default {
  name: 'Editor',
  components: { EditorMenu, EditorTree, EditorTextarea, EditorFooter },
  data () {
    return {
      activeDocument: null
    }
  },
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
  },
  mounted () {
    // Calculates the height of the file tree at mount
    const editorMenuElem = document.getElementsByClassName('editor-menu')[0]
    const editorTreeElem = document.getElementsByClassName('editor-tree')[0]
    const editorFooterElem = document.getElementsByClassName('editor-footer')[0]

    editorTreeElem.style.height = `calc(100vh - ${editorMenuElem.clientHeight + editorFooterElem.clientHeight}px)`
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
