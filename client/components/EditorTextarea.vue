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
        :session="openedSessions[activeDocument]"
        :theme="theme"
        :language="activeDocumentLanguage"
        :use-soft-tabs="useSoftTabs"
        :tab-size="tabSize"
        :show-line-numbers="showLineNumbers"
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
import { createEditSession as createSession } from 'brace'

import EditorTextareaTabs from '~/components/EditorTextareaTabs'
import Ace from '~/components/Ace'

export default {
  name: 'EditorTextarea',
  components: { EditorTextareaTabs, Ace },
  props: {
    theme: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      activeDocument: this.value,
      openedDocuments: [],
      openedSessions: {}
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
    activeDocumentLanguage () {
      return this.$store.state.documents[this.activeDocument].mode
    },
    noFilesAreOpen () {
      return this.activeDocument === undefined || this.openedDocuments.length === 0
    },
    useSoftTabs () {
      return this.$store.state.userConfig.indentStyle === 'spaces'
    },
    tabSize () {
      return this.$store.state.userConfig.tabSize
    },
    showLineNumbers () {
      return this.$store.state.userConfig.showLineNumbers
    }
  },
  watch: {
    value (newValue) {
      this.activeDocument = newValue
    }
  },
  mounted () {
    this.$root.$on('openDocument', this.openDocument)
  },
  methods: {
    changeActiveDocument (activeDocument) {
      // Create new session if there isnt already one
      if (!this.openedSessions[activeDocument] && activeDocument) {
        this.addNewSession(
          activeDocument,
          this.$store.state.documents[activeDocument].content
        )
      }
      this.activeDocument = activeDocument
      this.$emit('input', activeDocument)
    },
    closeDocument (documentName) {
      const documentIndex = this.openedDocuments.indexOf(documentName)
      this.openedDocuments.splice(documentIndex, 1)
      this.changeActiveDocument(this.openedDocuments[0])
      delete (this.openedSessions[documentName])
    },
    openDocument (documentName) {
      if (!this.openedDocuments.includes(documentName)) {
        this.openedDocuments.push(documentName)
      }
      this.changeActiveDocument(documentName)
    },
    addNewSession (name, content) {
      this.openedSessions[name] = createSession(content)
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
