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
      activeDocument: 0,
      openedDocuments: ['Welcome.md', 'SecondDocument.md'],
      activeDocumentContentBackup: null
    }
  },
  computed: {
    activeDocumentContent: {
      get () {
        try {
          return this.$store.state.documents[this.activeDocumentName].content
        } catch (e) {
          return ''
        }
      },
      set (value) {
        this.updateDocument({ name: this.activeDocumentName, content: value })
      }
    },
    activeDocumentName () {
      return this.openedDocuments[this.activeDocument]
    }
  },
  mounted () {
    // A very nasty hack to avoid crashing when closing the last tab.
    // A hidden, empty tag is placed at the end and when it is active, the first
    // tab is clicked
    const vm = this
    const tabsElem = document.querySelector('.editor-textarea-tabs nav.tabs ul')
    setInterval(() => {
      const tabs = tabsElem.children
      const lastTab = tabs[tabs.length - 1]
      if (lastTab.classList.length > 0 && lastTab.classList.contains('is-active')) {
        vm.changeActiveDocument(0)
        lastTab.classList.remove('is-active')
        tabs[0].children[0].click()
      }
    }, 50)
  },
  methods: {
    changeActiveDocument (activeDocumentIndex) {
      this.activeDocument = activeDocumentIndex
      this.activeDocumentContentBackup = this.activeDocumentContent.slice()
    },
    closeDocument (documentName) {
      const documentIndex = this.openedDocuments.indexOf(documentName)
      this.openedDocuments.splice(documentIndex, 1)
      this.changeActiveDocument(0)
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
