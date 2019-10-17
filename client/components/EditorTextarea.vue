<template>
  <div class="wrapper">
    <EditorTextareaTabs
      :document-names="openedDocuments"
      @change="changeActiveDocument"
      @tabClose="closeDocument"
    />
    <div class="editors">
      <Ace
        v-model="activeDocumentContent"
        :theme="theme"
        :file-change-content="activeDocumentContentBackup"
        language="markdown"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import EditorTextareaTabs from '~/components/EditorTextareaTabs'
import Ace from '~/components/Ace'

export default {
  name: 'EditorTextarea',
  components: { EditorTextareaTabs, Ace },
  props: {
    theme: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      activeDocument: 'Welcome.md',
      openedDocuments: ['Welcome.md', 'SecondDocument.md'],
      activeDocumentContentBackup: null
    }
  },
  computed: {
    activeDocumentContent: {
      get () {
        try {
          return this.$store.state.documents[this.activeDocument].content
        } catch (e) {
          return ''
        }
      },
      set (value) {
        this.updateDocument({ name: this.activeDocument, content: value })
      }
    }
  },
  methods: {
    changeActiveDocument (activeDocument) {
      this.activeDocument = activeDocument
      this.activeDocumentContentBackup = this.activeDocumentContent.slice()
    },
    closeDocument (documentName) {
      const documentIndex = this.openedDocuments.indexOf(documentName)
      this.openedDocuments.splice(documentIndex, 1)
      this.changeActiveDocument(this.openedDocuments[0])
    },
    ...mapMutations({
      addDocument: 'documents/add',
      removeDocument: 'documents/remove',
      updateDocument: 'documents/update',
      renameDocument: 'documents/rename'
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-rows: min-content auto;
}
</style>
