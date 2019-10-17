<template>
  <section class="editor-textarea-tabs">
    <div
      v-for="(documentName, index) in documentNames"
      :key="documentName + index"
      class="tab-item"
      :class="{ 'is-active': documentName === activeDocument }"
      @click="handleClick($event, documentName)"
    >
      <span class="label">{{ documentName }}</span>
      <b-icon icon="close" size="is-small" class="tab-exit" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'EditorTextareaTabs',
  props: {
    documentNames: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeDocument: this.value || this.documentNames[0]
    }
  },
  watch: {
    value (newValue) {
      this.activeDocument = newValue
    }
  },
  methods: {
    handleClick ($event, documentName) {
      if ($event.target.tagName === 'I') {
        this.$emit('tabClose', documentName)
      } else {
        this.$emit('change', documentName)
        this.activeDocument = documentName
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/buefy.overrides';

.editor-textarea-tabs {
  background-color: lightgray;
  white-space: nowrap;

  .tab-item {
    cursor: pointer;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    border-top: 2px solid  transparent;
    border-radius: 5px 5px 0 0;
    border-collapse: collapse;

    .label {
      margin: 0 8px;
    }

    &:hover {
      background-color: $white;
    }

    &.is-active {
      background-color: $white;
      border-color: $info;

      .label {
        color: $info;
      }
    }
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
