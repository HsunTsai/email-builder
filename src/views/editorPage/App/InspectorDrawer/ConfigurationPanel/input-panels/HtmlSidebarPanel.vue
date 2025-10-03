<template>
  <BaseSidebarPanel title="Html block">
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Content</label>
      <textarea
        rows="5"
        :value="data.props?.contents ?? ''"
        @input="
          handleUpdateData({
            ...data,
            props: {
              ...data.props,
              contents: ($event.target as HTMLTextAreaElement).value,
            },
          })
        "
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
        placeholder="Enter HTML content..."
      />
    </div>
    <MultiStylePropertyPanel
      :names="[
        'color',
        'backgroundColor',
        'fontFamily',
        'fontSize',
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
import type { HtmlProps } from "@flyhub/email-block-html";
import { HtmlPropsSchema } from "@flyhub/email-block-html";
import { ref } from "vue";

type HtmlSidebarPanelProps = {
  data: HtmlProps;
};

defineProps<HtmlSidebarPanelProps>();

const emit = defineEmits<{
  (e: "update:data", args: HtmlProps): void;
}>();

/** Refs */

const errors = ref<Zod.ZodError | null>(null);

/** Functions */

function handleUpdateData(data: unknown) {
  const res = HtmlPropsSchema.safeParse(data);

  if (res.success) {
    emit("update:data", res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
