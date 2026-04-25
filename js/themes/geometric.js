/**
 * js/themes/geometric.js - 几何科技主题装饰数据
 */

const GEOMETRIC_DECORATIONS = {
  rich: [
    { type: 'triangle', x: 0.08, y: 0.12 },
    { type: 'circle', x: 0.92, y: 0.12 },
    { type: 'triangle', x: 0.08, y: 0.88 },
    { type: 'circle', x: 0.92, y: 0.88 },
    { type: 'diamond', x: 0.06, y: 0.35 },
    { type: 'circle', x: 0.94, y: 0.35 },
    { type: 'triangle', x: 0.06, y: 0.65 },
    { type: 'diamond', x: 0.94, y: 0.65 },
    { type: 'circle', x: 0.20, y: 0.08 },
    { type: 'triangle', x: 0.80, y: 0.08 }
  ],
  standard: [
    { type: 'triangle', x: 0.08, y: 0.15 },
    { type: 'circle', x: 0.92, y: 0.15 },
    { type: 'diamond', x: 0.08, y: 0.85 },
    { type: 'triangle', x: 0.92, y: 0.85 },
    { type: 'circle', x: 0.50, y: 0.08 },
    { type: 'diamond', x: 0.50, y: 0.92 }
  ],
  simple: [
    { type: 'triangle', x: 0.10, y: 0.15 },
    { type: 'circle', x: 0.90, y: 0.15 }
  ],
  minimal: [
    { type: 'triangle', x: 0.95, y: 0.05 }
  ]
};

const GEOMETRIC_COLORS = {
  background: ['#e8eaf6', '#c5cae9', '#f5f5f5'],
  border: '#7986cb',
  decorations: ['#ff9800', '#4fc3f7', '#81c784', '#ff6b6b']
};

function getGeometricDecorations(density) {
  return GEOMETRIC_DECORATIONS[density] || GEOMETRIC_DECORATIONS.standard;
}

function getGeometricColors() {
  return GEOMETRIC_COLORS;
}

window.GeometricTheme = {
  decorations: GEOMETRIC_DECORATIONS,
  colors: GEOMETRIC_COLORS,
  getDecorations: getGeometricDecorations,
  getColors: getGeometricColors
};