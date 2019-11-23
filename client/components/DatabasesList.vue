<template>
  <div>
    <b-loading v-if="!loaded" :active="true" :is-full-page="false" />
    <div v-else>
      <div v-if="userHasDatabases">
        <section v-for="(database, index) in databases" :key="'database-' + index" class="database-table">
          <hr v-if="index !== 0">
          <h1 class="title is-5">
            Database ID: {{ databaseId[index] }}
          </h1>
          <h2 class="subtitle is-6">
            <strong>Created:</strong> {{ databaseCreatedOn[index] }}
            <br>
            <strong>Last Modified:</strong> {{ databaseLastModified[index] }}
          </h2>
          <b-collapse :open="false" position="is-bottom">
            <a slot="trigger" slot-scope="props">
              <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'" />
              {{ !props.open ? 'Show entries' : 'Hide entries' }}
            </a>
            <b-table
              v-if="loaded"
              :columns="databaseColumns[index]"
              :data="databaseRows[index]"
              :paginated="true"
            />
            <button class="button is-danger" @click="confirmDeleteDatabase(databaseId[index])">
              Delete Database
            </button>
          </b-collapse>
        </section>
      </div>
      <b-message v-else class="no-database-message">
        You haven't created any databases yet. Click <strong>New Database</strong> above to make you first one!
      </b-message>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DatabasesList',
  data () {
    return {
      loaded: false,
      databases: []
    }
  },
  computed: {
    userHasDatabases () {
      return this.databases.length > 0
    },
    databaseRows () {
      return this.databases.map(database => JSON.parse(database.fields.rows))
    },
    databaseColumns () {
      return this.databases.map((database) => {
        return JSON.parse(database.fields.columns).map((column) => {
          return {
            field: column,
            label: column
          }
        })
      })
    },
    databaseCreatedOn () {
      return this.databases.map((database) => {
        return new Date(database.fields.created_on)
      })
    },
    databaseLastModified () {
      return this.databases.map((database) => {
        return new Date(database.fields.last_modified)
      })
    },
    databaseId () {
      return this.databases.map((database) => {
        return database.pk
      })
    }
  },
  mounted () {
    this.getDatabases()
    this.$root.$on('databases/updateList', () => { this.getDatabases() })
  },
  methods: {
    getDatabases () {
      const self = this
      self.loaded = false
      setTimeout(async () => {
        const response = await self.makeRequest({
          method: 'get',
          url: '/user-databases/all',
          baseURL: process.env.apiURI
        })

        if (response.status === 200) {
          self.databases = JSON.parse(response.data)
          self.loaded = true
        } else {
          self.$buefy.snackbar.open({
            message: response,
            type: 'is-danger'
          })
        }
      }, 0)
    },
    confirmDeleteDatabase (id) {
      const self = this
      this.$buefy.dialog.confirm({
        title: 'Deleting database',
        message: 'Are you sure you want to <b>delete</b> this database? This action cannot be undone.',
        confirmText: 'Delete Database',
        type: 'is-danger',
        hasIcon: true,
        onConfirm () {
          self.deleteDatabase(id)
          this.close()
        }
      })
    },
    async deleteDatabase (id) {
      const response = await this.makeRequest({
        method: 'post',
        url: '/user-databases/delete',
        baseURL: process.env.apiURI,
        data: {
          database_id: id
        }
      })

      if (response.status === 200) {
        this.getDatabases()
      } else {
        self.$buefy.snackbar.open({
          message: response,
          type: 'is-danger'
        })
      }
    },
    ...mapActions({
      makeRequest: 'authentication/makeRequest'
    })
  }
}
</script>

<style lang="scss" scoped>
.database-table {
  margin-bottom: 4rem;
}
</style>
