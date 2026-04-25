/**
 * js/themes/animals.js - 卡通动物主题装饰数据
 */

// 不同密度的装饰配置
const ANIMALS_DECORATIONS = {
  rich: [
    { type: 'bear', x: 0.08, y: 0.12 },
    { type: 'rabbit', x: 0.92, y: 0.12 },
    { type: 'star', x: 0.08, y: 0.88 },
    { type: 'heart', x: 0.92, y: 0.88 },
    { type: 'cat', x: 0.06, y: 0.35 },
    { type: 'cloud', x: 0.94, y: 0.35 },
    { type: 'sun', x: 0.06, y: 0.65 },
    { type: 'heart', x: 0.94, y: 0.65 },
    { type: 'bear', x: 0.20, y: 0.08 },
    { type: 'rabbit', x: 0.80, y: 0.08 }
  ],
  standard: [
    { type: 'bear', x: 0.08, y: 0.15 },
    { type: 'rabbit', x: 0.92, y: 0.15 },
    { type: 'star', x: 0.08, y: 0.85 },
    { type: 'heart', x: 0.92, y: 0.85 },
    { type: 'sun', x: 0.50, y: 0.08 },
    { type: 'cat', x: 0.50, y: 0.92 }
  ],
  simple: [
    { type: 'bear', x: 0.10, y: 0.15 },
    { type: 'heart', x: 0.90, y: 0.15 }
  ],
  minimal: [
    { type: 'star', x: 0.95, y: 0.05 }
  ]
};

// 主题配色
const ANIMALS_COLORS = {
  background: ['#fff3e0', '#ffe0b2', '#fff8f0'],
  border: '#ffcc80',
  decorations: ['#ff9800', '#ff6b6b', '#4fc3f7', '#8b7355', '#d7ccc8']
};

/**
 * 获取动物主题装饰配置
 */
function getAnimalsDecorations(density) {
  return ANIMALS_DECORATIONS[density] || ANIMALS_DECORATIONS.standard;
}

/**
 * 获取动物主题配色
 */
function getAnimalsColors() {
  return ANIMALS_COLORS;
}

// 导出
window.AnimalsTheme = {
  decorations: ANIMALS_DECORATIONS,
  colors: ANIMALS_COLORS,
  getDecorations: getAnimalsDecorations,
  getColors: getAnimalsColors
};