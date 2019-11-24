<template>
  <form action="" @submit="$event.preventDefault()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Build options for {{ document }}
        </p>
      </header>
      <section class="modal-card-body">
        <b-field label="Author">
          <b-input v-model="author" />
        </b-field>
        <b-field label="Target">
          <b-select v-model="target">
            <option value="win64">
              Windows 64-bit
            </option>
            <option value="win32">
              Windows 32-bit
            </option>
            <option value="linux">
              Linux
            </option>
          </b-select>
        </b-field>

        <!-- Info Message -->
        <b-message type="is-info">
          Settings are automatically saved when changed.
        </b-message>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" type="button" @click="$parent.close()">
          Done
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'CompileoptionsModal',
  props: {
    document: {
      type: String,
      default: null
    }
  },
  computed: {
    author: {
      get () {
        return this.$store.state.documents[this.document].compileOptions.author
      },
      set (newValue) {
        this.updateOptions({ documentName: this.document, author: newValue })
      }
    },
    target: {
      get () {
        return this.$store.state.documents[this.document].compileOptions.target
      },
      set (newValue) {
        this.updateOptions({ documentName: this.document, target: newValue })
      }
    }
  },
  methods: {
    ...mapMutations({
      updateOptions: 'documents/updateCompileOptions'
    })
  }
}
</script>
