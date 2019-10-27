<template>
  <span @click="openFind">Find All</span>
</template>

<script>
import EditorMenuEditFindModal from '~/components/EditorMenuEditFindModal'

export default {
  name: 'EditorMenuEditFindall',
  methods: {
    openFind () {
      this.$buefy.modal.open({
        parent: this,
        component: EditorMenuEditFindModal,
        hasModalCard: true
      })
    }
  }
}
</script>
