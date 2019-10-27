<template>
  <footer class="editor-footer">
    <!-- Language Selection -->
    <b-field v-if="activeDocumentMode" class="editor-footer-input">
      <b-select
        icon="web"
        :value="activeDocumentMode.caption"
        size="is-small"
        @input="changeLanguage"
      >
        <option
          v-for="language in languages"
          :key="language"
          :value="language"
        >
          {{ language }}
        </option>
      </b-select>
    </b-field>

    <!-- Theme Selection -->
    <b-field class="editor-footer-input">
      <b-select
        icon="palette"
        :value="selectedTheme"
        size="is-small"
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
  </footer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { themesByName, themes } from '~/plugins/ace-themelist'
import { modesByName, modes } from '~/plugins/ace-modelist'

export default {
  name: 'EditorFooter',
  props: {
    activeDocument: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      selectedTheme: themesByName[this.$store.state.userConfig.theme.split()[0]].caption
    }
  },
  computed: {
    themes () {
      return Object.keys(themesByName).map(key => themesByName[key].caption).sort()
    },
    languages () {
      return Object.keys(modesByName).map(key => modesByName[key].caption).sort()
    },
    activeDocumentMode () {
      return this.activeDocument ? modesByName[this.$store.state.documents[this.activeDocument].mode] : null
    },
    ...mapGetters({
      selectedFile: 'openFiles/selectedFile'
    })
  },
  methods: {
    changeLanguage (newLanguage) {
      const mode = modes.find(mode => mode && mode.caption === newLanguage).name
      this.updateDocument({ name: this.activeDocument, mode })
    },
    changeTheme (newTheme) {
      const theme = themes.find(theme => theme && theme.caption === newTheme)
      this.selectedTheme = theme.caption
      this.updateUserConfig({ theme: theme.name })
    },
    ...mapMutations({
      updateDocument: 'documents/update',
      updateUserConfig: 'userConfig/update'
    })
  }
}
</script>

<style lang="scss">

.editor-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: #3b4252;
}

.editor-footer-input {
  margin-bottom: 0 !important;
  margin-right: 8px;
}

.editor-footer .select {
  border-color: transparent !important;

  &::after {
    display: none !important;
  }
}

.editor-footer select {
  background-color: #3b4252 !important;
  border-color: #3b4252 !important;
  color: white !important;

  &:hover {
    background-color: lighten(#3b4252, 7) !important;
  }

  &:focus {
    outline: none !important;
  }

  option {
    color: white;
  }
}
</style>
