# Docker 部署指南

本專案提供了簡潔的 Docker 支援，統一開發和生產環境配置。

## 🚀 快速開始

### 建置和運行

```bash
# 建置 Docker image
pnpm run docker:build

# 運行容器
pnpm run docker:run

# 使用 Docker Compose
docker-compose up -d
```

## 📋 基本指令

### npm 腳本

- `docker:build` - 建置 Docker image
- `docker:run` - 運行容器 (端口 8080)

### Docker 指令

```bash
# 建置（使用預設 base URL）
docker build -t email-builder .

# 建置（自定義 base URL）
docker build --build-arg VITE_BASE_URL=/custom-path/ -t email-builder .

# 運行
docker run -d -p 8080:80 --name email-builder email-builder

# 停止
docker stop email-builder

# 移除
docker rm email-builder

# 查看日誌
docker logs -f email-builder

# 進入容器
docker exec -it email-builder sh
```

## 🐳 Dockerfile 說明

### 特性

- 基於 Node.js 18 Alpine
- 內建 nginx 提供靜態檔案服務
- 建置時設定 base URL (ARG VITE_BASE_URL)
- 包含健康檢查功能
- 啟用 gzip 壓縮和安全標頭
- 支援 Vue Router history 模式
- 自動重定向根路徑到 `/email-builder/`

### 建置時環境變數

應用在建置階段設定 base URL，確保所有資源路徑正確。

## 🔧 環境變數

| 變數名          | 類型   | 描述         | 預設值            |
| --------------- | ------ | ------------ | ----------------- |
| `VITE_BASE_URL` | 建置時 | 應用基礎路徑 | `/email-builder/` |

### 自定義 base URL

```bash
# 建置時指定不同的 base URL
docker build --build-arg VITE_BASE_URL=/my-app/ -t email-builder .
```

## 🌐 存取應用

- **應用**: http://localhost:8080/email-builder/
- **健康檢查**: http://localhost:8080/health

## 🔍 除錯

### 查看容器狀態

```bash
docker ps
```

### 查看容器日誌

```bash
docker logs -f email-builder
```

### 測試健康檢查

```bash
curl http://localhost:8080/health
```

## 🚀 生產環境部署

```bash
# 建置
docker build -t email-builder:latest .

# 運行
docker run -d \
  -p 80:80 \
  --name email-builder-prod \
  -e VITE_BASE_URL=/your-path/ \
  --restart unless-stopped \
  email-builder:latest
```
