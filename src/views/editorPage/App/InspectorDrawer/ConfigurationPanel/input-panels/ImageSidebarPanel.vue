<template>
  <BaseSidebarPanel title="Image block">
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Source URL</label>
      <input
        type="url"
        :value="data.props?.url ?? ''"
        @input="
          (e) => {
            const event = (e.target as HTMLInputElement).value.trim();
            const url = event.length === 0 ? null : event;
            handleUpdateData({ ...data, props: { ...data.props, url } });
          }
        "
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="https://example.com/image.jpg"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Alt text</label>
      <input
        type="text"
        :value="data.props?.alt ?? ''"
        @input="
          handleUpdateData({
            ...data,
            props: {
              ...data.props,
              alt: ($event.target as HTMLInputElement).value,
            },
          })
        "
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Image description"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700"
        >Click through URL</label
      >
      <input
        type="url"
        :value="data.props?.linkHref ?? ''"
        @input="
          (e) => {
            const event = (e.target as HTMLInputElement).value.trim();
            const linkHref = event.length === 0 ? null : event;
            handleUpdateData({ ...data, props: { ...data.props, linkHref } });
          }
        "
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="https://example.com/link"
      />
    </div>

    <div class="flex gap-2">
      <TextDimensionInput
        label="Width"
        :model-value="data.props?.width"
        @change="
          handleUpdateData({ ...data, props: { ...data.props, width: $event } })
        "
      />
      <TextDimensionInput
        label="Height"
        :model-value="data.props?.height"
        @change="
          handleUpdateData({
            ...data,
            props: { ...data.props, height: $event },
          })
        "
      />
    </div>

    <RadioGroupInput
      label="Alignment"
      :model-value="data.props?.contentAlignment ?? 'middle'"
      :items="[
        { icon: 'material-symbols:vertical-align-top', value: 'top' },
        { icon: 'material-symbols:vertical-align-center', value: 'center' },
        { icon: 'material-symbols:vertical-align-bottom', value: 'bottom' },
      ]"
      @update:model-value="
        handleUpdateData({
          ...data,
          props: { ...data.props, contentAlignment: $event },
        })
      "
    />

    <MultiStylePropertyPanel
      :names="['backgroundColor', 'textAlign', 'padding']"
      :model-value="data.style"
      @update:model-value="handleUpdateData({ ...data, style: $event })"
    />
  </BaseSidebarPanel>
</template>

<script setup lang="ts">
import BaseSidebarPanel from "./helpers/BaseSidebarPanel.vue";
import MultiStylePropertyPanel from "./helpers/style-inputs/MultiStylePropertyPanel.vue";
import RadioGroupInput from "./helpers/inputs/RadioGroupInput.vue";
import TextDimensionInput from "./helpers/inputs/TextDimensionInput.vue";
import type { ImageProps } from "@flyhub/email-block-image";
import { ImagePropsSchema } from "@flyhub/email-block-image";
import { ref } from "vue";

type ImageSidebarPanelProps = {
  data: ImageProps;
};

defineProps<ImageSidebarPanelProps>();

const emit = defineEmits<{
  (e: "update:data", args: ImageProps): void;
}>();

/** Refs */

const errors = ref<Zod.ZodError | null>(null);

/** Functions */

function handleUpdateData(data: unknown) {
  const res = ImagePropsSchema.safeParse(data);

  if (res.success) {
    emit("update:data", res.data);
    errors.value = null;
  } else {
    errors.value = res.error;
  }
}
</script>
