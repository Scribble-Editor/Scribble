<template>
  <span @click="gotoDocumentation">Help</span>
</template>

<script>
export default {
  name: 'EditorMenuFileHelp',
  computed: {
    documentationLink () {
      return process.env.documentationURI
    }
  },
  methods: {
    gotoDocumentation () {
      window.location = this.documentationLink
    }
  }
}
</script>
