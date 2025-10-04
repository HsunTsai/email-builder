<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <ElButton circle @click="$emit('click', $event)">
      <Icon icon="mingcute:add-line" />
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ElButton } from "element-plus";

defineEmits<{
  (e: "click", args: MouseEvent): void;
}>();
</script>
