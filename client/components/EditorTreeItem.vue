<template>
  <div class="menu-item-wrapper">
    <div
      v-for="(subItem, index) in subItems"
      :id="subItem.label + index"
      :key="subItem.label + index"
      class="item"
      :class="{ directory: isDirectory[index] }"
      @contextmenu="toggleContextMenu"
    >
      <div
        class="item-content"
        :style="{ paddingLeft: `${ 16 * iteration }px` }"
        @click="handleClick(subItem, index)"
      >
        <b-icon
          v-if="isDirectory[index]"
          icon="menu-right"
          size="is-small"
          class="directory-arrow"
        />
        <span class="menu-item-label">{{ subItem.label }}</span>
        <EditorTreeItemContextmenu
          v-if="showContextMenu"
          :style="{ left: `${contextMenuX}px`, top: `${contextMenuY}px` }"
        />
      </div>
      <div class="children">
        <EditorTreeItem
          v-if="isDirectory[index]"
          class="hidden"
          :sub-items="subItem.children"
          :iteration="iteration + 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EditorTreeItem from "~/components/EditorTreeItem";
import EditorTreeItemContextmenu from "~/components/EditorTreeItemContextmenu";

export default {
  name: "EditorTreeItem",
  components: { EditorTreeItem, EditorTreeItemContextmenu },
  data() {
    return {
      showContextMenu: false,
      contextMenuX: 0,
      contextMenuY: 0
    };
  },
  props: {
    subItems: {
      type: Array,
      default: null
    },
    iteration: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isDirectory() {
      return this.subItems.map(
        item => item.children && item.children.length > 0
      );
    }
  },
  methods: {
    handleClick(item, index) {
      // Expand or collapse directory in file tree
      if (this.isDirectory[index]) {
        const selectedItem = this.$el.querySelector("#" + item.label + index);
        const children = selectedItem.querySelector(".menu-item-wrapper");
        if (selectedItem.classList.contains("open")) {
          selectedItem.classList.remove("open");
          children.classList.add("hidden");
        } else {
          selectedItem.classList.add("open");
          children.classList.remove("hidden");
        }

        // Open file in file tree
      } else {
        let qualifiedName = item.label;

        let currentElement = this.$el;
        while (
          currentElement.parentElement.parentElement.parentElement.classList.contains(
            "menu-item-wrapper"
          )
        ) {
          qualifiedName =
            currentElement.parentElement.parentElement.querySelector(
              ".menu-item-label"
            ).textContent +
            "/" +
            qualifiedName;
          currentElement =
            currentElement.parentElement.parentElement.parentElement;
        }
        this.$root.$emit("openDocument", qualifiedName);
      }
    },
    toggleContextMenu($event) {
      this.showContextMenu = !this.showContextMenu;
    }
  }
};
</script>

<style lang="scss">
.item-content {
  display: grid;
  grid-template-columns: 16px auto;
  grid-template-areas: "directory-arrow label";
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.menu-item-wrapper {
  min-width: 100%;
  width: max-content;
  user-select: none;
}

.menu-item-label {
  grid-area: label;
  white-space: nowrap;
}

.directory-arrow {
  grid-area: directory-arrow;
  height: 100% !important;
}

.open > .item-content .directory-arrow {
  transform: rotate(45deg);
}

.hidden {
  display: none;
}
</style>
