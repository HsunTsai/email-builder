<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav v-if="showNavigation" class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-3 text-gray-900 hover:text-blue-600 transition-colors">
              <img alt="Vue logo" src="./assets/logo.png" class="h-8 w-8">
              <span class="text-xl font-semibold">Email Builder</span>
            </router-link>
          </div>
          
          <div class="hidden md:flex space-x-1">
            <router-link to="/" class="nav-link" :class="{ 'nav-link-active': $route.name === 'Home' }">
              首頁
            </router-link>
            <router-link to="/templates" class="nav-link" :class="{ 'nav-link-active': $route.name === 'Templates' }">
              模板庫
            </router-link>
            <router-link to="/editor" class="nav-link" :class="{ 'nav-link-active': $route.name === 'Editor' }">
              編輯器
            </router-link>
          </div>
          
          <div class="hidden md:block">
            <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
              {{ baseUrl }}
            </span>
          </div>
          
          <!-- 行動裝置選單按鈕 -->
          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 行動裝置選單 -->
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 py-3">
          <div class="space-y-1">
            <router-link to="/" @click="mobileMenuOpen = false" class="block nav-link" :class="{ 'nav-link-active': $route.name === 'Home' }">
              首頁
            </router-link>
            <router-link to="/templates" @click="mobileMenuOpen = false" class="block nav-link" :class="{ 'nav-link-active': $route.name === 'Templates' }">
              模板庫
            </router-link>
            <router-link to="/editor" @click="mobileMenuOpen = false" class="block nav-link" :class="{ 'nav-link-active': $route.name === 'Editor' }">
              編輯器
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      baseUrl: import.meta.env.VITE_BASE_URL || '/',
      environment: import.meta.env.NODE_ENV || 'development',
      mobileMenuOpen: false
    }
  },
  computed: {
    showNavigation() {
      // 在編輯器頁面隱藏頂部導航以獲得更多空間
      return this.$route.name !== 'Editor'
    }
  },
  watch: {
    $route() {
      // 路由變化時關閉行動裝置選單
      this.mobileMenuOpen = false
    }
  }
}
</script>
