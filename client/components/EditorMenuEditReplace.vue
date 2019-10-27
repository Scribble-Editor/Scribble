<template>
  <span @click="openFind">Replace</span>
</template>

<script>
import EditorMenuEditFindModal from '~/components/EditorMenuEditFindModal'

export default {
  name: 'EditorMenuEditReplace',
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
