<template>
  <section class="editor-textarea-tabs">
    <b-tabs v-model="activeDocument" type="is-boxed" @change="emitTabChange">
      <b-tab-item
        v-for="documentName in documentNames"
        :key="documentName"
      >
        <template slot="header">
          <span>{{ documentName }}</span>

          <!-- TODO: Implement close button -->
          <b-icon icon="close" size="is-small" class="tab-exit" @click.native="$emit('tabClose', documentName)" />
        </template>
      </b-tab-item>
      <b-tab-item />
    </b-tabs>
  </section>
</template>

<script>
export default {
  name: 'EditorTextareaTabs',
  props: {
    documentNames: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      activeDocument: 0
    }
  },
  methods: {
    emitTabChange (tabIndex) {
      this.$emit('change', tabIndex)
      this.activeDocument = tabIndex
    }
  }
}
</script>

<style lang="scss">
.editor-textarea-tabs {
  background-color: lightgray;

  // Hide extra empty hack tab
  nav.tabs > ul > li:last-child {
    display: none
  }

  .tab-content {
    display: none !important;
  }

  .tab-exit {
    transition: 200ms color;
    margin: 0 !important;

    &:hover {
      color: red;
    }
  }
}
</style>
