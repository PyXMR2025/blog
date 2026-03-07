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