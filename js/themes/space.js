/**
 * js/themes/space.js - 星空宇宙主题装饰数据
 */

const SPACE_DECORATIONS = {
  rich: [
    { type: 'star', x: 0.08, y: 0.12 },
    { type: 'moon', x: 0.92, y: 0.12 },
    { type: 'star', x: 0.08, y: 0.88 },
    { type: 'star', x: 0.92, y: 0.88 },
    { type: 'rocket', x: 0.06, y: 0.35 },
    { type: 'star', x: 0.94, y: 0.35 },
    { type: 'moon', x: 0.06, y: 0.65 },
    { type: 'star', x: 0.94, y: 0.65 },
    { type: 'star', x: 0.20, y: 0.08 },
    { type: 'rocket', x: 0.80, y: 0.08 }
  ],
  standard: [
    { type: 'star', x: 0.08, y: 0.15 },
    { type: 'moon', x: 0.92, y: 0.15 },
    { type: 'star', x: 0.08, y: 0.85 },
    { type: 'star', x: 0.92, y: 0.85 },
    { type: 'rocket', x: 0.50, y: 0.08 },
    { type: 'moon', x: 0.50, y: 0.92 }
  ],
  simple: [
    { type: 'star', x: 0.10, y: 0.15 },
    { type: 'moon', x: 0.90, y: 0.15 }
  ],
  minimal: [
    { type: 'star', x: 0.95, y: 0.05 }
  ]
};

const SPACE_COLORS = {
  background: ['#e8eaf6', '#c5cae9', '#f5f5f5'],
  border: '#7986cb',
  decorations: ['#ffd54f', '#ff9800', '#4fc3f7', '#ce93d8']
};

function getSpaceDecorations(density) {
  return SPACE_DECORATIONS[density] || SPACE_DECORATIONS.standard;
}

function getSpaceColors() {
  return SPACE_COLORS;
}

window.SpaceTheme = {
  decorations: SPACE_DECORATIONS,
  colors: SPACE_COLORS,
  getDecorations: getSpaceDecorations,
  getColors: getSpaceColors
};