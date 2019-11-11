<template>
  <b-dropdown class="compile-button" :disabled="disabled || !isSupportedDocumentType">
    <button slot="trigger" class="button is-primary">
      <span>Compile</span>
      <b-icon icon="menu-down" />
    </button>
    <b-dropdown-item @click="compileActiveDocument">
      Build
    </b-dropdown-item>
    <b-dropdown-item @click="showActiveDocumentCompileOptions">
      Options
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import COMPILE_TYPES from '~/plugins/compile-types'

export default {
  name: 'EditorMenuCompile',
  props: {
    activeDocument: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isSupportedDocumentType () {
      if (!this.activeDocument) { return false }
      const activeDocumentMode = this.$store.state.documents[this.activeDocument].mode
      return COMPILE_TYPES.includes(activeDocumentMode)
    }
  },
  methods: {
    compileActiveDocument () {
      alert('Compile')
    },
    showActiveDocumentCompileOptions () {
      alert('Options')
    }
  }
}
</script>

<style lang="scss">
.compile-button {
  align-self: center;
  margin-left: 0.75rem;

  &.dropdown.is-mobile-modal .dropdown-menu {
    width: auto !important;
    position: absolute !important;
    white-space: normal !important;
    max-width: none !important;
    max-height: none !important;
    top: 100% !important;
    left: 0 !important;
    bottom: auto !important;
    right: auto !important;
    transform: none !important;
    overflow-y: visible !important;
    z-index: 20 !important;

    .dropdown-item {
      padding: 0.375rem 1rem !important;
      padding-right: 3rem !important;
    }
  }
}
</style>
