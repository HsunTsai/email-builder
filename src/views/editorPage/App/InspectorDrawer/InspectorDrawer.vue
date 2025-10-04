<template>
  <Transition
    enter-active-class="transition duration-200 ease-out transform"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition duration-200 ease-in transform"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="inspectorDrawer.inspectorDrawerOpen"
      class="fixed right-0 top-0 h-full bg-white shadow-lg z-40"
      :style="{
        '--drawer-width': `${INSPECTOR_DRAWER_WIDTH}px`,
        width: 'var(--drawer-width)',
      }"
    >
      <el-tabs v-model="activeTab" class="h-full">
        <el-tab-pane
          v-for="tab in tabs"
          :key="tab.slot"
          :label="tab.label"
          :name="tab.slot"
          class="p-4"
        >
          <StylesPanel v-if="tab.slot === 'styles'" />
          <ConfigurationPanel v-else-if="tab.slot === 'block-configuration'" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useInspectorDrawer } from "../../documents/editor/editor.store";
import StylesPanel from "./stylesPanel/StylesPanel.vue";
import ConfigurationPanel from "./ConfigurationPanel/ConfigurationPanel.vue";

const INSPECTOR_DRAWER_WIDTH = 300;

const tabs = [
  {
    label: "Styles",
    slot: "styles" as const,
  },
  {
    label: "Inspect",
    slot: "block-configuration" as const,
  },
];

/** Refs */

const inspectorDrawer = useInspectorDrawer();
const activeTab = ref<string>("0");

/** Watch */

watch(
  () => inspectorDrawer.selectedSidebarTab,
  (value) => {
    activeTab.value = value === "styles" ? "0" : "1";
  },
);
</script>
