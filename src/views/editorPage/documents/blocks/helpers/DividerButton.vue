<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <button
      @click="$emit('click', $event)"
      class="flex items-center justify-center h-12 w-full bg-transparent cursor-pointer"
    >
      <span class="bg-blue-600 w-5 h-5 flex items-center justify-center rounded-full">
        <span class="material-symbols-outlined text-sm">add</span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: "click", args: MouseEvent): void;
}>();
</script>
