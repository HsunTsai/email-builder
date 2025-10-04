<template>
  <div class="h-full">
    <TabGroup as="div" class="h-full">
      <div class="bg-white border-b border-gray-200 px-4 py-3">
        <div class="flex items-center justify-between">
          <TabList class="flex space-x-8">
            <Tab
              v-for="tab in tabs"
              :key="tab.slot"
              v-slot="{ selected }"
              as="template"
            >
              <button
                :class="[
                  'flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm',
                  selected
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                ]"
              >
                <span :class="tab.icon" class="w-5 h-5"></span>
                <span class="capitalize">{{ tab.slot }}</span>
              </button>
            </Tab>
          </TabList>

          <div class="flex items-center gap-x-2">
            <DownloadJson />
            <ImportJson />

            <div class="flex border border-gray-300 rounded overflow-hidden">
              <button
                :class="[
                  'px-3 py-2 text-sm font-medium',
                  inspectorDrawer.selectedScreenSize === 'desktop'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50',
                ]"
                @click="handleScreenSizeChange('desktop')"
                title="Desktop view"
              >
                <span class="material-symbols-outlined text-base"
                  >desktop_windows</span
                >
              </button>
              <button
                :class="[
                  'px-3 py-2 text-sm font-medium border-l border-gray-300',
                  inspectorDrawer.selectedScreenSize === 'mobile'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50',
                ]"
                @click="handleScreenSizeChange('mobile')"
                title="Mobile view"
              >
                <span class="material-symbols-outlined text-base"
                  >phone_iphone</span
                >
              </button>
            </div>

            <button
              @click="
                inspectorDrawer.inspectorDrawerOpen =
                  !inspectorDrawer.inspectorDrawerOpen
              "
              class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              :title="
                inspectorDrawer.inspectorDrawerOpen
                  ? 'Hide inspector'
                  : 'Show inspector'
              "
            >
              <span class="material-symbols-outlined text-base">
                {{
                  inspectorDrawer.inspectorDrawerOpen
                    ? "last_page"
                    : "app_registration"
                }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <TabPanels class="h-full bg-gray-100">
        <TabPanel class="h-full">
          <div :style="mainBoxStyle">
            <EditorBlock id="root" />
          </div>
        </TabPanel>
        <TabPanel class="h-full">
          <div :style="mainBoxStyle">
            <Reader :document="inspectorDrawer.document" root-block-id="root" />
          </div>
        </TabPanel>
        <TabPanel class="h-full">
          <HtmlPanel />
        </TabPanel>
        <TabPanel class="h-full">
          <JsonPanel />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import EditorBlock from "../../documents/editor/EditorBlock.vue";
import HtmlPanel from "./HtmlPanel.vue";
import JsonPanel from "./JsonPanel.vue";
import ImportJson from "./ImportJson/index.vue";
import DownloadJson from "./DownloadJson/index.vue";
import { Reader } from "@flyhub/email-builder";
import { useInspectorDrawer } from "../../documents/editor/editor.store";

const inspectorDrawer = useInspectorDrawer();

const tabs = [
  {
    icon: "material-symbols-outlined",
    slot: "editor",
  },
  {
    icon: "material-symbols-outlined",
    slot: "preview",
  },
  {
    icon: "material-symbols-outlined",
    slot: "html",
  },
  {
    icon: "material-symbols-outlined",
    slot: "json",
  },
];

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

const handleScreenSizeChange = (value: unknown) => {
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
