<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="relative">
      <input
        type="text"
        :value="modelValue"
        @input="handleChange(($event.target as HTMLInputElement).value)"
        placeholder="auto"
        class="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <span class="absolute right-3 top-2 text-sm text-gray-500">px</span>
    </div>
  </div>
</template>

<script setup lang="ts">
type TextDimensionInputProps = {
  label: string;
  modelValue: number | null | undefined;
};

defineProps<TextDimensionInputProps>();

const emit = defineEmits<{
  (e: "change", args: number | null): void;
}>();

/** Functions */

function handleChange(newValue: string) {
  const value = parseInt(newValue);
  emit("change", isNaN(value) ? null : value);
}
</script>
