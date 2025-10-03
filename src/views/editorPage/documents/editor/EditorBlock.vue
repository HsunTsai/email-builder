<template>
  <div
    v-if="!block"
    class="bg-yellow-50 border border-yellow-200 rounded-md p-3"
  >
    <p class="text-sm text-yellow-800">⚠️ Block not found</p>
  </div>
  <div v-else class="h-full">
    <BuildBlockComponent :blocks="EDITOR_DICTIONARY" v-bind="block" />
  </div>
</template>

<script lang="ts">
import { EDITOR_DICTIONARY } from "./core";
import { BuildBlockComponent } from "@flyhub/email-document-core";
import { useInspectorDrawer } from "./editor.store";

export const currentBlockIdSymbol = Symbol(
  "currentBlockId",
) as InjectionKey<string>;
</script>

<script setup lang="ts">
type EditorBlockProps = {
  id: string;
};

const props = defineProps<EditorBlockProps>();
const inspectorDrawer = useInspectorDrawer();

provide(currentBlockIdSymbol, props.id);

const block = computed(() => inspectorDrawer.document[props.id]);
</script>
