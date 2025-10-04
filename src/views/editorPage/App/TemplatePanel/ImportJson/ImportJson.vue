<template>
  <ElButton circle @click="open = true" title="Import JSON">
    <Icon icon="mingcute:file-upload-line" class="size-4" />
  </ElButton>

  <ImportDialog v-model:open="open" />
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { Icon } from "@iconify/vue";
import ImportDialog from "./importDialog/ImportDialog.vue";

const open = ref(false);
</script>
