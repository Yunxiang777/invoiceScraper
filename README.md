# 發票對獎系統
![Logo](./public/logo.png)
## 簡介

這是一個使用 React 和 TypeScript 開發的統一發票對獎系統。該系統旨在提供一個用戶友好的界面，允許用戶輸入發票號碼並快速檢查是否中獎。系統利用爬蟲包從指定的 API 獲取最新的發票數據，並使用 Tailwind CSS 進行美觀的樣式設計。

## 網址連結
https://invoicescraper.netlify.app/

## 部屬
- Netlify

## 技術棧

- **前端**: 
  - **React**: 用於構建用戶界面的 JavaScript 庫。
  - **TypeScript**: 增加了靜態類型檢查的 JavaScript 超集，提升開發效率與代碼可維護性。
  
- **樣式**: 
  - **Tailwind CSS**: 低層次 CSS 框架，通過實用的類來快速構建自定義設計。
  
- **後端**: 
  - **Netlify Functions**: 用於處理後端邏輯的無伺服器架構，方便快速部署和擴展。
  
- **爬蟲**: 
  - 使用爬蟲包進行數據抓取，確保可以獲取最新的發票信息。

## 依賴包

以下是項目中使用的主要 npm 包：

- `axios`: 用於發送 HTTP 請求，獲取發票數據。
- `lucide-react`: 提供的圖標庫，用於增強用戶界面的視覺效果。
- `tailwindcss`: 用於樣式設計的 CSS 框架。
- `vite`: 用於快速開發和構建的現代前端工具。
- `cheerio`: 爬蟲用具依賴包

## 環境變數

為了能夠在本地環境和生產環境之間自動切換 API，請設置以下環境變數：

```bash
REACT_APP_CRAWLER_API_URL=http://localhost:8888/.netlify/functions/crawler
