<script setup lang="ts">
import { useInspectorDrawer } from "./documents/editor/editor.store";
import TemplatePanel from "./App/TemplatePanel/TemplatePanel.vue";
import EditorInspectorDrawer from "./App/InspectorDrawer/InspectorDrawer.vue";

const inspectorDrawer = useInspectorDrawer();
</script>

<template>
  <div
    class="transition-[margin-right] duration-200"
    :style="{
      marginRight: inspectorDrawer.inspectorDrawerOpen
        ? `${inspectorDrawer.INSPECTOR_DRAWER_WIDTH}px`
        : `0`,
    }"
  >
    <TemplatePanel />
  </div>
  <EditorInspectorDrawer />
</template>
