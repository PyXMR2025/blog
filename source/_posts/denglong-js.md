---
title: JS/CSS 实现 3D 动态灯笼特效 · 博客网站新年美化教程
date: 2026-2-11 01:16:29
updated: 2026-2-11 01:16:29
tags: 
- JavaScript
- CSS
- 3D灯笼效果
- 前端特效
- 博客优化
- 网站美化
- 新年特效
- 前端开发
- 代码实现
category: 前端开发
---

临近新年，给博客/网站添一抹年味是很多站长的小小心愿。这篇文章将带你实现一款**纯JS+CSS打造的3D动态灯笼特效**，无需依赖任何第三方库，直接引入即可使用。这款灯笼具备自然摆动、3D自转、灯光闪烁、流苏摇曳等动态效果，支持自定义文字（比如“新年快乐”“恭喜发财”），还做了移动端响应式适配，无论是Hexo、WordPress还是自建博客，都能轻松集成，让你的网站在新年里氛围感拉满。

> 注意：本文章是博主在阅读 [春节到了，给typecho博客网站添加两对3D红灯笼](https://blog.ybyq.wang/archives/1681.html) 后参考编写的，代码的部分思路来自于上文，读者可以点击上述链接查看。

核心特点：
- 🎨 纯原生实现：无jQuery/第三方库依赖，轻量化
- 🌟 3D视觉效果：CSS3 3D变换+渐变打造立体灯笼
- 🎢 多维度动画：摆动+自转+灯光闪烁+流苏摇曳，效果更自然
- ✨ 自定义能力：支持URL参数修改灯笼文字，常量统一管理样式
- 📱 响应式适配：移动端自动缩放，适配不同屏幕尺寸
- ⚡ 性能优化：使用`will-change`、`backface-visibility`等提升动画流畅度

> 3D灯笼效果（Desktop）
> ![3D灯笼效果（Desktop）](/img/denglong-js/1.png)

## 代码思路
整个3D灯笼的实现分为**结构层**和**样式层**两大核心，遵循“组件化拆分、常量统一管理、动画分层控制”的思路：

### 结构拆分（组件化思想）
将灯笼拆分为可复用的独立部件，通过JS动态创建DOM结构：
- 容器层（deng-container）：统一管理所有灯笼，控制整体定位
- 灯笼盒子（deng-box）：单个灯笼的外层，控制位置和动画延迟
- 3D容器（lantern-3d）：承载3D变换，负责灯笼整体摆动
- 灯笼部件：吊线、上下盖子、主体（瓣片+光源）、文字、流苏（珠子+中国结+穗子）

### 样式设计（3D+动画）
- 3D基础：通过`perspective`（透视）、`transform-style: preserve-3d`开启3D空间
- 立体效果：使用`radial-gradient`（径向渐变）制作灯笼瓣片的通透感，`linear-gradient`制作金色盖子
- 动画分层：不同动效拆分到不同元素，避免动画冲突：
  - 3D容器：负责“自然摆动”动画（rotateX/rotateZ）
  - 灯笼主体：负责“自转”动画（rotateY）
  - 光源：负责“闪烁”动画（opacity+scale）
  - 流苏：负责“摇曳”动画（独立的摆动曲线）

### 灵活扩展
- 常量抽离：所有样式参数（尺寸、颜色、动画时长）集中在`LANTERN_CONSTANTS`，方便修改
- URL参数解析：支持通过脚本URL传递`text`参数自定义灯笼文字（比如`lantern.js?text=恭喜发财`）
- 容错处理：解析URL参数时增加try-catch，避免参数错误导致整个特效失效
- 响应式：通过媒体查询适配移动端，自动缩放灯笼尺寸和位置

## 代码效果
### 视觉效果
- 4个灯笼分布在页面四角（可自定义位置），每个灯笼有不同的动画延迟，摆动更错落有致
- 灯笼主体360°缓慢自转，瓣片的渐变效果呈现出3D立体质感
- 内部光源持续闪烁，模拟灯笼内烛光的效果，有明暗和大小变化
- 灯笼整体自然摆动（X/Z轴旋转），流苏跟随摆动，还原真实灯笼的物理特性
- 金色文字叠加在灯笼上，带发光阴影，视觉层级更突出
- 移动端自动缩小灯笼尺寸，调整位置，避免遮挡内容

### 交互效果
- 灯笼区域不遮挡页面点击（`pointer-events: none`），不影响网站正常使用
- 无需手动操作，页面加载完成后自动渲染，零配置即可使用

## 代码实践
### 完整可运行代码
将以下代码保存为`lantern.js`文件（建议放在博客的`js`目录下），代码可直接使用：

```javascript
// 提取常量：便于统一修改和维护
const LANTERN_CONSTANTS = {
  CONTAINER_CLASS: 'deng-container',
  BOX_BASE_CLASS: 'deng-box',
  LANTERN_3D_CLASS: 'lantern-3d',
  DEFAULT_TEXTS: ['新', '年', '快', '乐'], // 默认灯笼文字
  RIB_COUNT: 10, // 灯笼瓣片数量（建议偶数，360/数量为整数）
  ANIMATION_DURATIONS: {
    swing: 5, // 摆动动画时长(s)，值越大摆动越慢
    rotate: 18, // 自转动画时长(s)
    flicker: 3, // 灯光闪烁时长(s)
    tasselSwing: 5 // 流苏摆动时长(s)
  },
  COLORS: {
    gold: '#ffca28', // 金色主色
    goldGradient: ['#ffd700', '#ffca28', '#b8860b'], // 盖子渐变
    red: '#d8000f', // 灯笼红色
    light: '#ffeb3b' // 灯光颜色
  },
  SIZES: {
    lanternWidth: 120, // 灯笼宽度
    lanternHeight: 100, // 灯笼高度
    capWidth: 50, // 盖子宽度
    capHeight: 12, // 盖子高度
    lightSize: 60, // 光源尺寸
    threadHeight: 70 // 流苏穗子高度
  }
};

/**
 * 创建灯笼容器（主入口）
 */
function createDengContainer() {
  const container = document.createElement('div');
  container.className = LANTERN_CONSTANTS.CONTAINER_CLASS;

  // 容错处理URL参数解析：避免无参数时报错
  const customText = getCustomTextFromUrl();
  const texts = customText ? customText.split('') : LANTERN_CONSTANTS.DEFAULT_TEXTS;
  // 限制文字数量（最多4个，对应4个灯笼）
  const validTexts = texts.length > 4 ? texts.slice(0, 4) : texts;
  // 不足4个时补默认文字
  while (validTexts.length < 4) {
    validTexts.push(LANTERN_CONSTANTS.DEFAULT_TEXTS[validTexts.length]);
  }

  validTexts.forEach((text, index) => {
    const box = createLanternBox(index);
    const lantern3D = createLantern3dWrapper();
    
    // 组装灯笼部件
    lantern3D.appendChild(createHangingLine());
    lantern3D.appendChild(createLanternCap('top'));
    lantern3D.appendChild(createLanternCap('bottom'));
    lantern3D.appendChild(createLanternBody());
    lantern3D.appendChild(createLanternText(text));
    lantern3D.appendChild(createLanternTassel());

    box.appendChild(lantern3D);
    container.appendChild(box);
  });

  document.body.appendChild(container);
}

/**
 * 从当前脚本URL获取自定义文字参数
 * @returns {string|null} 自定义文字或null
 */
function getCustomTextFromUrl() {
  try {
    const scriptSrc = document.currentScript?.src || '';
    const [, searchParams] = scriptSrc.split('?');
    if (!searchParams) return null;
    const urlParams = new URLSearchParams(searchParams);
    return urlParams.get('text')?.trim() || null;
  } catch (e) {
    console.warn('解析灯笼文字参数失败，使用默认文字:', e);
    return null;
  }
}

/**
 * 创建单个灯笼的外层盒子（控制位置和延迟）
 * @param {number} index 灯笼索引
 * @returns {HTMLElement} 灯笼盒子元素
 */
function createLanternBox(index) {
  const box = document.createElement('div');
  box.className = `${LANTERN_CONSTANTS.BOX_BASE_CLASS} ${LANTERN_CONSTANTS.BOX_BASE_CLASS}${index + 1}`;
  // 为每个灯笼设置不同的动画延迟，效果更自然
  box.style.animationDelay = `${index * 0.5}s`;
  return box;
}

/**
 * 创建灯笼3D容器（负责摆动）
 * @returns {HTMLElement} 3D容器元素
 */
function createLantern3dWrapper() {
  const lantern3D = document.createElement('div');
  lantern3D.className = LANTERN_CONSTANTS.LANTERN_3D_CLASS;
  return lantern3D;
}

/**
 * 创建灯笼吊线
 * @returns {HTMLElement} 吊线元素
 */
function createHangingLine() {
  const xian = document.createElement('div');
  xian.className = 'xian';
  return xian;
}

/**
 * 创建灯笼盖子（顶部/底部）
 * @param {string} position 'top' | 'bottom'
 * @returns {HTMLElement} 盖子元素
 */
function createLanternCap(position) {
  const cap = document.createElement('div');
  cap.className = `lantern-cap-${position}`;

  // 仅顶部盖子添加提环
  if (position === 'top') {
    const capLoop = document.createElement('div');
    capLoop.className = 'cap-loop';
    cap.appendChild(capLoop);
  }

  return cap;
}

/**
 * 创建灯笼主体（带瓣片和光源，负责自转）
 * @returns {HTMLElement} 灯笼主体元素
 */
function createLanternBody() {
  const lanternBody = document.createElement('div');
  lanternBody.className = 'lantern-body';

  // 添加内部光源
  const lanternLight = document.createElement('div');
  lanternLight.className = 'lantern-light';
  lanternBody.appendChild(lanternLight);

  // 创建瓣片（均匀分布）
  const ribAngle = 360 / LANTERN_CONSTANTS.RIB_COUNT;
  for (let i = 0; i < LANTERN_CONSTANTS.RIB_COUNT; i++) {
    const rib = document.createElement('div');
    rib.className = 'rib';
    rib.style.transform = `rotateY(${i * ribAngle}deg)`;
    lanternBody.appendChild(rib);
  }

  return lanternBody;
}

/**
 * 创建灯笼文字
 * @param {string} text 要显示的文字
 * @returns {HTMLElement} 文字元素
 */
function createLanternText(text) {
  const lanternText = document.createElement('div');
  lanternText.className = 'deng-t';
  lanternText.textContent = text;
  return lanternText;
}

/**
 * 创建灯笼流苏（替换innerHTML，提升性能和安全性）
 * @returns {HTMLElement} 流苏元素
 */
function createLanternTassel() {
  const tassel = document.createElement('div');
  tassel.className = 'tassel-total';

  // 珠子
  const bead = document.createElement('div');
  bead.className = 'tassel-bead';
  tassel.appendChild(bead);

  // 扁平中国结
  const knot = document.createElement('div');
  knot.className = 'tassel-knot-flat';
  tassel.appendChild(knot);

  // 流苏穗子
  const threads = document.createElement('div');
  threads.className = 'tassel-threads';
  tassel.appendChild(threads);

  return tassel;
}

/**
 * 添加灯笼样式（优化性能和兼容性）
 */
function addStyles() {
  const style = document.createElement('style');
  style.type = 'text/css';
  // 使用模板字符串拼接样式，结合常量保证样式统一
  style.textContent = `
    .deng-container {
      position: fixed; 
      top: 40px; 
      left: 0; 
      width: 100%; 
      height: 0;
      z-index: 99999; 
      pointer-events: none; /* 不遮挡页面点击 */
      perspective: 800px; /* 3D透视距离 */
    }
    
    .deng-box { 
      position: fixed; 
      z-index: 999; 
      will-change: transform; /* 告诉浏览器提前优化动画 */
    }
    
    .deng-box1 { left: 40px; top: -10px; }
    .deng-box2 { left: 180px; top: 30px; }
    .deng-box3 { right: 180px; top: 30px; }
    .deng-box4 { right: 40px; top: -10px; }

    .xian {
      position: absolute; 
      left: ${LANTERN_CONSTANTS.SIZES.lanternWidth / 2}px; 
      width: 3px; 
      background: ${LANTERN_CONSTANTS.COLORS.gold};
      height: 1000px; 
      top: -1000px; 
      box-shadow: 0 0 5px rgba(255, 202, 40, 0.6); 
      z-index: 1;
    }

    /* 容器负责整体摆动 */
    .lantern-3d {
      position: relative; 
      width: ${LANTERN_CONSTANTS.SIZES.lanternWidth}px; 
      height: ${LANTERN_CONSTANTS.SIZES.lanternHeight}px;
      transform-style: preserve-3d; /* 开启3D空间 */
      transform-origin: 50% 0; /* 摆动中心点（顶部） */
      will-change: transform; 
      animation: swingNatural ${LANTERN_CONSTANTS.ANIMATION_DURATIONS.swing}s infinite ease-in-out;
    }

    /* 主体负责自转 */
    .lantern-body {
      position: absolute; 
      width: 100%; 
      height: 100%;
      transform-style: preserve-3d; 
      will-change: transform;
      animation: rotateBody ${LANTERN_CONSTANTS.ANIMATION_DURATIONS.rotate}s infinite linear;
      z-index: 5; /* 确保在盖子下面一点 */
    }

    .rib {
      position: absolute; 
      top: 0; 
      left: 0; 
      width: 100%; 
      height: 100%;
      border-radius: 50%; 
      border: 1px solid rgba(255, 202, 40, 0.6); 
      box-sizing: border-box;
      background: radial-gradient(circle at 50% 50%, rgba(216,0,15,0) 20%, rgba(216,0,15,0.7) 60%, rgba(216,0,15,0.95) 100%);
      backface-visibility: visible; /* 显示背面，保证3D效果 */
    }

    /* 简化的、不旋转的盖子 */
    .lantern-cap-top, .lantern-cap-bottom {
      position: absolute; 
      left: ${(LANTERN_CONSTANTS.SIZES.lanternWidth - LANTERN_CONSTANTS.SIZES.capWidth) / 2}px; 
      width: ${LANTERN_CONSTANTS.SIZES.capWidth}px; 
      height: ${LANTERN_CONSTANTS.SIZES.capHeight}px;
      background: linear-gradient(to bottom, ${LANTERN_CONSTANTS.COLORS.goldGradient.join(', ')});
      border: 1px solid ${LANTERN_CONSTANTS.COLORS.gold}; 
      border-radius: 4px; 
      z-index: 20; /* 确保盖在旋转体上面 */
      box-shadow: 0 2px 5px rgba(0,0,0,0.4);
      will-change: transform;
    }
    
    .lantern-cap-top { 
      top: -${LANTERN_CONSTANTS.SIZES.capHeight / 2}px; 
      border-bottom: none; 
    }
    
    .lantern-cap-bottom { 
      bottom: -${LANTERN_CONSTANTS.SIZES.capHeight / 2}px; 
      border-top: none; 
    }

    /* 提环 */
    .cap-loop {
      position: absolute; 
      left: ${(LANTERN_CONSTANTS.SIZES.capWidth - 14) / 2}px; 
      top: -8px; 
      width: 14px; 
      height: 8px;
      border: 2px solid ${LANTERN_CONSTANTS.COLORS.gold}; 
      border-bottom: none; 
      border-radius: 10px 10px 0 0;
    }

    .lantern-light {
      position: absolute; 
      width: ${LANTERN_CONSTANTS.SIZES.lightSize}px; 
      height: ${LANTERN_CONSTANTS.SIZES.lightSize}px; 
      top: ${(LANTERN_CONSTANTS.SIZES.lanternHeight - LANTERN_CONSTANTS.SIZES.lightSize) / 2}px; 
      left: ${(LANTERN_CONSTANTS.SIZES.lanternWidth - LANTERN_CONSTANTS.SIZES.lightSize) / 2}px;
      background: ${LANTERN_CONSTANTS.COLORS.light}; 
      border-radius: 50%; 
      filter: blur(18px); /* 模糊实现光晕效果 */
      opacity: 0.9;
      will-change: opacity, transform;
      animation: flicker ${LANTERN_CONSTANTS.ANIMATION_DURATIONS.flicker}s infinite ease-in-out;
    }

    .deng-t {
      position: absolute; 
      width: 100%; 
      height: 100%;
      display: flex; 
      justify-content: center; 
      align-items: center;
      font-size: 3rem; 
      color: ${LANTERN_CONSTANTS.COLORS.gold}; 
      font-weight: 700; 
      font-family: "华文行楷", "KaiTi", "STKaiti", serif; /* 适配不同系统字体 */
      text-shadow: 0 0 5px #ff6a00, 0 0 20px #ff0000; /* 文字发光效果 */
      transform: translateZ(62px); /* 文字在3D空间的层级 */
      backface-visibility: hidden; /* 隐藏背面，提升性能 */
      -webkit-font-smoothing: antialiased; /* 文字抗锯齿 */
      z-index: 30;
    }

    .tassel-total {
      position: absolute; 
      top: ${LANTERN_CONSTANTS.SIZES.lanternHeight}px; 
      left: ${LANTERN_CONSTANTS.SIZES.lanternWidth / 2}px; 
      width: 0; 
      height: auto;
      transform-style: preserve-3d; 
      will-change: transform;
      animation: tasselSwing ${LANTERN_CONSTANTS.ANIMATION_DURATIONS.tasselSwing}s infinite ease-in-out; 
      animation-delay: 0.5s; /* 流苏摆动延迟，更自然 */
    }

    .tassel-bead {
      position: absolute; 
      left: -6px; 
      top: 5px; 
      width: 12px; 
      height: 12px;
      background: radial-gradient(circle at 30% 30%, #fff, #ef5350); /* 珠子渐变 */
      border-radius: 50%; 
      box-shadow: 0 2px 4px rgba(0,0,0,0.3); 
      z-index: 5;
    }

    /* 扁平的中国结 */
    .tassel-knot-flat {
      position: absolute; 
      left: -8px; 
      top: 18px; 
      width: 16px; 
      height: 16px;
      background: ${LANTERN_CONSTANTS.COLORS.red}; 
      border: 1px solid ${LANTERN_CONSTANTS.COLORS.gold};
      transform: rotate(45deg); 
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      z-index: 4;
    }

    .tassel-threads {
      position: absolute; 
      left: -7px; 
      top: 32px;
      width: 14px; 
      height: ${LANTERN_CONSTANTS.SIZES.threadHeight}px;
      background: repeating-linear-gradient(90deg, ${LANTERN_CONSTANTS.COLORS.red}, ${LANTERN_CONSTANTS.COLORS.red} 2px, #ff5252 2.5px, ${LANTERN_CONSTANTS.COLORS.red} 3px); /* 穗子纹理 */
      border-radius: 2px 2px 5px 5px;
      -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%); /* 渐变遮罩，穗子末端渐隐 */
      mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    }

    /* 灯光闪烁动画 */
    @keyframes flicker {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
    }
    
    /* 灯笼自然摆动动画 */
    @keyframes swingNatural {
      0% { transform: rotateX(-4deg) rotateZ(-2deg); }
      25% { transform: rotateX(2deg) rotateZ(3deg); }
      50% { transform: rotateX(4deg) rotateZ(2deg); }
      75% { transform: rotateX(-2deg) rotateZ(-3deg); }
      100% { transform: rotateX(-4deg) rotateZ(-2deg); }
    }
    
    /* 流苏摆动动画 */
    @keyframes tasselSwing {
      0% { transform: rotateX(-5deg) rotateZ(-5deg); }
      50% { transform: rotateX(5deg) rotateZ(5deg); }
      100% { transform: rotateX(-5deg) rotateZ(-5deg); }
    }
    
    /* 灯笼自转动画 */
    @keyframes rotateBody {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(360deg); }
    }
    
    /* 响应式优化：移动端适配 */
    @media (max-width: 768px) {
      .deng-box { transform: scale(0.6); }
      .deng-box1 { left: 10px; } 
      .deng-box2 { left: 80px; }
      .deng-box3 { right: 80px; } 
      .deng-box4 { right: 10px; }
      .deng-t { font-size: 2rem; } /* 移动端文字缩小 */
    }

    /* 暗黑模式适配（可选） */
    @media (prefers-color-scheme: dark) {
      .lantern-light { opacity: 1; } /* 暗黑模式下灯光更亮 */
    }
  `;
  document.head.appendChild(style);
}

/**
 * 初始化灯笼
 */
function initLantern() {
  // 确保DOM加载完成后执行，避免操作未渲染的DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addStyles();
      createDengContainer();
    });
  } else {
    addStyles();
    createDengContainer();
  }
}

// 启动灯笼（支持AMD/CMD/全局环境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initLantern };
} else if (typeof define === 'function' && define.amd) {
  define([], () => ({ initLantern }));
} else {
  // 全局环境自动初始化
  initLantern();
}
```

## 使用方法
### 基础使用（零配置）
将上述`lantern.js`文件上传到你的博客静态资源目录（比如`/js/lantern.js`），然后在博客的`</body>`标签前引入脚本即可：
> 注意：为了使博客页面加载更快，建议将脚本放到`</head>`标签后，`</body>`标签前。
```html
<!-- 引入3D灯笼脚本 -->
<script src="/js/lantern.js"></script>
```
打开博客页面，就能看到4个显示“新年快乐”的3D动态灯笼了。

### 自定义灯笼文字
通过URL参数`text`自定义灯笼文字（最多4个字符，不足自动补默认，超过截取前4个）：
```html
<!-- 自定义文字为“恭喜发财” -->
<script src="/js/lantern.js?text=恭喜发财"></script>
```

### 调整灯笼样式/动画
修改`LANTERN_CONSTANTS`常量即可自定义：
- `COLORS`：修改灯笼的红色、金色、灯光颜色
- `SIZES`：调整灯笼宽度、高度、盖子尺寸、光源大小等
- `ANIMATION_DURATIONS`：修改摆动、自转、闪烁、流苏动画的时长
- `RIB_COUNT`：调整灯笼瓣片数量（建议设为能被360整除的数，比如8、10、12）

### 注意事项
- 脚本`z-index`设为99999，确保灯笼显示在最上层，若被遮挡可调整该值
- 灯笼使用`pointer-events: none`，不会影响页面按钮、链接的点击
- 兼容所有现代浏览器（Chrome/Firefox/Safari/Edge），IE浏览器不支持CSS3 3D变换，效果会降级
- 若博客使用了异步加载/动态渲染（比如Vue/React），可手动调用`initLantern()`初始化：
  ```javascript
  // 手动初始化（适用于框架项目）
  initLantern();
  ```

## 代码主要解析
### 常量管理（LANTERN_CONSTANTS）
所有可变参数都集中在这个常量对象中，好处是：
- 无需在代码中到处找样式值，修改更高效
- 便于维护，比如想把灯笼改成金色主题，只需修改`COLORS`里的红色值
- 新手友好，无需理解复杂CSS，改常量就能定制效果

### 核心DOM创建逻辑
- `createDengContainer()`：主入口，创建容器并循环创建每个灯笼
- `getCustomTextFromUrl()`：解析脚本URL的`text`参数，实现文字自定义，带异常捕获
- `createLanternBody()`：创建灯笼主体，循环生成瓣片并设置旋转角度，实现3D立体效果
- `createLanternTassel()`：拆分流苏为珠子、中国结、穗子，通过CSS渐变和遮罩实现质感

### CSS3 3D核心
- `perspective: 800px`：设置3D透视距离，值越小透视效果越强
- `transform-style: preserve-3d`：开启子元素的3D空间，是实现3D效果的关键
- `transform-origin: 50% 0`：将灯笼摆动的中心点设为顶部，符合真实灯笼的摆动逻辑
- `translateZ(62px)`：将文字放在3D空间的外层，避免被瓣片遮挡

### 动画优化
- `will-change`：告诉浏览器该元素将要做动画，提前分配资源，提升流畅度
- 动画分层：摆动、自转、闪烁、流苏动画分别绑定到不同元素，避免动画冲突
- `backface-visibility: hidden`：隐藏元素背面，减少渲染计算，提升性能

### 响应式与兼容性
- 媒体查询`@media (max-width: 768px)`：移动端缩小灯笼尺寸、调整位置
- 字体适配：设置多个中文字体（华文行楷、楷体、STKaiti），适配不同操作系统
- 暗黑模式适配：`prefers-color-scheme: dark`，自动调整灯光亮度

## 总结
这款3D动态灯笼特效轻量化、易集成、可定制，希望能给你的博客增添一份新年的温馨与喜庆。无论是个人博客、企业官网还是小程序网页，都能轻松接入，让访问者感受到满满的年味。

最后，祝所有站长和开发者新年快乐，代码无bug，流量节节高！🎇🎆

如果在使用过程中有任何问题，欢迎在评论区交流，也可以根据自己的创意扩展更多效果（比如添加飘落的雪花、自定义灯笼数量、调整摆动幅度等），让你的网站成为新年里最靓的仔～

> ⚠️ 申明：本文内容由作者结合实际实操经验撰写，部分技术细节（如代码解析，代码细节）借助 AIGC 工具辅助整理，所有内容均经过作者亲自验证，确保准确可用。
