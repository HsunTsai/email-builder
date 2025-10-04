<template>
  <ElPopover
    placement="bottom"
    :width="300"
    trigger="click"
    v-model:visible="visible"
  >
    <template #reference>
      <slot />
    </template>

    <div class="relative grid grid-cols-4 gap-4" v-bind="$attrs">
      <BlockButton
        v-for="item in BUTTONS"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
        @click="handleClick(item)"
      />
    </div>
  </ElPopover>
</template>

<script setup lang="ts">
import { ElPopover } from "element-plus";
import type { TEditorBlock } from "../../editor/core";
import { BUTTONS } from "./buttons";
import BlockButton from "./BlockButton.vue";

const visible = ref(false);

const emit = defineEmits<{
  (e: "select", args: TEditorBlock): void;
  (e: "open", args: boolean): void;
}>();

/** Functions */

function handleClick(item: (typeof BUTTONS)[number]) {
  const block = item.block();
  emit("select", block);
  visible.value = false;
  emit("open", visible.value);
}

/** Watch */

watch(visible, () => {
  emit("open", visible.value);
});
</script>
