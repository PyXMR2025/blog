---
title: 友情链接
type: links
layout: links
date: 2026-01-20 18:06:39
update: 2026-01-20 18:06:39
toc:
  enable: false
robots: "noindex, follow"
description: 本页面是友情链接页面，用于展示其他博客的链接。
---

<div class="links-container" style="max-width: 900px; margin: 0 auto; padding: 20px 15px;">
  <div id="randomBlogList" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px;"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const blogList = [
      {name: "lololowe的博客", url: "https://blog.lololowe.com/", desc: "计网，网安知识分享"},
      {name: "LiKai Blog", url: "https://tylk.cc/", desc: "云端电波起，星河寄心声"},
      {name: "运维小弟", url: "https://blog.srebro.cn/", desc: "专注技术积累，探索运维之道"},
      {name: "SRE运维博客", url: "https://www.cnsre.cn/", desc: "专注SRE运维技术分享的博客"},
      {name: "老王的个人博客", url: "https://blog.oldwang.site/", desc: "这是一个 LinuxSre 相关的技术博客"},
      {name: "我是军爸", url: "https://me.xu19.com/", desc: "记录单片机编程教学、生活与成长点滴"},
      {name: "朱小呆", url: "https://zhujay.com/", desc: "不是什么技术大佬，完全就是瞎折腾。这里没有技术分享，只有简简单单的生活记录与你分享。"},
      {name: "FatPanda的小站", url: "https://12am.moe/", desc: "Coder&OIer"},
      {name: "Chongxiの咖啡屋", url: "https://xice.cx/", desc: "Lose yourself to find yourself"},
      {name: "西瓜猜字谜", url: "https://www.xiguacaizimi.top/", desc: "记录西瓜猜字谜的日常"}
  ];

  // Fisher-Yates
  function shuffleArray(arr) {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  const container = document.getElementById("randomBlogList");
  if (!container) {
    console.error("未找到randomBlogList容器元素");
    return;
  }

  shuffleArray(blogList).forEach(blog => {
    const card = document.createElement("div");
    card.style.cssText = `
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      transition: all 0.3s ease;
      border: 1px solid #e9ecef;
    `;

    card.onmouseover = function() {
      this.style.background = "#f1f3f5";
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
    };
    card.onmouseout = function() {
      this.style.background = "#f8f9fa";
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    };

    card.innerHTML = `
      <a href="${blog.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
        <h4 style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px; font-weight: 600;">${blog.name}</h4>
      </a>
      <p style="margin: 0; color: #6c757d; font-size: 14px; line-height: 1.5;">${blog.desc}</p>
    `;

    container.appendChild(card);
  });
});
</script>

## 成为朋友

### 我方博客信息整理

|项目|详情|
| ---- | ---- |
|博客名称|ZJACKIE's BLOG|
|站点简介|深耕信息技术与软硬件，记录实战踩坑经历、沉淀实用避坑方案|
|站点图标|https://blog.zjackie.ink/img/favcion/image.png|
|访问链接|https://blog.zjackie.ink/|
|RSS|https://blog.zjackie.ink/atom.xml|

### 两种添加方式

#### 博客评论区留言对接

直接在博客评论区评论，等待博主审核即可。

#### GitHub PR 提交对接

1. Fork[博客源码仓库](https://github.com/PyXMR2025/blog)，克隆至本地；
2. 打开路径 `source/links/index.md`，参照站内现有友链格式，新增友链条目；
3. 打开 `_config.yml` 文件末尾，补充该站点链接至**内链排除配置项**（优化SEO效果）；
4. 提交Commit、推送至你的仓库，向原仓库发起Pull Request，PR标题标注「新增友链：博客名称」，等待博主合并审核。

### 三、格式参考

`source/links/index.md`示例：

```markdown
      {name: "Chongxiの咖啡屋", url: "https://xice.cx/", desc: "Lose yourself to find yourself"}
```

`_config.yml`末尾内链排除示例：

```yaml
# 内链排除配置
  exclude:
    - "blog.lololowe.com"
```
