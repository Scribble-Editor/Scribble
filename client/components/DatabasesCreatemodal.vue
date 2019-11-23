<template>
  <form class="databases-createmodal" @submit="$event => $event.preventDefault()">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">
          New Database
        </p>
      </header>
      <section class="modal-card-body">
        <b-field
          v-for="(column, index) in columns"
          :key="'column-' + column"
          :label="index === 0 ? 'Columns' : ''"
        >
          <div
            class="inputs"
          >
            <b-input
              type="text"
              :value="column"
              placeholder="Column Name"
              required
            />
            <button class="button delete-column is-danger" @click.prevent="removeColumn(index)">
              <b-icon icon="delete" size="is-small" />
            </button>
          </div>
        </b-field>
        <button class="button is-success" @click.prevent="addColumn">
          <span>Add column</span>
          <b-icon icon="plus" />
        </button>
      </section>

      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Cancel
        </button>
        <button class="button is-primary" @click="createDatabase">
          Create Database
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DatabasesCreatemodal',
  data () {
    return {
      columns: ['']
    }
  },
  methods: {
    async createDatabase () {
      const columns = Array.from(this.$el.querySelectorAll('input[type="text"]')).map(item => item.value)

      let allFieldsFilled = true
      for (const column of columns) {
        if (column.length < 1) {
          allFieldsFilled = false
        }
      }
      if (!allFieldsFilled) {
        this.$buefy.toast.open({
          message: 'All columns must have names',
          type: 'is-danger'
        })
        return
      }

      if (Array.from(new Set(columns)).length !== columns.length) {
        this.$buefy.toast.open({
          message: 'Columns cannot have the same name',
          type: 'is-danger'
        })
        return
      }

      const response = await this.makeRequest({
        method: 'post',
        url: '/user-databases/create',
        baseURL: process.env.apiURI,
        data: {
          columns: JSON.stringify(columns)
        }
      })

      if (response.status === 200) {
        this.$parent.$buefy.snackbar.open({
          message: 'Database created successfuly',
          type: 'is-success',
          queue: false
        })
        this.$root.$emit('databases/updateList')
      } else {
        this.$parent.$buefy.snackbar.open({
          message: 'Error creating database: ' + response.statusText,
          type: 'is-danger',
          queue: false
        })
      }

      this.$parent.close()
    },
    removeColumn (index) {
      if (this.columns.length > 1) {
        this.columns.splice(index, 1)
      }
    },
    addColumn () {
      this.columns.push('')
    },
    ...mapActions({
      makeRequest: 'authentication/makeRequest'
    })
  }
}
</script>

<style lang="scss">
.databases-createmodal {
  .modal-card {
    min-width: 600px;
  }

  .inputs {
    display: flex;

    *:not(button) {
      flex-grow: 1;
    }

    button {
      margin-left: .5rem;
    }
  }
}
</style>
