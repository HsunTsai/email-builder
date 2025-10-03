<template>
  <Popover v-slot="{ open: isOpen }" class="relative">
    <PopoverButton as="template">
      <slot />
    </PopoverButton>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute z-10 mt-2 transform">
        <div
          class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="relative grid grid-cols-4 gap-2 bg-white p-4">
            <BlockButton
              v-for="item in BUTTONS"
              :key="item.label"
              :label="item.label"
              :icon="item.icon"
              @click="handleClick(item)"
            />
          </div>
        </div>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import type { TEditorBlock } from "../../editor/core";
import { BUTTONS } from "./buttons";
import BlockButton from "./BlockButton.vue";
import { ref, watch } from "vue";

const open = ref(false);

const emit = defineEmits<{
  (e: "select", args: TEditorBlock): void;
  (e: "open", args: boolean): void;
}>();

/** Functions */

function handleClick(item: (typeof BUTTONS)[number]) {
  const block = item.block();
  emit("select", block);
}

/** Watch */

watch(open, () => {
  emit("open", open.value);
});
</script>
