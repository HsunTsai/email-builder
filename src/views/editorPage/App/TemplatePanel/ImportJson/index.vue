<template>
  <button
    @click="open = true"
    class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
    title="Import JSON"
  >
    <span class="material-symbols-outlined text-base">upload</span>
  </button>

  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="open = false" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Import JSON
              </DialogTitle>
              
              <div class="mt-4 space-y-4">
                <p class="text-sm text-gray-600">
                  Copy and paste an EmailBuilder.js JSON (<a
                    href="https://gist.githubusercontent.com/jordanisip/efb61f56ba71bd36d3a9440122cb7f50/raw/30ea74a6ac7e52ebdc309bce07b71a9286ce2526/emailBuilderTemplate.json"
                    target="_blank"
                    class="text-blue-500 hover:underline"
                  >example</a>).
                </p>

                <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3">
                  <p class="text-sm text-red-800">{{ error }}</p>
                </div>

                <form @submit.prevent="handleSubmit">
                  <textarea
                    v-model="value"
                    @input="handleChange"
                    required
                    rows="10"
                    :class="[
                      'w-full border rounded-md px-3 py-2 text-sm resize-none',
                      error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    ]"
                    placeholder="Paste your JSON here..."
                  />
                </form>

                <p class="text-xs text-gray-500"> This will override your current template. </p>
              </div>

              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  @click="open = false"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  :disabled="error !== null"
                  :class="[
                    'inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    error ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  ]"
                  @click="handleSubmit"
                >
                  Import
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useInspectorDrawer } from '../../../documents/editor/editor.store';
import validateJsonStringValue from './validateJsonStringValue';

const inspectorDrawer = useInspectorDrawer()

/** Refs */

const value = ref('')
const error = ref<string | null>(null)
const open = ref(false)

/** Functions */

function handleChange() {
  error.value = validateJsonStringValue(value.value).error ?? null
}

function handleSubmit() {
  const { error: err, data } = validateJsonStringValue(value.value)
  error.value = err ?? null

  if (!data) return

  inspectorDrawer.resetDocument(data)
  open.value = false
}
</script>
