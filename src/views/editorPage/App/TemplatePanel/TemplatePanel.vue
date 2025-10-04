<template>
  <div class="h-full">
    <div class="flex justify-between items-center p-4 pb-0">
      <div class="flex items-center gap-2">
        <DownloadJson />
        <ImportJson />
        <ElSegmented
          v-model="inspectorDrawer.selectedScreenSize"
          :options="screenSizeOptions"
          @change="handleScreenSizeChange"
        >
          <template #default="scope">
            <Icon :icon="scope.item.iconId" class="size-4" />
          </template>
        </ElSegmented>
      </div>

      <ElButton
        circle
        @click="
          inspectorDrawer.inspectorDrawerOpen =
            !inspectorDrawer.inspectorDrawerOpen
        "
        :title="
          inspectorDrawer.inspectorDrawerOpen
            ? 'Hide inspector'
            : 'Show inspector'
        "
      >
        <Icon
          :icon="
            inspectorDrawer.inspectorDrawerOpen
              ? 'mingcute:align-arrow-right-line'
              : 'mingcute:align-arrow-left-line'
          "
          class="size-4"
        />
      </ElButton>
    </div>

    <ElTabs v-model="activeTab" class="h-full">
      <ElTabPane v-for="tab in tabs" :key="tab.slot" :name="tab.slot">
        <template #label>
          <span class="flex gap-2 items-center px-4">
            <Icon :icon="tab.icon" class="size-4" />
            <span class="capitalize">{{ tab.slot }}</span>
          </span>
        </template>

        <div v-if="tab.slot === 'editor'" :style="mainBoxStyle">
          <EditorBlock id="root" />
        </div>
        <div v-else-if="tab.slot === 'preview'" :style="mainBoxStyle">
          <Reader :document="inspectorDrawer.document" root-block-id="root" />
        </div>
        <HtmlPanel v-else-if="tab.slot === 'html'" />
        <JsonPanel v-else-if="tab.slot === 'json'" />
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ElTabs, ElTabPane, ElSegmented, ElButton } from "element-plus";
import { Reader } from "@flyhub/email-builder";
import EditorBlock from "../../documents/editor/EditorBlock.vue";
import HtmlPanel from "./HtmlPanel.vue";
import JsonPanel from "./JsonPanel.vue";
import ImportJson from "./ImportJson/ImportJson.vue";
import DownloadJson from "./DownloadJson/DownloadJson.vue";
import { useInspectorDrawer } from "../../documents/editor/editor.store";

const inspectorDrawer = useInspectorDrawer();

const screenSizeOptions = [
  { label: "Desktop", value: "desktop", iconId: "mingcute:web-line" },
  { label: "Mobile", value: "mobile", iconId: "mingcute:cellphone-2-line" },
];

const tabs = [
  { icon: "mingcute:edit-2-line", slot: "editor" },
  { icon: "mingcute:eye-2-line", slot: "preview" },
  { icon: "mingcute:file-code-line", slot: "html" },
  { icon: "mingcute:file-more-line", slot: "json" },
];

const activeTab = ref("editor");

/** Computed */

const mainBoxStyle = computed(() => {
  const baseStyle = {
    height: "100%",
  };

  if (inspectorDrawer.selectedScreenSize === "mobile") {
    return {
      ...baseStyle,
      margin: "32px auto",
      width: "370px",
      height: "800px",
      boxShadow:
        "rgba(33, 36, 67, 0.04) 0px 10px 20px, rgba(33, 36, 67, 0.04) 0px 2px 6px, rgba(33, 36, 67, 0.04) 0px 0px 1px",
    };
  }

  return baseStyle;
});

/** Functions */

const handleScreenSizeChange = (value: string) => {
  switch (value) {
    case "mobile":
    case "desktop":
      inspectorDrawer.selectedScreenSize = value as "mobile" | "desktop";
      return;
    default:
      inspectorDrawer.selectedScreenSize = "desktop";
  }
};
</script>

<style>
.el-tabs__item {
  padding: 0 !important;
}
.el-tabs__content {
  overflow: unset !important;
}
</style>
