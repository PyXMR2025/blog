---
title: 友情链接
type: links
layout: links
date: 2026-1-20 18:06:39
update: 2026-1-20 18:06:39
toc:
  enable: false
---

<ul id="randomBlogList" style="list-style: none; padding-left: 0; line-height: 2.2;"></ul>
<script>
// 定义博客列表数据（名称+链接）
const blogList = [
  {name: "lololowe的博客", url: "https://blog.lololowe.com/", desc: "计网，网安知识分享"},
  {name: "博客之家", url: "https://www.perass.com/", desc: "个人博客导航网站"},
  {name: "雨月空间", url: "https://www.mintimate.cn/", desc: "专注与你分享技术教程～"},
  {name: "运维小弟", url: "https://blog.srebro.cn/", desc: "专注技术积累，探索运维之道"},
  {name: "杨杨得亿", url: "https://yydy.link:2023/", desc: "关注网络安全，虚拟化，SSLVPN 等相关领域。"},
  {name: "SRE运维博客", url: "https://www.cnsre.cn/", desc: "专注SRE运维技术分享的博客"},
  {name: "东评西就", url: "https://dongjunke.cn/", desc: "小饿,专注科技互联网、社交媒体运营"},
  {name: "吃白饭的休伯利安号", url: "https://www.eatrice.cn/", desc: "用电脑搬砖的土木工程师"},
  {name: "老王的个人博客", url: "https://blog.oldwang.site/", desc: "这是一个 LinuxSre 相关的技术博客"},
  {name: "SimonSu", url: "https://simonsu.cn/", desc: "这是一个记录生活、工作点滴的个人博客。这里没有华丽的文字，没有像花一样美的图片，只有平静生活中所感、所见、所爱的记忆。"},
  {name: "小码同学", url: "https://blog.hikki.site/", desc: "喜欢的东西就努力去追求，万一成功了呢!"}
];

// Fisher-Yates 
function shuffleArray(arr) {
  const newArr = [...arr]; // 浅拷贝避免修改原数组
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// 渲染打乱后的博客列表
const container = document.getElementById("randomBlogList");
shuffleArray(blogList).forEach(blog => {
  const li = document.createElement("li");
  li.innerHTML = `- <a href="${blog.url}" target="_blank" rel="noopener noreferrer">${blog.name}</a>：${blog.desc}`;
  container.appendChild(li);
});
</script>
