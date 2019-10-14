<template>
  <section class="editor-textarea-tabs">
    <b-tabs v-model="activeDocumentName" type="is-boxed" @change="emitTabChange">
      <b-tab-item
        v-for="documentName in documentNames"
        :key="documentName"
      >
        <template slot="header">
          <span>{{ documentName }}</span>

          <!-- TODO: Implement close button -->
          <b-icon icon="close" size="is-small" class="tab-exit" />
        </template>
      </b-tab-item>
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
      activeDocumentName: this.documentNames[this.documentNames.length - 1]
    }
  },
  mounted () {
    this.activeDocumentName = this.documentNames
      ? this.documentNames[0]
      : null
  },
  methods: {
    emitTabChange ($event) {
      this.$emit('change', this.documentNames[$event])
    }
  }
}
</script>

<style lang="scss">
.editor-textarea-tabs {
  background-color: lightgray;

  .tab-content {
    display: none !important;
  }

  .tab-exit {
    transition: 200ms color;

    &:hover {
      color: red;
    }
  }
}
</style>
