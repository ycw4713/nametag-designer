/**
 * js/themes/minimal.js - 极简线条主题装饰数据
 */

const MINIMAL_DECORATIONS = {
  rich: [
    { type: 'line', x: 0.08, y: 0.12 },
    { type: 'line', x: 0.92, y: 0.12 },
    { type: 'line', x: 0.08, y: 0.88 },
    { type: 'line', x: 0.92, y: 0.88 },
    { type: 'line', x: 0.06, y: 0.35 },
    { type: 'line', x: 0.94, y: 0.35 }
  ],
  standard: [
    { type: 'line', x: 0.08, y: 0.15 },
    { type: 'line', x: 0.92, y: 0.15 },
    { type: 'line', x: 0.08, y: 0.85 },
    { type: 'line', x: 0.92, y: 0.85 }
  ],
  simple: [
    { type: 'line', x: 0.10, y: 0.15 },
    { type: 'line', x: 0.90, y: 0.15 }
  ],
  minimal: [
    { type: 'line', x: 0.95, y: 0.05 }
  ]
};

const MINIMAL_COLORS = {
  background: ['#ffffff', '#fafafa', '#f5f5f5'],
  border: '#e0e0e0',
  decorations: ['#333333', '#9e9e9e']
};

function getMinimalDecorations(density) {
  return MINIMAL_DECORATIONS[density] || MINIMAL_DECORATIONS.standard;
}

function getMinimalColors() {
  return MINIMAL_COLORS;
}

window.MinimalTheme = {
  decorations: MINIMAL_DECORATIONS,
  colors: MINIMAL_COLORS,
  getDecorations: getMinimalDecorations,
  getColors: getMinimalColors
};