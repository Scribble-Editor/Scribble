<template>
  <form action="" @submit="$event.preventDefault()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Find and Replace
        </p>
      </header>
      <section class="modal-card-body">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                Hotkey
              </p>
              <p class="title is-1">
                Ctrl + F
              </p>
            </div>
          </div>
        </nav>
        <b-message type="is-warning">
          Due to limitations, the find and replace function can only be done with a hotkey
        </b-message>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" type="button" @click="$parent.close()">
          OK
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'EditorMenuEditFindModal'
}
</script>
