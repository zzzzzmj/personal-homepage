# 赵明杰的个人主页

一个为 GitHub Pages 准备的纯静态个人主页，包含：

- Go 后端项目入口与 `go-ditecting` 项目档案；
- LeetCode Hot 100 图文题解目录与“两数之和”示例文章；
- 个人简介、教育经历和奖项区域；
- 响应式布局、算法筛选、阅读进度与代码复制。

## 本地预览

进入 `dist` 后启动任意静态文件服务器：

```bash
cd dist
python -m http.server 4173
```

浏览器访问 `http://localhost:4173`。

## 部署到 GitHub Pages

1. 将 `personal-homepage` 目录推送到一个 GitHub 仓库。
2. 在仓库的 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
3. 推送到 `main` 分支后，`.github/workflows/pages.yml` 会自动发布 `dist`。

## 上线前必须替换

在 `dist/index.html` 与 `dist/about.html` 中搜索“待补充”和 `your-email@example.com`，替换为真实信息：

- 本科院校、专业、起止时间与官网链接；
- 研究生院校、研究方向、起止时间与官网链接；
- 3–5 项获奖经历；
- 联系邮箱；
- 如有个人 GitHub 账号，可将导航链接替换为个人主页地址。

新增算法文章时，可复制 `dist/algorithm-two-sum.html`，并在 `dist/algorithms.html` 中增加对应目录项。
