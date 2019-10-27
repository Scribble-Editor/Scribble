<template>
  <form action="" @submit="$event.preventDefault()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Preferences
        </p>
      </header>
      <section class="modal-card-body">
        <b-message type="is-info">
          Settings are automatically saved when changed.
        </b-message>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" type="button" @click="$parent.close()">
          Done
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'PreferencesModal'
}
</script>
