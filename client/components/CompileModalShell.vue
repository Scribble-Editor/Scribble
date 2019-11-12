<template>
  <form action="" class="shell" @submit.prevent="executeCommand">
    <div v-for="line in out" :key="line + Math.random()" class="out-line">
      <span class="dollar" :class="{ 'is-command': line.isCommand }">&dollar;</span>
      <span>{{ line.content }}</span>
    </div>
    <div v-if="isInteractive && connectionOpen" class="input-wrapper">
      <span class="dollar is-command">&dollar;</span>
      <input
        v-model="command"
        type="text"
        name="shell-command"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="off"
      >
    </div>
  </form>
</template>

<script>
export default {
  name: 'CompileModalShell',
  props: {
    isInteractive: {
      type: Boolean,
      default: false
    },
    websocketURI: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      command: '',
      out: [{ content: 'Establishing connection...', isCommand: false }],
      socket: null,
      connectionOpen: false
    }
  },
  watch: {
    // If websocket URI changes, close previous connection and open new one
    websocketURI (newValue) {
      this.socket.close()
      this.createWebsocket(newValue)
    }
  },
  mounted () {
    // Open websocket connection if a URI is passed during mount
    if (this.websocketURI.length > 0) {
      this.createWebsocket(this.websocketURI)
    }
  },
  beforeDestroy () {
    // Close any open websockets and terminate compile / build jobs
    this.socket.close()
  },
  methods: {
    executeCommand ($event) {
      this.print(this.command, true)
      this.socket.send(this.command)
      this.command = ''
    },
    print (message, isCommand) {
      this.out.push({ content: message, isCommand: isCommand || false })
    },
    createWebsocket (URI) {
      this.socket = new WebSocket(URI)
      this.socket.onopen = this.onWebsocketOpen
      this.socket.onmessage = this.onWebsocketMessage
      this.socket.onclose = this.onWebsocketClose
      this.socket.onerror = this.onWebsocketError
    },
    onWebsocketOpen (event) {
      this.print('Connected!')
      this.connectionOpen = true
    },
    onWebsocketMessage ({ data }) {
      this.print(data)
    },
    onWebsocketClose ({ wasClean, code, reason }) {
      if (wasClean) {
        this.print('Connection closed')
      } else {
        this.print('Connection closed unexpectedly. Error Code: ' + code + (reason ? ', ' + reason : ''))
      }
      this.connectionOpen = false
    },
    onWebsocketError ({ message }) {
      this.print('ERROR: ' + message)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/buefy.overrides';

.shell {
  background-color: $dark;
  color: $text-invert;
  padding: 1.5rem 2rem;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 40vh;
  font-family: monospace;
}

.input-wrapper, .out-line {
  display: grid;
  grid-template-columns: min-content auto;

  .dollar {
    padding: 0 .5rem 0 0;
    user-select: none;

    &:not(.is-command) {
      font-size: 0;
      padding: 0;
    }
  }

  input {
    margin: 0;
    border: none;
    background-color: transparent;
    font-size: inherit;
    font-family: inherit;
    color: inherit;
  }
}
</style>
