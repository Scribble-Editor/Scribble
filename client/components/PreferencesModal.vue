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
        <b-field label="Editor Theme" label-position="on-border">
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
