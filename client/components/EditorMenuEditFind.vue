<template>
  <span @click="openFind">Find</span>
</template>

<script>
import EditorMenuEditFindModal from '~/components/EditorMenuEditFindModal'

export default {
  name: 'EditorMenuEditFind',
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
