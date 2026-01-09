# Jackie's Blog

基于 Hexo 的静态博客，部署在 Vercel 平台。

## 关于

这里是 Jackie 的个人博客，一名热爱技术的中国学生。专注分享**区块链、智能合约、以太坊、CI/CD、开源项目以及 IT 基础设施**的深度解析与实践笔记。

博客内容涵盖：
- 区块链技术与应用
- 智能合约开发与安全
- 以太坊生态与 DApp
- 持续集成/持续部署 (CI/CD)
- 开源项目实践
- IT 基础设施与系统管理

## 在线访问

- **博客地址**: https://jackie.openenet.cn
- **博客内容**: [探索区块链、自动化与开源技术](https://jackie.openenet.cn)
- [![在vercel上部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pyxmr2025/blog/tree/main&template=hexo)
- Github Actions & gh-pages分支构建状态：![构建状态](https://github.com/PyXMR2025/blog/actions/workflows/gh-pages.yml/badge.svg)
- Netlify构建状态：[![Netlify Status](https://api.netlify.com/api/v1/badges/0939a97c-ef8f-44ab-b9c2-65ed4c7be1ce/deploy-status)](https://app.netlify.com/projects/jackie-blog/deploys)

## 本地开发

### 环境要求
- Node.js (推荐最新 LTS 版本)
- Git

### 安装和运行
```bash
# 克隆仓库
git clone https://github.com/PyXMR2025/blog.git

# 进入项目目录
cd blog

# 安装依赖
npm install

# 本地运行
hexo server
```

访问 `http://localhost:4000` 查看本地预览。

## 写作指南

新建文章：
```bash
hexo new "文章标题"
```

文章保存在 `source/_posts/` 目录下，使用 Markdown 格式编写。建议在写作前参考博客已发布的文章风格和结构，保持内容质量。

## 项目结构

```
blog/
├── source/           # 文章和资源文件
│   └── _posts/      # 博客文章
├── themes/          # 主题文件
│   └── landscape/   # 默认主题
├── _config.yml      # 博客配置文件
└── package.json     # 项目依赖
```

## 配置说明

主要配置文件为 `_config.yml`，包含博客的基本信息、主题设置等。配置时请确保：
- `url` 设置为正确的博客地址
- `author` 设置为您的个人信息
- `language` 设置为博客使用的语言

## 许可证

- 代码协议：Apache License 2.0
- 内容协议：CC BY-SA 4.0

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个博客项目。请确保您的贡献符合以下标准：
1. 保持博客内容的专业性和技术深度
2. 遵循 Markdown 格式规范
3. 提交前请在本地测试您的更改

## 联系

- **GitHub**: [https://github.com/PyXMR2025](https://github.com/PyXMR2025)
- **博客**: [https://jackie.openenet.cn](https://jackie.openenet.cn)
- **邮箱**: [pyxmr2025@openenet.cn](mailto:pyxmr2025@openenet.cn)
- **Matrix**: [@pyxmr2025:mozilla.org](https://matrix.to/#/@pyxmr2025:mozilla.org)
- **捐赠支持**: Ethereum 地址 `0x0DB7Db25Acf1e72C9eE0aC5ba79aA51761023D09`

> 你的支持，是持续创作与开源分享的最大动力！💪

© 2025 Jackie. 本博客内容采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 许可证授权。
