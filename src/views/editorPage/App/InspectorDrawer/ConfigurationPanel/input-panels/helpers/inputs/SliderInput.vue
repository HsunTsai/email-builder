<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <RawSliderInput
      v-bind="rest"
      :model-value="value ?? undefined /** converts null to undefined */"
      @update:model-value="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import RawSliderInput from "./raw/RawSliderInput.vue";

type Props = {
  label: string;
  iconLabel: string;

  step?: number;
  units?: string;
  min?: number;
  max?: number;

  defaultValue: number | null;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "change", args: number): void;
}>();

/** Refs */

const value = ref(props.defaultValue);

/** Computed */

const rest = computed(() => {
  const { label: _, ...rest } = props;

  return rest;
});

/** Functions */

function handleChange(newValue: number) {
  value.value = newValue;
  emit("change", newValue);
}
</script>
