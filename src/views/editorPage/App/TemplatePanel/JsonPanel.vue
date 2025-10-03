<template>
  <HighlightedCodePanel type="json" :value="code" />
</template>

<script setup lang="ts">
import HighlightedCodePanel from './helper/HighlightedCodePanel.vue'
import { useInspectorDrawer } from '../../documents/editor/editor.store'
import { ref, watch } from 'vue'

const inspectorDrawer = useInspectorDrawer()

const code = ref<string>('')

watch(() => inspectorDrawer.document, async (document) => {
  const json = JSON.stringify(document, null, '  ')

  code.value = json
}, { immediate: true })
</script>
