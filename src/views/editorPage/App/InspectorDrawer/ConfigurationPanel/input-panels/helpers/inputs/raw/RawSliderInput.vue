<template>
  <div class="flex gap-2 items-center justify-between w-full">
    <span :class="iconLabel" class="text-3xl"></span>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="
        emit(
          'update:model-value',
          Number(($event.target as HTMLInputElement).value),
        )
      "
      class="flex-1 mx-4"
    />
    <div>
      <span class="text-right">{{ modelValue }}{{ units }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type SliderInputProps = {
  iconLabel: string;

  step?: number;
  units?: string;
  min?: number;
  max?: number;

  modelValue: number | undefined;
};

const props = defineProps<SliderInputProps>();

const emit = defineEmits<{
  (e: "update:model-value", args: number): void;
}>();

const rest = computed(() => {
  const { iconLabel: _1, units: _2, ...rest } = props;

  return rest;
});
</script>
