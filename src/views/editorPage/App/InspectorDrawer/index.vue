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
        width: 'var(--drawer-width)'
      }"
    >
      <TabGroup>
        <div class="border-b border-gray-200">
          <TabList class="flex space-x-8 px-4">
            <Tab v-for="tab in tabs" :key="tab.slot" v-slot="{ selected }" as="template">
              <button
                :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  selected
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.label }}
              </button>
            </Tab>
          </TabList>
        </div>
        
        <TabPanels class="p-4">
          <TabPanel>
            <StylesPanel />
          </TabPanel>
          <TabPanel>
            <ConfigurationPanel />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { useInspectorDrawer } from '../../documents/editor/editor.store';
import { ref, watch } from 'vue';
import StylesPanel from './StylesPanel.vue';
import ConfigurationPanel from './ConfigurationPanel/index.vue';

const INSPECTOR_DRAWER_WIDTH = 300

const tabs = [
  {
    label: 'Styles',
    slot: 'styles' as const
  },
  {
    label: 'Inspect',
    slot: 'block-configuration' as const
  }
]

/** Refs */

const inspectorDrawer = useInspectorDrawer()
const activeTab = ref<string>('0')

/** Watch */

watch(() => inspectorDrawer.selectedSidebarTab, (value) => {
  activeTab.value = value === 'styles' ? '0' : '1'
})
</script>
