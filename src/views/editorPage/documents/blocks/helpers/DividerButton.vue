<template>
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <button
      @click="$emit('click', $event)"
      class="flex items-center justify-center h-12 w-full p-0 bg-transparent border-none rounded-none cursor-pointer"
    >
      <span class="bg-blue-600 w-5 h-5 flex items-center justify-center rounded-full">
        <span class="material-symbols-outlined text-white text-sm">add</span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click', args: MouseEvent): void
}>()
</script>
