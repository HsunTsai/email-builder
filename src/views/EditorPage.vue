<template>
  <div class="editor">
    <div class="editor-header">
      <div class="header-left">
        <router-link to="/" class="back-btn">← 返回</router-link>
        <h1>郵件編輯器</h1>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline">預覽</button>
        <button class="btn btn-primary">儲存</button>
      </div>
    </div>
    
    <div class="editor-content">
      <div class="toolbar">
        <div class="tool-group">
          <button class="tool-btn">📝 文字</button>
          <button class="tool-btn">🖼️ 圖片</button>
          <button class="tool-btn">🔗 連結</button>
          <button class="tool-btn">📊 表格</button>
        </div>
      </div>
      
      <div class="editor-workspace">
        <div class="canvas">
          <div class="email-template">
            <h2>歡迎使用郵件編輯器</h2>
            <p>在這裡您可以創建和編輯郵件模板。</p>
            <p>當前路由基礎路徑: <code>{{ $router.options.history.base }}</code></p>
            <p>當前路由: <code>{{ $route.path }}</code></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorPage'
}
</script>

<style scoped>
.editor {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background-color: #f8f9fa;
}

.editor-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
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

.editor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.toolbar {
  background: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
}

.tool-group {
  display: flex;
  gap: 10px;
}

.tool-btn {
  padding: 8px 12px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.tool-btn:hover {
  background-color: #e9ecef;
}

.editor-workspace {
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
  overflow: auto;
}

.canvas {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  min-height: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.email-template {
  padding: 40px;
}

.email-template h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.email-template p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.email-template code {
  background-color: #f8f9fa;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  color: #e83e8c;
}
</style>