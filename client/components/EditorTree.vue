<template>
  <div class="menu">
    <EditorTreeItem :sub-items="items" />
  </div>
</template>

<script>
import EditorTreeItem from '~/components/EditorTreeItem'

export default {
  name: 'EditorTree',
  components: { EditorTreeItem },
  computed: {
    items () {
      const insertDocument = (structures, path) => {
        const isDirectory = path.includes('/')
        if (isDirectory) {
          const directoryName = path.substr(0, path.indexOf('/', 1)).replace(/\//g, '')
          const directoryInStructure = structures.find(item => item.label === directoryName)
          if (!directoryInStructure) {
            structures.push({ label: directoryName, children: [] })
            structures.sort((a, b) => {
              if ((a.children && b.children) || (!a.children && !b.children)) {
                return a.label > b.label
              }
              return !a.children
            })
          }
          insertDocument(structures.find(item => item.label === directoryName).children, path.substr(path.indexOf('/', 1) + 1))
        } else {
          const fileName = path
          structures.push({ label: fileName })
          structures.sort((a, b) => a.label > b.label)
        }
      }

      const items = []

      for (const document in this.$store.state.documents) {
        insertDocument(items, document)
      }

      return items
    }
  }
}
</script>

<style lang="scss">
.menu {
  overflow: auto
}
</style>
