<template>
  <button
    @click="$emit('click')"
    class="flex flex-col items-center bg-transparent cursor-pointer hover:bg-white/10 py-3"
  >
    <div class="p-2 bg-gray-200 rounded mb-2">
      <Icon :icon="icon" class="size-6" />
    </div>
    <span class="text-sm">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

type BlockMenuButtonProps = {
  label: string;
  icon: string;
};

defineEmits<{
  (e: "click"): void;
}>();

defineProps<BlockMenuButtonProps>();
</script>
