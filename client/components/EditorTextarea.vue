<template>
  <div>
    <Ace
      :theme="theme"
      language="markdown"
      :session="sessions[0]"
      height="50%"
    />
    <Ace
      :theme="theme"
      language="markdown"
      :session="sessions[1]"
      height="50%"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { createEditSession as createSession } from 'brace'

import Ace from '~/components/Ace'

export default {
  name: 'EditorTextarea',
  components: { Ace },
  props: {
    theme: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      sessions: []
    }
  },
  mounted () {
    this.addSession('# Hello World!', 'hello.md')
    this.duplicateSession(this.sessions[0])
  },
  methods: {
    addSession (content, name) {
      // Create vuex store document
      this.addDocument({ name, content, mode: 'text' })

      // Update vuex store on session document change
      const vm = this
      const session = createSession(content)
      session.on('change', () => { vm.updateDocument({ name, content: session.getValue() }) })

      // Push active session into data
      this.sessions.push(session)
    },
    duplicateSession (source) {
      // create new session
      const session = createSession('')

      // set session document to source sessions document
      session.setDocument(source.getDocument())

      // Push active session into data
      this.sessions.push(session)
    },
    removeSession (index) {
      delete (this.sessions[index])
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
