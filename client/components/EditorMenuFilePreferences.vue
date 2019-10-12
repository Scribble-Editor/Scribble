<template>
  <span @click="openPreferencesModal">Preferences</span>
</template>

<script>
import PreferencesModal from '~/components/PreferencesModal'

export default {
  name: 'EditorMenuFilePreferences',
  methods: {
    openPreferencesModal () {
      this.$buefy.modal.open({
        parent: this,
        component: PreferencesModal,
        hasModalCard: true
      })
    }
  }
}
</script>
