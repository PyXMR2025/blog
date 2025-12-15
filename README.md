# Jackie's Blog

基于 Hexo 的静态博客，部署在 Vercel 平台。

## 在线访问

- **博客地址**: https://jackie.openenet.cn
- [![在vercel上部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pyxmr2025/blog/tree/main&template=hexo)

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

文章保存在 `source/_posts/` 目录下，使用 Markdown 格式编写。

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

主要配置文件为 `_config.yml`，包含博客的基本信息、主题设置等。

## 许可证

本项目代码部分采用 Apache License Version 2.0 开源协议，文字及图片类部分采用 CC BY-SA 4.0 开源协议。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个博客项目。

## 联系

- GitHub: https://github.com/PyXMR2025
- 博客: https://jackie.openenet.cn