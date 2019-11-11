<template>
  <b-dropdown class="compile-button">
    <button slot="trigger" class="button is-primary">
      <span>Compile</span>
      <b-icon icon="menu-down" />
    </button>
    <b-dropdown-item>Build</b-dropdown-item>
    <b-dropdown-item>Options</b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'EditorMenuCompile',
  methods: {
    compile () {
      alert('Compile')
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
