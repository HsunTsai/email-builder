<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">模板庫</h1>
            <p class="mt-2 text-gray-600">選擇一個模板開始您的郵件設計</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Search -->
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                v-model="searchQuery"
                type="text" 
                class="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="搜尋模板..."
              />
            </div>
            <!-- Filter -->
            <select 
              v-model="selectedCategory"
              class="block px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">所有分類</option>
              <option value="business">商務</option>
              <option value="newsletter">電子報</option>
              <option value="promotional">促銷</option>
              <option value="event">活動</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Category Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8">
          <button 
            v-for="category in categories" 
            :key="category.value"
            @click="selectedCategory = category.value"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            :class="selectedCategory === category.value 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ category.label }}
            <span class="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {{ getTemplateCount(category.value) }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Templates Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="template in filteredTemplates" 
          :key="template.id"
          class="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
          @click="selectTemplate(template)"
        >
          <!-- Template Preview -->
          <div class="aspect-w-3 aspect-h-4 bg-gray-100 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div class="text-center p-6">
                <div class="text-4xl mb-3">{{ template.icon }}</div>
                <div class="space-y-2">
                  <div class="h-2 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  <div class="h-2 bg-gray-300 rounded w-1/2 mx-auto"></div>
                  <div class="h-2 bg-gray-300 rounded w-2/3 mx-auto"></div>
                </div>
              </div>
            </div>
            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
              <button class="btn btn-primary opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300">
                使用此模板
              </button>
            </div>
            <!-- Category badge -->
            <div class="absolute top-3 right-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ getCategoryLabel(template.category) }}
              </span>
            </div>
          </div>
          
          <!-- Template Info -->
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {{ template.name }}
            </h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">
              {{ template.description }}
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="flex -space-x-1">
                  <div 
                    v-for="n in 5" 
                    :key="n"
                    class="w-4 h-4 rounded-full border-2 border-white"
                    :class="n <= template.rating ? 'bg-yellow-400' : 'bg-gray-200'"
                  ></div>
                </div>
                <span class="text-xs text-gray-500">({{ template.downloads }})</span>
              </div>
              <span class="text-sm font-medium text-green-600">免費</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredTemplates.length === 0" class="text-center py-20">
        <svg class="w-20 h-20 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">沒有找到符合條件的模板</h3>
        <p class="text-gray-500 mb-6">試試其他搜尋條件或瀏覽所有分類</p>
        <button 
          @click="clearFilters"
          class="btn btn-primary"
        >
          清除篩選條件
        </button>
      </div>

      <!-- Load More -->
      <div v-if="filteredTemplates.length > 0 && filteredTemplates.length < totalTemplates" class="text-center mt-12">
        <button class="btn-outline px-8 py-3">
          載入更多模板
        </button>
      </div>

      <!-- Router Info -->
      <div class="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">路由資訊</h3>
        <div class="space-y-2 text-sm">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">當前路由:</span>
            <code class="bg-gray-100 text-gray-800 px-2 py-1 rounded">{{ $route.path }}</code>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Router Base:</span>
            <code class="bg-gray-100 text-gray-800 px-2 py-1 rounded">{{ $router.options.history.base }}</code>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Custom Template CTA -->
    <div class="bg-blue-50 border-t border-blue-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            沒有找到合適的模板？
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            使用我們的編輯器創建您自己的客製化郵件模板
          </p>
          <router-link to="/editor" class="btn btn-primary text-lg px-8 py-3">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            創建新模板
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplatesPage',
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      totalTemplates: 8,
      categories: [
        { label: '全部', value: '' },
        { label: '商務', value: 'business' },
        { label: '電子報', value: 'newsletter' },
        { label: '促銷', value: 'promotional' },
        { label: '活動', value: 'event' }
      ],
      templates: [
        {
          id: 1,
          name: '歡迎郵件',
          description: '使用者註冊後的歡迎郵件模板，溫馨友好的第一印象',
          category: 'business',
          icon: '👋',
          rating: 5,
          downloads: 3421
        },
        {
          id: 2,
          name: '行銷推廣',
          description: '產品推廣和行銷活動郵件模板，有效提升轉換率',
          category: 'promotional',
          icon: '🚀',
          rating: 4,
          downloads: 1890
        },
        {
          id: 3,
          name: '通知郵件',
          description: '系統通知和提醒郵件模板，簡潔明瞭',
          category: 'business',
          icon: '📢',
          rating: 4,
          downloads: 654
        },
        {
          id: 4,
          name: '簡報模板',
          description: '定期簡報和新聞郵件模板，整齊的版面和清晰的分類',
          category: 'newsletter',
          icon: '📰',
          rating: 5,
          downloads: 2156
        },
        {
          id: 5,
          name: '活動邀請',
          description: '精美的活動邀請模板，適合各種慶典和聚會',
          category: 'event',
          icon: '🎉',
          rating: 4,
          downloads: 756
        },
        {
          id: 6,
          name: '商務邀請函',
          description: '適合正式商務邀請的專業模板，包含完整的活動資訊',
          category: 'business',
          icon: '💼',
          rating: 5,
          downloads: 1234
        },
        {
          id: 7,
          name: '促銷優惠券',
          description: '吸引人的優惠活動模板，有效提升轉換率',
          category: 'promotional',
          icon: '🎫',
          rating: 5,
          downloads: 1890
        },
        {
          id: 8,
          name: '節日祝福',
          description: '適合各種節日的祝福模板，傳遞溫暖和關懷',
          category: 'event',
          icon: '🎄',
          rating: 4,
          downloads: 1124
        }
      ]
    }
  },
  computed: {
    filteredTemplates() {
      let filtered = this.templates
      
      if (this.selectedCategory) {
        filtered = filtered.filter(template => template.category === this.selectedCategory)
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(template => 
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query)
        )
      }
      
      return filtered
    }
  },
  methods: {
    selectTemplate(template) {
      // Navigate to editor with template
      this.$router.push({
        name: 'Editor',
        query: { template: template.id }
      })
    },
    getCategoryLabel(category) {
      const categoryMap = {
        business: '商務',
        newsletter: '電子報',
        promotional: '促銷',
        event: '活動'
      }
      return categoryMap[category] || category
    },
    getTemplateCount(category) {
      if (!category) return this.templates.length
      return this.templates.filter(t => t.category === category).length
    },
    clearFilters() {
      this.searchQuery = ''
      this.selectedCategory = ''
    }
  }
}
</script>