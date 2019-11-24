<template>
  <div>
    <Navbar />
    <section class="database-section">
      <div class="container">
        <h1 class="title is-2">
          My Databases
        </h1>
        <h3 class="subtitle is-4">
          Here you can create, delete, and manage your databases for your applications
        </h3>
        <div class="buttons">
          <button class="button is-secondary is-pulled-right" @click="updateDatabasesList">
            Refresh List
          </button>
          <button class="button is-primary is-pulled-right" @click="showDatabasesCreateModal">
            New Database
          </button>
        </div>
        <div class="control-section">
          <DatabasesList />
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { forceAuthentication as forceAuthenticationMiddleware } from '~/middleware/authentication'

import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import DatabasesCreatemodal from '~/components/DatabasesCreatemodal'
import DatabasesList from '~/components/DatabasesList'

export default {
  layout: 'default',
  middleware: forceAuthenticationMiddleware,
  components: { Navbar, Footer, DatabasesList },
  methods: {
    showDatabasesCreateModal () {
      this.$buefy.modal.open({
        parent: this,
        component: DatabasesCreatemodal,
        hasModalCard: true
      })
    },
    updateDatabasesList () {
      this.$root.$emit('databases/updateList')
    }
  }
}
</script>

<style lang="scss" scoped>
section.database-section {
  margin-top: 4rem;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.control-section {
  min-height: calc(100vh - 80px);
}
</style>
