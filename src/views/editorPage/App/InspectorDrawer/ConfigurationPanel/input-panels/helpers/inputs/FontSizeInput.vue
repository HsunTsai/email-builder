<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <RawSliderInput
      icon-label="material-symbols:text-fields"
      :model-value="modelValue"
      units="px"
      :step="1"
      :min="10"
      :max="48"
      @update:model-value="$emit('change', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import RawSliderInput from "./raw/RawSliderInput.vue";

type Props = {
  label: string;
  modelValue: number;
};

defineProps<Props>();

defineEmits<{
  (e: "change", args: number): void;
}>();
</script>
