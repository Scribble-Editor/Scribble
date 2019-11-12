<template>
  <div class="menu" @contextmenu="showContextMenu">
    <EditorTreeItem :sub-items="items" />
    <EditorTreeContextmenu
      v-model="contextMenuVisible"
      :x="contextMenuX"
      :y="contextMenuY"
      :event="contextMenuEvent"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import EditorTreeItem from '~/components/EditorTreeItem'
import EditorTreeContextmenu from '~/components/EditorTreeContextmenu'

export default {
  name: 'EditorTree',
  components: { EditorTreeItem, EditorTreeContextmenu },
  data () {
    return {
      items: [],
      contextMenuVisible: false,
      contextMenuX: 0,
      contextMenuY: 0,
      contextMenuEvent: new MouseEvent(null)
    }
  },
  computed: {
    ...mapState(['documents'])
  },
  watch: {
    documents () {
      this.updateItems()
    }
  },
  mounted () {
    this.updateItems()
    this.$root.$on('updateTree', this.updateItems)
  },
  methods: {
    updateItems () {
      // Takes an array containing the file listing structure
      // ie { label: "", ?children: [] }
      const insertDocument = (structures, path) => {
        const isDirectory = path.includes('/')

        // If we are inserting a directory
        if (isDirectory) {
          const directoryName = path.substr(0, path.indexOf('/', 1)).replace(/\//g, '')
          const directoryInStructure = structures.find(item => item.label === directoryName)

          // If the current directory is not in the structure yet
          if (!directoryInStructure) {
            // create a new directory structure and push it to the array
            structures.push({ label: directoryName, children: [] })
            structures.sort((a, b) => {
              if ((a.children && b.children) || (!a.children && !b.children)) {
                return a.label.toLowerCase() > b.label.toLowerCase()
              }
              return !a.children
            })
          }
          // Insert the next directory/document recursively
          insertDocument(structures.find(item => item.label === directoryName).children, path.substr(path.indexOf('/', 1) + 1))

        // If we are inserting a file
        } else {
          const fileName = path
          structures.push({ label: fileName })
          structures.sort((a, b) => {
            if ((a.children && b.children) || (!a.children && !b.children)) {
              return a.label.toLowerCase() > b.label.toLowerCase()
            }
            return !a.children
          })
        }
      }

      const items = []

      for (const document in this.documents) {
        insertDocument(items, document)
      }

      this.items = items
    },
    showContextMenu ($event) {
      $event.preventDefault()
      this.contextMenuVisible = true
      this.contextMenuX = $event.clientX
      this.contextMenuY = $event.clientY
      this.contextMenuEvent = $event
    }
  }
}
</script>

<style lang="scss">
.menu {
  overflow: auto;
  background-color: #f6f6f6;
  color: #526488;
}
</style>
