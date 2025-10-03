<template>
  <a
    :href="href"
    download="emailTemplate.json"
    class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
    title="Download JSON file"
  >
    <span class="material-symbols-outlined text-base">download</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInspectorDrawer } from '../../../documents/editor/editor.store'

const inspectorDrawer = useInspectorDrawer()

const href = computed(() => {
  const doc = inspectorDrawer.document
  return `data:text/plain,${encodeURIComponent(JSON.stringify(doc, null, '  '))}`;
})
</script>
