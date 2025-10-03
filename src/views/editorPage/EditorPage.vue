<script setup lang="ts">
import { useInspectorDrawer } from "./documents/editor/editor.store";
import TemplatePanel from "./App/TemplatePanel/index.vue";
import EditorInspectorDrawer from "./App/InspectorDrawer/index.vue";

const inspectorDrawer = useInspectorDrawer();
</script>

<template>
  <EditorInspectorDrawer />

  <div
    class="transition-[margin-right] duration-200 h-full"
    :style="{
      marginRight: inspectorDrawer.inspectorDrawerOpen
        ? `${inspectorDrawer.INSPECTOR_DRAWER_WIDTH}px`
        : `0`,
    }"
  >
    <TemplatePanel />
  </div>
</template>
