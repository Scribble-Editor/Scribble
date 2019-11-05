<template>
  <form action="" @submit="$event.preventDefault()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Preferences
        </p>
      </header>
      <section class="modal-card-body">
        <!-- Theme Selection -->
        <b-field label="Editor Theme">
          <b-select
            icon="palette"
            :value="selectedTheme"
            @input="changeTheme"
          >
            <option
              v-for="theme in themes"
              :key="theme"
              :value="theme"
            >
              {{ theme }}
            </option>
          </b-select>
        </b-field>

        <label class="label">Indentation Style</label>
        <b-field>
          <b-radio-button
            v-model="indentStyle"
            native-value="spaces"
          >
            <span>Spaces</span>
          </b-radio-button>

          <b-radio-button
            v-model="indentStyle"
            native-value="tabs"
          >
            <span>Tabs</span>
          </b-radio-button>
        </b-field>

        <!-- Tab Size Selection -->
        <b-field label="Tab Size">
          <b-select
            v-model="tabSize"
          >
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option value="3">
              3
            </option>
            <option value="4">
              4
            </option>
            <option value="5">
              5
            </option>
            <option value="6">
              6
            </option>
            <option value="7">
              7
            </option>
            <option value="8">
              8
            </option>
          </b-select>
        </b-field>

        <!-- Line Number Toggle -->
        <b-field>
          <b-switch
            v-model="showLineNumbers"
          >
            Show Line Numbers
          </b-switch>
        </b-field>

        <!-- Show Invisibles Toggle -->
        <b-field>
          <b-switch
            v-model="showInvisibles"
          >
            Show Invisible Characters
          </b-switch>
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
import { themesByName, themes } from '~/plugins/ace-themelist'

export default {
  name: 'PreferencesModal',
  computed: {
    selectedTheme () {
      return themesByName[this.$store.state.userConfig.theme].caption
    },
    themes () {
      return Object.keys(themesByName).map(key => themesByName[key].caption).sort()
    },
    indentStyle: {
      get () {
        return this.$store.state.userConfig.indentStyle
      },
      set (newValue) {
        this.updateUserConfig({ indentStyle: newValue })
      }
    },
    tabSize: {
      get () {
        return this.$store.state.userConfig.tabSize
      },
      set (newValue) {
        this.updateUserConfig({ tabSize: newValue })
      }
    },
    showLineNumbers: {
      get () {
        return this.$store.state.userConfig.showLineNumbers
      },
      set (newValue) {
        this.updateUserConfig({ showLineNumbers: newValue })
      }
    },
    showInvisibles: {
      get () {
        return this.$store.state.userConfig.showInvisibles
      },
      set (newValue) {
        this.updateUserConfig({ showInvisibles: newValue })
      }
    }
  },
  methods: {
    changeTheme (newTheme) {
      const theme = themes.find(theme => theme && theme.caption === newTheme)
      this.updateUserConfig({ theme: theme.name })
    },
    ...mapMutations({
      updateUserConfig: 'userConfig/update'
    })
  }
}
</script>
