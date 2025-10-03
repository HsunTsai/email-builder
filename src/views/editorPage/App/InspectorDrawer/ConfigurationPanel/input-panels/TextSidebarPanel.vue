<template>
  <BaseSidebarPanel title="Text block">
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Text</label>
      <textarea
        rows="5"
        :value="data.props?.text ?? ''"
        @input="
          handleUpdateData({
            ...data,
            props: {
              ...data.props,
              text: ($event.target as HTMLTextAreaElement).value,
            },
          })
        "
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
        placeholder="Enter your text here..."
      />
    </div>

    <BooleanInput
      label="Markdown"
      :model-value="data.props?.markdown ?? false"
      @update:model-value="
        handleUpdateData({
          ...data,
          props: { ...data.props, markdown: $event },
        })
      "
    />

    <MultiStylePropertyPanel
      :names="[
        'color',
        'backgroundColor',
        'fontFamily',
        'fontSize',
        'fontWeight',
        'textAlign',
        'padding',
      ]"
      :model-value="data.style"
      @update:model-value="handleUpdateData({ ...data, style: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import BaseSidebarPanel from "./helpers/BaseSidebarPanel.vue";
import MultiStylePropertyPanel from "./helpers/style-inputs/MultiStylePropertyPanel.vue";
import BooleanInput from "./helpers/inputs/BooleanInput.vue";
import type { TextProps } from "@flyhub/email-block-text";
import { TextPropsSchema } from "@flyhub/email-block-text";
import * as Zod from "zod";

type TextSidebarPanelProps = {
  data: TextProps;
};

defineProps<TextSidebarPanelProps>();

const emit = defineEmits<{
  (e: "update:data", args: TextProps): void;
}>();

/** Refs */

const errors = ref<Zod.ZodError | null>(null);

/** Functions */

function handleUpdateData(data: unknown) {
  const res = TextPropsSchema.safeParse(data);

  if (res.success) {
    emit("update:data", res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
