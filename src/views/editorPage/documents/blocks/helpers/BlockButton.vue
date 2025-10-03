<template>
  <button 
    @click="$emit('click')"
    class="flex flex-col items-center bg-transparent cursor-pointer hover:bg-white/10 rounded-none py-3 border-none"
  >
    <div class="p-2 bg-gray-200 rounded-md mb-2">
      <span :class="icon" class="text-xl text-gray-700"></span>
    </div>
    <span class="text-white text-sm">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
type BlockMenuButtonProps = {
  label: string;
  icon: string;
}

defineEmits<{
  (e: 'click'): void
}>()

defineProps<BlockMenuButtonProps>()
</script>
