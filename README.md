# 个人主页

适用于 GitHub Pages 的纯静态个人主页，无框架、无构建依赖，推送后即可自动部署。

首页构图参考 [Chien-W/Personal-home-page](https://github.com/Chien-W/Personal-home-page)：保留其全屏背景、中央头像与胶囊导航的结构；页面代码与浅色山湖背景均为本项目重新制作，未复制参考仓库中的个人照片、壁纸或脚本。

## 项目结构

```text
personal-homepage/
├── .github/workflows/pages.yml   # GitHub Pages 自动部署
├── .openai/hosting.json          # 在线预览配置
├── dist/                         # 网站发布目录
│   ├── index.html                # 首页
│   ├── home.css                  # 首页样式
│   ├── styles.css                # 详情页公共样式
│   ├── pages.css                 # 个人信息页样式
│   ├── site.config.js            # 个人信息与首页文字配置
│   ├── app.js                    # 公共交互
│   ├── about.html                # 个人信息页
│   └── project-go-ditecting.html # 项目详情页
└── README.md
```

## 修改个人信息

优先编辑 [`dist/site.config.js`](dist/site.config.js)：

```js
window.PORTFOLIO_CONFIG = {
  homepage: {
    title: "个人主页展示",
    projectLabel: "个人项目",
    profileLabel: "个人信息"
  },
  profile: {
    name: "你的姓名",
    direction: "你的研究或工作方向",
    biography: "个人简介",
    age: "年龄（可留空自动计算）",
    birthday: "2000-01-01",
    hometown: "生源地",
    politicalStatus: "政治面貌",
    englishLevel: "英语语言等级",
    undergraduateSchool: "本科院校",
    undergraduateUrl: "https://学校官网",
    undergraduateMajor: "本科专业",
    undergraduatePeriod: "时间",
    undergraduateRole: "本科班级职务",
    graduateSchool: "研究生院校",
    graduateUrl: "https://学校官网",
    graduateMajor: "研究生专业或研究方向",
    graduatePeriod: "时间",
    graduateRole: "研究生班级职务",
    email: "你的邮箱",
    emailLink: "mailto:你的邮箱",
    githubUrl: "你的 GitHub 地址",
    awards: [
      { year: "2026", title: "奖项名称", detail: "奖项级别或排名" }
    ]
  }
};
```

详细页面的固定内容可直接修改 `dist` 中对应的 HTML 文件。

## 本地预览

```bash
cd dist
python -m http.server 4173
```

访问 `http://localhost:4173`。

## 发布到 GitHub Pages

1. 在 GitHub 新建一个空仓库。
2. 将本目录推送到仓库的 `main` 分支。
3. 在仓库的 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
4. 后续每次向 `main` 推送，`.github/workflows/pages.yml` 都会自动发布 `dist`。
