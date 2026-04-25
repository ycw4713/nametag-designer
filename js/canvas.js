/**
 * js/canvas.js - Canvas 基础模块
 */

// A4 纸尺寸 (mm 转 px，按 96 DPI) - 横向
const A4_WIDTH_MM = 297;
const A4_HEIGHT_MM = 210;
const MM_TO_PX = 96 / 25.4;
const A4_WIDTH_PX = Math.round(A4_WIDTH_MM * MM_TO_PX);
const A4_HEIGHT_PX = Math.round(A4_HEIGHT_MM * MM_TO_PX);

// 布局配置
const LAYOUTS = {
  1: { count: 1, width: A4_WIDTH_PX, height: A4_HEIGHT_PX, scale: 1 },
  2: { count: 2, width: Math.round(A4_WIDTH_PX / 2) - 20, height: A4_HEIGHT_PX, gapX: 20, scale: 0.5 },
  4: { count: 4, width: Math.round(A4_WIDTH_PX / 2) - 15, height: Math.round(A4_HEIGHT_PX / 2) - 20, gapX: 30, gapY: 20, scale: 0.45 }
};

// 字体配置
const FONT_FAMILY = {
  cute: 'Ma Shan Zheng',
  fun: 'ZCOOL KuaiLe',
  base: 'Noto Sans SC'
};

// Canvas 对象
let canvas = null;
let ctx = null;
let currentLayout = 1;

/**
 * 初始化 Canvas
 */
function initCanvas() {
  canvas = document.getElementById('nametag-canvas');
  ctx = canvas.getContext('2d');
  setCanvasSize(1);
}

/**
 * 设置 Canvas 尺寸
 */
function setCanvasSize(layout) {
  currentLayout = layout;
  const config = LAYOUTS[layout];

  if (layout === 1) {
    canvas.width = config.width;
    canvas.height = config.height;
  } else if (layout === 2) {
    canvas.width = A4_WIDTH_PX;
    canvas.height = config.height;
  } else if (layout === 4) {
    canvas.width = A4_WIDTH_PX;
    canvas.height = A4_HEIGHT_PX;
  }

  // 缩放预览
  const previewArea = document.querySelector('.preview-area');
  const maxDisplayWidth = previewArea ? previewArea.clientWidth - 40 : 900;
  const maxDisplayHeight = previewArea ? previewArea.clientHeight - 60 : 600;

  const scaleWidth = maxDisplayWidth / canvas.width;
  const scaleHeight = maxDisplayHeight / canvas.height;
  const scale = Math.min(scaleWidth, scaleHeight, 1);

  canvas.style.width = Math.round(canvas.width * scale) + 'px';
  canvas.style.height = Math.round(canvas.height * scale) + 'px';
}

/**
 * 清空画布
 */
function clearCanvas() {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * 获取姓名牌绘制区域
 */
function getNameTagBounds(index) {
  const config = LAYOUTS[currentLayout];

  if (currentLayout === 1) {
    return { x: 0, y: 0, width: canvas.width, height: canvas.height };
  } else if (currentLayout === 2) {
    const x = index * (config.width + config.gapX);
    return { x, y: 0, width: config.width, height: config.height };
  } else if (currentLayout === 4) {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = col * (config.width + config.gapX);
    const y = row * (config.height + config.gapY);
    return { x, y, width: config.width, height: config.height };
  }
}

/**
 * 获取 Canvas 上下文
 */
function getContext() {
  return ctx;
}

/**
 * 获取布局缩放比例
 */
function getLayoutScale() {
  return LAYOUTS[currentLayout].scale;
}

/**
 * 获取图像数据 URL
 */
function getDataURL(format = 'png') {
  return canvas.toDataURL(`image/${format}`, 1.0);
}

/**
 * 获取 Canvas 尺寸
 */
function getCanvasSize() {
  return { width: canvas.width, height: canvas.height };
}

/**
 * 获取 A4 尺寸 (mm)
 */
function getA4Size() {
  return { width: A4_WIDTH_MM, height: A4_HEIGHT_MM };
}

/**
 * 获取当前布局
 */
function getCurrentLayout() {
  return currentLayout;
}

// 导出
window.CanvasModule = {
  init: initCanvas,
  setSize: setCanvasSize,
  clear: clearCanvas,
  getBounds: getNameTagBounds,
  getContext,
  getScale: getLayoutScale,
  getDataURL,
  getSize: getCanvasSize,
  getA4: getA4Size,
  getLayout: getCurrentLayout,
  fontFamily: FONT_FAMILY,
  layouts: LAYOUTS
};