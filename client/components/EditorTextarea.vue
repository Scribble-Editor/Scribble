<template>
  <div class="wrapper">
    <EditorTextareaTabs
      v-model="activeDocument"
      :document-names="openedDocuments"
      @change="changeActiveDocument"
      @tabClose="closeDocument"
    />
    <div v-if="!noFilesAreOpen" class="editors">
      <Ace
        v-model="activeDocumentContent"
        :theme="theme"
        :file-change-content="activeDocumentContentBackup"
        language="markdown"
      />
    </div>
    <div v-else>
      <!-- TODO: Welcome page -->
      this is the welcome page
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
    },
    noFilesAreOpen () {
      return this.activeDocument === undefined || this.openedDocuments.length === 0
    }
  },
  mounted () {
    this.$root.$on('openDocument', this.openDocument)
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
    openDocument (documentName) {
      if (!this.openedDocuments.includes(documentName)) {
        this.openedDocuments.push(documentName)
      }
      this.changeActiveDocument(documentName)
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
