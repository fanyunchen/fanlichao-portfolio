# 范立超个人网站

一个采用苹果风格视觉语言构建的个人网站，内容基于简历信息整理，聚焦 HarmonyOS Next 与前端开发能力展示。

## 项目结构

- `frontend/public`：GitHub Pages 静态发布目录
- `frontend/server.js`：本地前端静态服务
- `backend/server.js`：本地后端接口服务
- `.github/workflows/deploy-pages.yml`：GitHub Pages 自动部署工作流

## 本地运行

```bash
node backend/server.js
node frontend/server.js
```

前端默认地址：`http://127.0.0.1:3000`

后端接口地址：`http://127.0.0.1:3001/api/site-data`

## GitHub Pages 发布

推送到 GitHub 后，工作流会将 `frontend/public` 发布为 GitHub Pages 站点。
