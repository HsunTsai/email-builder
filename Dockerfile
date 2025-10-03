# 統一的 Dockerfile for 開發和生產環境

FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 安裝 pnpm 和 nginx
RUN npm install -g pnpm && \
    apk add --no-cache nginx curl

# 複製 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安裝依賴
RUN pnpm install --frozen-lockfile

# 複製所有原始碼
COPY . .

# 設定建置時的環境變數
ARG VITE_BASE_URL=/email-builder/
ENV VITE_BASE_URL=$VITE_BASE_URL

# 建置應用
RUN pnpm build

# 複製 nginx 配置
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# 複製建置產出到 nginx 靜態檔案目錄
RUN cp -r dist/* /var/lib/nginx/html/

# 創建 nginx 執行目錄
RUN mkdir -p /run/nginx

# 暴露端口
EXPOSE 80

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]