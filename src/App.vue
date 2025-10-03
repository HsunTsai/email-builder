<template>
  <div id="app">
    <nav class="navigation" v-if="showNavigation">
      <div class="nav-container">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <img alt="Vue logo" src="./assets/logo.png" class="logo">
            <span>Email Builder</span>
          </router-link>
        </div>
        
        <div class="nav-links">
          <router-link to="/" class="nav-link">首頁</router-link>
          <router-link to="/templates" class="nav-link">模板庫</router-link>
          <router-link to="/editor" class="nav-link">編輯器</router-link>
        </div>
        
        <div class="nav-info">
          <span class="base-url">{{ baseUrl }}</span>
        </div>
      </div>
    </nav>
    
    <main class="main-content" :class="{ 'with-nav': showNavigation }">
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
      environment: import.meta.env.NODE_ENV || 'development'
    }
  },
  computed: {
    showNavigation() {
      // 在編輯器頁面隱藏頂部導航以獲得更多空間
      return this.$route.name !== 'Editor'
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

.navigation {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 64px;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.2rem;
}

.logo {
  height: 32px;
  margin-right: 12px;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #007bff;
}

.nav-link.router-link-active {
  color: #007bff;
  background-color: #e3f2fd;
}

.nav-info {
  font-size: 0.875rem;
  color: #6c757d;
}

.base-url {
  background-color: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
}

.main-content {
  min-height: calc(100vh - 64px);
}

.main-content.with-nav {
  background-color: #f8f9fa;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
  }
  
  .nav-links {
    gap: 16px;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
  
  .nav-info {
    display: none;
  }
}

@media (max-width: 480px) {
  .brand-link span {
    display: none;
  }
  
  .nav-links {
    gap: 8px;
  }
  
  .nav-link {
    padding: 4px 8px;
    font-size: 0.8rem;
  }
}
</style>
