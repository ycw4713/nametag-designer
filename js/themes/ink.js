/**
 * js/themes/ink.js - 文艺水墨主题装饰数据
 */

const INK_DECORATIONS = {
  rich: [
    { type: 'inkBlob', x: 0.08, y: 0.12 },
    { type: 'inkBlob', x: 0.92, y: 0.12 },
    { type: 'inkBlob', x: 0.08, y: 0.88 },
    { type: 'inkBlob', x: 0.92, y: 0.88 },
    { type: 'inkBlob', x: 0.06, y: 0.35 },
    { type: 'inkBlob', x: 0.94, y: 0.35 },
    { type: 'inkBlob', x: 0.06, y: 0.65 },
    { type: 'inkBlob', x: 0.94, y: 0.65 },
    { type: 'inkBlob', x: 0.20, y: 0.08 },
    { type: 'inkBlob', x: 0.80, y: 0.08 }
  ],
  standard: [
    { type: 'inkBlob', x: 0.08, y: 0.15 },
    { type: 'inkBlob', x: 0.92, y: 0.15 },
    { type: 'inkBlob', x: 0.08, y: 0.85 },
    { type: 'inkBlob', x: 0.92, y: 0.85 },
    { type: 'inkBlob', x: 0.50, y: 0.08 },
    { type: 'inkBlob', x: 0.50, y: 0.92 }
  ],
  simple: [
    { type: 'inkBlob', x: 0.10, y: 0.15 },
    { type: 'inkBlob', x: 0.90, y: 0.15 }
  ],
  minimal: [
    { type: 'inkBlob', x: 0.95, y: 0.05 }
  ]
};

const INK_COLORS = {
  background: ['#fafafa', '#f5f5f5', '#ffffff'],
  border: '#bdbdbd',
  decorations: ['#333333', '#424242', '#616161', '#757575']
};

function getInkDecorations(density) {
  return INK_DECORATIONS[density] || INK_DECORATIONS.standard;
}

function getInkColors() {
  return INK_COLORS;
}

window.InkTheme = {
  decorations: INK_DECORATIONS,
  colors: INK_COLORS,
  getDecorations: getInkDecorations,
  getColors: getInkColors
};