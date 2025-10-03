<template>
  <div class="templates">
    <div class="templates-header">
      <h1>模板庫</h1>
      <router-link to="/editor" class="btn btn-primary">創建新模板</router-link>
    </div>
    
    <div class="templates-grid">
      <div class="template-card" v-for="template in templates" :key="template.id">
        <div class="template-preview">
          <div class="preview-content">
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>
          </div>
        </div>
        <div class="template-actions">
          <button class="btn btn-sm btn-outline">預覽</button>
          <button class="btn btn-sm btn-primary">使用模板</button>
        </div>
      </div>
    </div>
    
    <div class="router-info">
      <h3>路由資訊</h3>
      <p>當前路由: <code>{{ $route.path }}</code></p>
      <p>Router Base: <code>{{ $router.options.history.base }}</code></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplatesPage',
  data() {
    return {
      templates: [
        {
          id: 1,
          name: '歡迎郵件',
          description: '使用者註冊後的歡迎郵件模板'
        },
        {
          id: 2,
          name: '行銷推廣',
          description: '產品推廣和行銷活動郵件模板'
        },
        {
          id: 3,
          name: '通知郵件',
          description: '系統通知和提醒郵件模板'
        },
        {
          id: 4,
          name: '簡報模板',
          description: '定期簡報和新聞郵件模板'
        }
      ]
    }
  }
}
</script>

<style scoped>
.templates {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.templates-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.templates-header h1 {
  color: #2c3e50;
  margin: 0;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-block;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-outline {
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn-outline:hover {
  background-color: #007bff;
  color: white;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.template-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.template-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.template-preview {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.preview-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.25rem;
}

.preview-content p {
  margin: 0;
  opacity: 0.9;
}

.template-actions {
  padding: 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.router-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.router-info h3 {
  margin-top: 0;
  color: #2c3e50;
}

.router-info p {
  margin-bottom: 8px;
  color: #555;
}

.router-info code {
  background-color: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  color: #e83e8c;
}
</style>