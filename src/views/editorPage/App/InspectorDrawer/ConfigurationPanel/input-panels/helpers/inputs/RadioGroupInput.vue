<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="flex border border-gray-300 rounded-md overflow-hidden">
      <button
        v-for="item in items"
        :key="item.value"
        :class="[
          'flex-1 px-3 py-2 text-sm font-medium border-r border-gray-300 last:border-r-0',
          item.value === modelValue
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50',
        ]"
        @click="$emit('update:model-value', item.value)"
      >
        <span v-if="item.icon" :class="item.icon" class="w-4 h-4"></span>
        <span v-if="item.label">{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup generic="T extends string" lang="ts">
type Props = {
  label: string;
  modelValue: T | null;
  items: Array<
    | { label: string; value: T; icon?: never }
    | { icon: string; value: T; label?: never }
  >;
};

const props = defineProps<Props>();

defineEmits<{
  (e: "update:model-value", args: (typeof props.items)[number]["value"]): void;
}>();
</script>
