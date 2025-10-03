<template>
  <div v-if="!block" class="bg-yellow-50 border border-yellow-200 rounded-md p-3">
    <p class="text-sm text-yellow-800">⚠️ Block not found</p>
  </div>
  <div v-else-if="block.type !== 'EmailLayout'" class="bg-yellow-50 border border-yellow-200 rounded-md p-3">
    <p class="text-sm text-yellow-800">⚠️ Expected "root" element to be of type "EmailLayout"</p>
  </div>
  <EmailLayoutSidebarPanel v-else :data="block.data" @update:data="handleUpdateData" />
</template>

<script setup lang="ts">
import { useInspectorDrawer } from '../../documents/editor/editor.store';
import { computed } from 'vue';
import EmailLayoutSidebarPanel from './ConfigurationPanel/input-panels/EmailLayoutSidebarPanel.vue';
import type { EmailLayoutProps } from '@flyhub/email-builder/blocks/EmailLayout';

const inspectorDrawer = useInspectorDrawer()

const block = computed(() => inspectorDrawer.document.root)

/** Functions */

function handleUpdateData(data: Omit<EmailLayoutProps, 'document'>) {
  inspectorDrawer.setDocument({
    root: {
      type: 'EmailLayout',
      data,
    }
  })
}

</script>
