# Vue Router 配置說明

## 🚀 Vue Router 已成功整合

您的專案現在已經配置了 Vue Router，並且正確地使用了環境變數中的 `VITE_BASE_URL` 作為路由的基礎路徑。

## 📁 專案結構

```
src/
├── router/
│   └── index.js          # 路由配置檔案
├── views/
│   ├── HomePage.vue      # 首頁元件
│   ├── EditorPage.vue    # 編輯器頁面
│   └── TemplatesPage.vue # 模板庫頁面
├── App.vue               # 主應用元件 (包含導航)
└── main.js               # 應用入口 (整合路由)
```

## 🛣️ 路由配置

### 基礎路徑配置

- 路由的基礎路徑從環境變數 `VITE_BASE_URL` 自動讀取
- 支援開發環境和生產環境的不同配置

### 路由清單

- `/` - 首頁 (HomePage.vue)
- `/editor` - 郵件編輯器 (EditorPage.vue)
- `/templates` - 模板庫 (TemplatesPage.vue)
- 其他路徑 - 自動重定向到首頁

## 🎨 功能特性

### 1. 響應式導航列

- 自動高亮當前路由
- 在編輯器頁面自動隱藏導航列以節省空間
- 行動裝置適配

### 2. 路由資訊顯示

- 每個頁面都顯示當前路由資訊
- 顯示路由器的基礎路徑配置
- 便於除錯和驗證配置

### 3. 頁面標題管理

- 路由守衛自動設定頁面標題
- 每個路由都有獨立的標題配置

## 💻 開發使用

### 路由跳轉

```vue
<!-- 模板中使用 router-link -->
<router-link to="/editor">編輯器</router-link>

<!-- 程式化導航 -->
this.$router.push('/templates')
```

### 取得路由資訊

```vue
<!-- 當前路由路徑 -->
{{ $route.path }}

<!-- 路由器基礎路徑 -->
{{ $router.options.history.base }}
```

### 環境變數使用

```javascript
// 在元件中取得 baseURL
const baseUrl = import.meta.env.VITE_BASE_URL;
```

## 🔧 配置修改

如需修改路由的基礎路徑，只需要修改相應的環境變數檔案：

```bash
# .env.development
VITE_BASE_URL=/email-builder/

# .env.production
VITE_BASE_URL=/my-app/
```

重新建構後，所有路由和資源路徑都會自動更新。

## ✅ 驗證路由配置

1. **開發環境**: `pnpm start` - 存取 `http://localhost:8080/email-builder/`
2. **建構驗證**: `pnpm build` - 檢查 `dist/index.html` 中的路徑前綴
3. **路由導航**: 測試頁面間的跳轉是否正常
4. **路徑顯示**: 檢查頁面中顯示的路由資訊是否正確

現在您的 Email Builder 專案已經擁有了完整的路由系統！🎉
