<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="flex items-center gap-2">
      <div class="relative">
        <Popover v-slot="{ open }" class="relative">
          <PopoverButton
            :class="[
              'flex items-center space-x-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              open ? 'ring-2 ring-blue-500' : '',
            ]"
          >
            <span
              v-if="value === null"
              class="material-symbols-outlined text-lg text-gray-400"
              >palette</span
            >
            <span
              v-else
              :style="{ backgroundColor: value }"
              class="w-4 h-4 rounded-full border border-gray-300"
            ></span>
            <span>Choose color</span>
          </PopoverButton>

          <PopoverPanel
            class="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2"
          >
            <input
              type="color"
              :value="value ?? '#000000'"
              @input="handleChange(($event.target as HTMLInputElement).value)"
              class="w-32 h-32 cursor-pointer"
            />
          </PopoverPanel>
        </Popover>
      </div>

      <button
        v-if="nullable && typeof value === 'string' && value.length > 0"
        @click="handleChange(null)"
        class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
        title="Reset color"
      >
        <span class="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

type Props =
  | {
      nullable: true;
      label: string;
      defaultValue: string | null;
    }
  | {
      nullable: false;
      label: string;
      defaultValue: string;
    };

const props = defineProps<Props>();

const emit = defineEmits<{
  (
    e: "change",
    args: typeof props.nullable extends true ? string | null : string,
  ): void;
}>();

/** Refs */

const value = ref(props.defaultValue);

/** Functions */

function handleChange(newValue: string | null) {
  value.value = newValue;
  emit(
    "change",
    newValue as typeof props.nullable extends true ? string | null : string,
  );
}
</script>
