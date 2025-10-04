<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <el-select
      v-model="value"
      placeholder="Select font family"
      @change="handleChange"
      class="w-full"
    >
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { FONT_FAMILIES } from "@flyhub/email-core";

const props = defineProps<{
  label: string;
  defaultValue: string | null;
}>();

const emit = defineEmits<{
  (e: "change", args: string): void;
}>();

const value = ref(props.defaultValue ?? "inherit");

const options = [
  ...FONT_FAMILIES.map((f) => ({
    label: f.label,
    value: f.key,
  })),
  {
    label: "Match email settings",
    value: "inherit",
  },
];

const selectedOption = computed(() => {
  return options.find((option) => option.value === value.value);
});

/** Functions */

function handleChange(newValue: string) {
  value.value = newValue;
  emit("change", newValue);
}
</script>
