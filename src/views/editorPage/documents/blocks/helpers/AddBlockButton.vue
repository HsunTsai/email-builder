<template>
  <div
    :style="{
      position: placeholder ? 'relative' : 'absolute',
      height: placeholder ? 'auto' : '10px',
      margin: '-5px 0',
      width: '100%',
    }"
    @mouseenter="visible = true"
  >
    <BlocksMenu
      v-if="placeholder || visible || open"
      @select="$emit('select', $event)"
      @update:open="open = $event"
      @mouseleave="visible = false"
    >
      <component :is="buttonComponent" />
    </BlocksMenu>
  </div>
</template>

<script setup lang="ts">
import type { TEditorBlock } from "../../editor/core";
import PlaceholderButton from "./PlaceholderButton.vue";
import DividerButton from "./DividerButton.vue";
import BlocksMenu from "./BlocksMenu.vue";

const props = defineProps<{
  placeholder?: boolean;
}>();

defineEmits<{
  (e: "select", args: TEditorBlock): void;
}>();

/** Refs */
const visible = ref(false);
const open = ref(false);

/** Computed */
const buttonComponent = computed(() => {
  if (props.placeholder) {
    return PlaceholderButton;
  }

  return DividerButton;
});
</script>
