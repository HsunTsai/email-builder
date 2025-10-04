<template>
  <span>
    <ElButton
      circle
      @click="downloadJson"
      type="default"
      title="Download JSON file"
    >
      <Icon icon="material-symbols:download" class="size-4" />
    </ElButton>
  </span>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ElButton } from "element-plus";
import { useInspectorDrawer } from "../../../documents/editor/editor.store";

const inspectorDrawer = useInspectorDrawer();

const downloadJson = () => {
  const doc = inspectorDrawer.document;
  const jsonString = JSON.stringify(doc, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "emailTemplate.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
</script>
