<template>
  <div class="wrapper">
    <EditorTextareaTabs :document-names="fileNames" @change="changeActiveSession" />
    <div class="editors">
      <Ace
        :theme="theme"
        language="markdown"
        :session="sessions[activeSessionName]"
      />
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
    }
  },
  data () {
    return {
      sessions: {},
      fileNames: [],
      activeSessionName: null
    }
  },
  mounted () {
    this.addSession('# Hello World!', 'hello.md')
    this.addSession('# Something else', 'Something.md')
    this.addSession('This is a third file', 'third.md')
    this.changeActiveSession('hello.md')
    this.removeSession('Something.md')
  },
  methods: {
    changeActiveSession (name) {
      this.activeSessionName = name
    },
    addSession (content, name) {
      // Create vuex store document
      this.addDocument({ name, content, mode: 'text' })

      // Update vuex store on session document change
      const vm = this
      const session = createSession(content)
      session.on('change', () => { vm.updateDocument({ name, content: session.getValue() }) })

      // Push active session into data
      this.sessions[name] = session
      this.fileNames.push(name)
    },
    duplicateSession (source) {
      // create new session
      const session = createSession('')

      // set session document to source sessions document
      session.setDocument(source.getDocument())

      // Push active session into data
      this.sessions.push(session)
    },
    removeSession (name) {
      delete (this.sessions[name])
      this.fileNames.splice(this.fileNames.indexOf(name), 1)
      if (name === this.activeFile) { this.changeActiveSession(this.fileNames[0]) }
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
