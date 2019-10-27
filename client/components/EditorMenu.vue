<template>
  <b-navbar class="EditorMenu">
    <template slot="start">
      <!-- File -->
      <b-navbar-dropdown
        label="File"
        arrowless
      >
        <b-navbar-item>
          <EditorMenuFileNewfile />
        </b-navbar-item>
        <b-navbar-item>
          <EditorMenuFileOpenfile />
        </b-navbar-item>
        <b-navbar-item :class="{ disabled: !isDocumentSelected }">
          <EditorMenuFileExportfile :active-document="activeDocument" />
        </b-navbar-item>
        <hr>
        <b-navbar-item>
          <EditorMenuFilePreferences />
        </b-navbar-item>
        <b-navbar-item>
          <EditorMenuFileExit />
        </b-navbar-item>
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
        <b-navbar-item>
          <EditorMenuSelectionSelectall />
        </b-navbar-item>
        <b-navbar-item>
          <EditorMenuSelectionSelectword />
        </b-navbar-item>
        <b-navbar-item>
          <EditorMenuSelectionSelectline />
        </b-navbar-item>
        <hr>
        <b-navbar-item>
          <EditorMenuSelectionCopylineup />
        </b-navbar-item>
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
import EditorMenuFileNewfile from '~/components/EditorMenuFileNewfile'
import EditorMenuFileOpenfile from '~/components/EditorMenuFileOpenfile'
import EditorMenuFileExportfile from '~/components/EditorMenuFileExportfile'
import EditorMenuFilePreferences from '~/components/EditorMenuFilePreferences'
import EditorMenuFileExit from '~/components/EditorMenuFileExit'

import EditorMenuSelectionSelectall from '~/components/EditorMenuSelectionSelectall'
import EditorMenuSelectionSelectword from '~/components/EditorMenuSelectionSelectword'
import EditorMenuSelectionSelectline from '~/components/EditorMenuSelectionSelectline'
import EditorMenuSelectionCopylineup from '~/components/EditorMenuSelectionCopylineup'

export default {
  name: 'EditorMenu',
  components: {
    EditorMenuFileNewfile,
    EditorMenuFileOpenfile,
    EditorMenuFileExportfile,
    EditorMenuFilePreferences,
    EditorMenuFileExit,
    EditorMenuSelectionSelectall,
    EditorMenuSelectionSelectword,
    EditorMenuSelectionSelectline,
    EditorMenuSelectionCopylineup
  },
  props: {
    activeDocument: {
      type: String,
      required: true
    }
  },
  computed: {
    isDocumentSelected () {
      return !!this.activeDocument
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/buefy.overrides';

@media screen and (max-width: 1023px) {
  .navbar-menu {
    background-color: $white !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}

.EditorMenu {
  min-height: 0 !important;
  height: min-content !important;
  user-select: none !important;

  .disabled {
    background-color: transparent !important;
    cursor: not-allowed;
    color: $text-light;
    pointer-events: none;

    &:hover {
      background-color: transparent !important;
      color: $text-light !important;
    }
  }

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

      span {
        width: 100% !important;
      }
    }
  }
}
</style>
