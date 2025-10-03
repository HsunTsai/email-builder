<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Email Builder
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-8">打造專業的郵件模板</p>

        <!-- Base URL Info -->
        <div class="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 mb-10">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500"
                >當前 Base URL:</span
              >
              <code
                class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >{{ baseUrl }}</code
              >
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">環境:</span>
              <span
                class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded"
                >{{ environment }}</span
              >
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/editor" class="btn btn-primary text-lg px-8 py-3">
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            開始編輯
          </router-link>
          <router-link
            to="/templates"
            class="btn btn-secondary text-lg px-8 py-3"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            模板庫
          </router-link>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          class="card p-8 text-center transform hover:scale-105 transition-transform duration-300"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            🎨 視覺化編輯
          </h3>
          <p class="text-gray-600 leading-relaxed">
            拖拽式介面，輕鬆創建郵件模板
          </p>
        </div>

        <div
          class="card p-8 text-center transform hover:scale-105 transition-transform duration-300"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            📱 響應式設計
          </h3>
          <p class="text-gray-600 leading-relaxed">
            自動適配各種裝置和郵件客戶端
          </p>
        </div>

        <div
          class="card p-8 text-center transform hover:scale-105 transition-transform duration-300"
        >
          <div
            class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">🚀 快速部署</h3>
          <p class="text-gray-600 leading-relaxed">一鍵匯出，支援多種格式</p>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-20 bg-white rounded-2xl shadow-lg p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">100+</div>
            <div class="text-gray-600">專業模板</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-600 mb-2">99.9%</div>
            <div class="text-gray-600">相容性</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-purple-600 mb-2">5分鐘</div>
            <div class="text-gray-600">快速上手</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      baseUrl: import.meta.env.VITE_BASE_URL || "/",
      environment: import.meta.env.NODE_ENV || "development",
    };
  },
};
</script>
