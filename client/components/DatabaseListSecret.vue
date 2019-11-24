<template>
  <div>
    <span v-if="isVisible">
      <strong>Secret:</strong> <code>{{ secret }}</code>
    </span>
    <a @click="toggleSecret">
      <span v-if="!isVisible">Show secret</span>
      <span v-else>Hide Secret</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'DatabaseListSecret',
  props: {
    secret: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    toggleSecret () {
      this.isVisible = !this.isVisible
    }
  }
}
</script>
