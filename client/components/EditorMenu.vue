<template>
  <b-navbar class="EditorMenu">
    <template slot="start">
      <!-- File -->
      <b-navbar-dropdown
        label="File"
        arrowless
      >
        <b-navbar-item>
          New File
        </b-navbar-item>
        <b-navbar-item>Open File</b-navbar-item>
        <b-navbar-item>Export File</b-navbar-item>
        <hr>
        <b-navbar-item>Preferences</b-navbar-item>
        <b-navbar-item>Exit</b-navbar-item>
      </b-navbar-dropdown>

      <!-- Edit -->
      <b-navbar-dropdown
        label="Edit"
        arrowless
      >
        <b-navbar-item>Undo</b-navbar-item>
        <b-navbar-item>Redo</b-navbar-item>
        <hr>
        <b-navbar-item>Find</b-navbar-item>
        <b-navbar-item>Find All</b-navbar-item>
        <b-navbar-item>Replace</b-navbar-item>
      </b-navbar-dropdown>

      <!-- Selection -->
      <b-navbar-dropdown
        label="Selection"
        arrowless
      >
        <b-navbar-item>Select All</b-navbar-item>
        <b-navbar-item>Select Current Word</b-navbar-item>
        <b-navbar-item>Select Current Line</b-navbar-item>
        <hr>
        <b-navbar-item>Copy Line Up</b-navbar-item>
        <b-navbar-item>Copy Line Down</b-navbar-item>
        <b-navbar-item>Move Line Up</b-navbar-item>
        <b-navbar-item>Move Line Down</b-navbar-item>
      </b-navbar-dropdown>

      <!-- Go To -->
      <b-navbar-dropdown
        label="Go To"
        arrowless
      >
        <b-navbar-item>Go to Line Number</b-navbar-item>
        <hr>
        <b-navbar-item>Go to Beginning of Line</b-navbar-item>
        <b-navbar-item>Go to End of Line</b-navbar-item>
        <b-navbar-item>Go to Beginning of File</b-navbar-item>
        <b-navbar-item>Go to End of File</b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'EditorMenu'
}
</script>

<style lang="scss">
.EditorMenu {
  min-height: 0 !important;
  height: min-content !important;

  .navbar-brand {
    display: none !important;
  }

  .navbar-item.has-dropdown {
    align-items: start !important;

    hr {
      margin: 0.3rem 0 !important;
    }

    a {
      align-items: start !important;
      line-height: inherit !important;
      padding: 0.1rem 0.75rem !important;
    }
  }
}
</style>