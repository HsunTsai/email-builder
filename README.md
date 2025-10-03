# Email Builder

基於 Vue 3 + Vite 的郵件建構器專案。

## 環境配置

專案支援透過環境變數設定 basename：

### 環境變數檔案

- `.env` - 通用環境變數
- `.env.development` - 開發環境變數
- `.env.production` - 生產環境變數

### 主要環境變數

- `VITE_BASE_URL` - 應用的基礎路徑（basename）
- `NODE_ENV` - 環境類型

## 開發

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器
pnpm start

# 建構專案
pnpm build

# 預覽建構結果
pnpm preview
```

## 配置說明

### Vite 配置 (vite.config.js)

- 從環境變數中讀取 `VITE_BASE_URL` 作為應用的 basename
- 支援路徑別名 `@` 指向 `src` 目錄
- 配置了建構優化與程式碼分割

### 環境變數使用

在 Vue 元件中可以透過 `import.meta.env` 存取環境變數：

```javascript
// 取得 basename
const baseUrl = import.meta.env.VITE_BASE_URL

// 取得環境類型
const env = import.meta.env.NODE_ENV
```

### 修改 basename

如需修改應用的部署路徑，只需修改對應環境檔案中的 `VITE_BASE_URL` 值即可。
