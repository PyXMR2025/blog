---
title: 友情链接
type: links
layout: links
date: 2026-1-20 18:06:39
update: 2026-1-20 18:06:39
toc:
  enable: false
---

<!-- 适配Hexo Next主题的友情链接卡片式布局 -->
<div class="links-container" style="max-width: 900px; margin: 0 auto; padding: 20px 15px;">
  <div id="randomBlogList" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px;"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // 博客列表数据
  const blogList = [
    {name: "lololowe的博客", url: "https://blog.lololowe.com/", desc: "计网，网安知识分享"},
    {name: "LiKai Blog", url: "https://tylk.cc/", desc: "云端电波起，星河寄心声"},
    {name: "运维小弟", url: "https://blog.srebro.cn/", desc: "专注技术积累，探索运维之道"},
    {name: "杨杨得亿", url: "https://yydy.link:2023/", desc: "关注网络安全，虚拟化，SSLVPN 等相关领域。"},
    {name: "SRE运维博客", url: "https://www.cnsre.cn/", desc: "专注SRE运维技术分享的博客"},
    {name: "老王的个人博客", url: "https://blog.oldwang.site/", desc: "这是一个 LinuxSre 相关的技术博客"},
    {name: "宗宗酱", url: "https://ygz.ink/", desc: "用文字和图片记录生活！"},
    {name: "我是军爸", url: "https://me.xu19.com/", desc: "记录单片机编程教学、生活与成长点滴"},
    {name: "朱小呆", url: "https://zhujay.com/", desc: "不是什么技术大佬，完全就是瞎折腾。这里没有技术分享，只有简简单单的生活记录与你分享。"},
    {name: "西瓜猜字谜", url: "https://www.xiguacaizimi.top/", desc: "记录西瓜猜字谜的日常"},
    {name: "FatPanda的小站", url: "https://12am.moe/", desc: "Coder&OIer"}
  ];

  // Fisher-Yates 洗牌算法
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

  // 渲染卡片式链接（适配Next主题风格）
  shuffleArray(blogList).forEach(blog => {
    // 单个链接卡片
    const card = document.createElement("div");
    card.style.cssText = `
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      transition: all 0.3s ease;
      border: 1px solid #e9ecef;
    `;

    // 卡片hover效果（Next主题同款过渡）
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

    // 链接内容（适配Next主题字体和颜色）
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
