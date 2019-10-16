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
  data () {
    return {
      items: [
        { label: 'one' },
        { label: 'two',
          children: [
            { label: 'two-one' },
            { label: 'two-two',
              children: [
                { label: 'two-two-one',
                  children: [
                    { label: 'two-two-one-one',
                      children: [
                        { label: 'two-two-one-one-one',
                          children: [
                            { label: 'This is the overflow element' }
                          ]
                        }
                      ] }
                  ]
                }
              ] }
          ] },
        { label: 'three' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' },
        { label: 'filler' }
      ]
    }
  }
}
</script>

<style lang="scss">
.menu {
  overflow: auto
}
</style>
