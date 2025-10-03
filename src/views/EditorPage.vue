<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <router-link
              to="/"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← 返回
            </router-link>
            <h1 class="text-2xl font-bold text-gray-900">郵件編輯器</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button class="btn-outline px-4 py-2">
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              預覽
            </button>
            <button class="btn btn-primary px-6 py-2">
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              儲存
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex h-screen">
      <!-- Sidebar -->
      <div
        class="w-80 bg-white shadow-sm border-r border-gray-200 overflow-y-auto"
      >
        <div class="p-6">
          <!-- Tools Section -->
          <div class="mb-8">
            <h3
              class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4"
            >
              元件工具
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="tool in tools"
                :key="tool.name"
                class="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 text-center group"
                @click="selectTool(tool)"
              >
                <div class="text-2xl mb-2">{{ tool.icon }}</div>
                <div
                  class="text-sm font-medium text-gray-700 group-hover:text-blue-600"
                >
                  {{ tool.name }}
                </div>
              </button>
            </div>
          </div>

          <!-- Properties Panel -->
          <div v-if="selectedElement" class="mb-8">
            <h3
              class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4"
            >
              屬性設定
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  標題
                </label>
                <input
                  v-model="selectedElement.title"
                  type="text"
                  class="input w-full"
                  placeholder="輸入標題"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  內容
                </label>
                <textarea
                  v-model="selectedElement.content"
                  class="input w-full h-24 resize-none"
                  placeholder="輸入內容"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  背景顏色
                </label>
                <div class="flex space-x-2">
                  <input
                    v-model="selectedElement.backgroundColor"
                    type="color"
                    class="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    v-model="selectedElement.backgroundColor"
                    type="text"
                    class="input flex-1"
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Layers Panel -->
          <div>
            <h3
              class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4"
            >
              圖層
            </h3>
            <div class="space-y-2">
              <div
                v-for="(element, index) in elements"
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                :class="{
                  'ring-2 ring-blue-500 bg-blue-50':
                    selectedElement === element,
                }"
                @click="selectElement(element)"
              >
                <div class="flex items-center">
                  <span class="text-lg mr-3">{{
                    getElementIcon(element.type)
                  }}</span>
                  <span class="text-sm font-medium text-gray-700">
                    {{ element.title || element.type }}
                  </span>
                </div>
                <button
                  class="text-gray-400 hover:text-red-500 transition-colors"
                  @click.stop="removeElement(index)"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-if="elements.length === 0"
                class="text-center py-8 text-gray-500"
              >
                <svg
                  class="w-12 h-12 mx-auto mb-3 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p class="text-sm">尚無任何元件</p>
                <p class="text-xs text-gray-400 mt-1">從左側工具列拖拽元件</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Canvas Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 p-8 overflow-auto">
          <div class="max-w-2xl mx-auto">
            <!-- Canvas -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden min-h-96">
              <div class="bg-gray-100 px-6 py-3 border-b border-gray-200">
                <div class="text-sm text-gray-600">郵件預覽</div>
              </div>
              <div class="p-6 min-h-80" @click="clearSelection">
                <div
                  v-for="(element, index) in elements"
                  :key="index"
                  class="mb-4 p-4 border-2 border-transparent rounded-lg cursor-pointer hover:border-gray-300 transition-colors"
                  :class="{
                    'border-blue-500 bg-blue-50': selectedElement === element,
                  }"
                  :style="{
                    backgroundColor: element.backgroundColor || 'transparent',
                  }"
                  @click.stop="selectElement(element)"
                >
                  <!-- Text Element -->
                  <div v-if="element.type === 'text'">
                    <h3
                      v-if="element.title"
                      class="text-lg font-semibold text-gray-900 mb-2"
                    >
                      {{ element.title }}
                    </h3>
                    <p class="text-gray-700 leading-relaxed">
                      {{ element.content || "請輸入文字內容..." }}
                    </p>
                  </div>

                  <!-- Button Element -->
                  <div
                    v-else-if="element.type === 'button'"
                    class="text-center"
                  >
                    <button class="btn btn-primary px-6 py-3">
                      {{ element.title || "按鈕" }}
                    </button>
                  </div>

                  <!-- Image Element -->
                  <div v-else-if="element.type === 'image'" class="text-center">
                    <div
                      class="bg-gray-200 rounded-lg p-8 border-2 border-dashed border-gray-300"
                    >
                      <svg
                        class="w-16 h-16 mx-auto text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p class="text-gray-500">
                        {{ element.title || "圖片佔位符" }}
                      </p>
                    </div>
                  </div>

                  <!-- Divider Element -->
                  <div v-else-if="element.type === 'divider'">
                    <hr class="border-gray-300" />
                  </div>
                </div>

                <!-- Empty State -->
                <div v-if="elements.length === 0" class="text-center py-20">
                  <svg
                    class="w-20 h-20 mx-auto text-gray-300 mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">
                    開始建立您的郵件
                  </h3>
                  <p class="text-gray-500 mb-6">
                    從左側工具列選擇元件來開始設計
                  </p>
                  <div class="text-sm text-gray-400 space-y-1">
                    <p>
                      當前路由基礎路徑:
                      <code class="bg-gray-100 px-2 py-1 rounded">{{
                        $router.options.history.base
                      }}</code>
                    </p>
                    <p>
                      當前路由:
                      <code class="bg-gray-100 px-2 py-1 rounded">{{
                        $route.path
                      }}</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditorPage",
  data() {
    return {
      elements: [],
      selectedElement: null,
      tools: [
        { name: "文字", type: "text", icon: "📝" },
        { name: "按鈕", type: "button", icon: "🔘" },
        { name: "圖片", type: "image", icon: "🖼️" },
        { name: "分隔線", type: "divider", icon: "➖" },
      ],
    };
  },
  methods: {
    selectTool(tool) {
      const newElement = {
        type: tool.type,
        title: tool.name,
        content:
          tool.type === "text"
            ? "這是一段示例文字，請修改為您需要的內容。"
            : "",
        backgroundColor: "#ffffff",
      };
      this.elements.push(newElement);
      this.selectedElement = newElement;
    },
    selectElement(element) {
      this.selectedElement = element;
    },
    clearSelection() {
      this.selectedElement = null;
    },
    removeElement(index) {
      this.elements.splice(index, 1);
      if (
        this.selectedElement &&
        !this.elements.includes(this.selectedElement)
      ) {
        this.selectedElement = null;
      }
    },
    getElementIcon(type) {
      const iconMap = {
        text: "📝",
        button: "🔘",
        image: "🖼️",
        divider: "➖",
      };
      return iconMap[type] || "❓";
    },
  },
};
</script>
