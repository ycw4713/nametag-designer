/**
 * js/themes/nature.js - 自然植物主题装饰数据
 */

const NATURE_DECORATIONS = {
  rich: [
    { type: 'leaf', x: 0.08, y: 0.12 },
    { type: 'flower', x: 0.92, y: 0.12 },
    { type: 'leaf', x: 0.08, y: 0.88 },
    { type: 'flower', x: 0.92, y: 0.88 },
    { type: 'leaf', x: 0.06, y: 0.35 },
    { type: 'flower', x: 0.94, y: 0.35 },
    { type: 'leaf', x: 0.06, y: 0.65 },
    { type: 'flower', x: 0.94, y: 0.65 },
    { type: 'leaf', x: 0.20, y: 0.08 },
    { type: 'flower', x: 0.80, y: 0.08 }
  ],
  standard: [
    { type: 'leaf', x: 0.08, y: 0.15 },
    { type: 'flower', x: 0.92, y: 0.15 },
    { type: 'leaf', x: 0.08, y: 0.85 },
    { type: 'flower', x: 0.92, y: 0.85 },
    { type: 'flower', x: 0.50, y: 0.08 },
    { type: 'leaf', x: 0.50, y: 0.92 }
  ],
  simple: [
    { type: 'leaf', x: 0.10, y: 0.15 },
    { type: 'flower', x: 0.90, y: 0.15 }
  ],
  minimal: [
    { type: 'leaf', x: 0.95, y: 0.05 }
  ]
};

const NATURE_COLORS = {
  background: ['#f1f8e9', '#dcedc8', '#f5f5f5'],
  border: '#a5d6a7',
  decorations: ['#81c784', '#ff6b6b', '#ffb74d', '#4fc3f7']
};

function getNatureDecorations(density) {
  return NATURE_DECORATIONS[density] || NATURE_DECORATIONS.standard;
}

function getNatureColors() {
  return NATURE_COLORS;
}

window.NatureTheme = {
  decorations: NATURE_DECORATIONS,
  colors: NATURE_COLORS,
  getDecorations: getNatureDecorations,
  getColors: getNatureColors
};