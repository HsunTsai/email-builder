<template>
  <ElDialog v-model="open" title="Import JSON" width="500px">
    <div class="space-y-4">
      <p class="text-sm text-gray-600">
        Copy and paste an EmailBuilder.js JSON (<a
          href="https://gist.githubusercontent.com/jordanisip/efb61f56ba71bd36d3a9440122cb7f50/raw/30ea74a6ac7e52ebdc309bce07b71a9286ce2526/emailBuilderTemplate.json"
          target="_blank"
          class="text-blue-600 hover:underline"
          >example here</a
        >) into the text area below:
      </p>

      <div v-if="error" class="bg-red-50 border border-red-200 rounded p-3">
        <p class="text-sm text-red-800">{{ error }}</p>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">JSON</label>
        <textarea
          v-model="value"
          @input="handleChange"
          :class="[
            'w-full border rounded px-3 py-2 text-sm resize-none',
            error ? 'border-red-300' : 'border-gray-300',
          ]"
          rows="10"
          placeholder="Paste your JSON here..."
        ></textarea>
      </div>

      <p class="text-xs text-gray-500">
        This will override your current template.
      </p>
    </div>

    <template #footer>
      <span class="flex gap-2">
        <el-button @click="open = false">Cancel</el-button>
        <el-button
          type="primary"
          :disabled="error !== null"
          @click="handleSubmit"
        >
          Import
        </el-button>
      </span>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog } from "element-plus";
import { useInspectorDrawer } from "../../../../documents/editor/editor.store";
import validateJsonStringValue from "./validateJsonStringValue";

const open = defineModel<boolean>("open");

const inspectorDrawer = useInspectorDrawer();

const value = ref("");
const error = ref<string | null>(null);

const handleChange = () => {
  error.value = validateJsonStringValue(value.value).error ?? null;
}

const handleSubmit = () => {
  const { error: err, data } = validateJsonStringValue(value.value);
  error.value = err ?? null;

  if (!data) return;

  inspectorDrawer.resetDocument(data);
  open.value = false;
}
</script>

<style scoped></style>
