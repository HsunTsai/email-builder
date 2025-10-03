<template>
  <div class="home">
    <div class="hero-section">
      <h1>Email Builder</h1>
      <p>打造專業的郵件模板</p>
      <div class="base-url-info">
        <p>當前 Base URL: {{ baseUrl }}</p>
        <p>環境: {{ environment }}</p>
      </div>
      <div class="navigation-links">
        <router-link to="/editor" class="btn btn-primary">開始編輯</router-link>
        <router-link to="/templates" class="btn btn-secondary">模板庫</router-link>
      </div>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <h3>🎨 視覺化編輯</h3>
        <p>拖拽式介面，輕鬆創建郵件模板</p>
      </div>
      <div class="feature-card">
        <h3>📱 響應式設計</h3>
        <p>自動適配各種裝置和郵件客戶端</p>
      </div>
      <div class="feature-card">
        <h3>🚀 快速部署</h3>
        <p>一鍵匯出，支援多種格式</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      baseUrl: import.meta.env.VITE_BASE_URL || '/',
      environment: import.meta.env.NODE_ENV || 'development'
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.hero-section h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.hero-section p {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 30px;
}

.base-url-info {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 30px auto;
  max-width: 400px;
  border-left: 4px solid #007bff;
}

.base-url-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #495057;
}

.base-url-info p:first-child {
  font-weight: bold;
  color: #007bff;
}

.navigation-links {
  margin-top: 40px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  margin: 0 10px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.6;
}
</style>