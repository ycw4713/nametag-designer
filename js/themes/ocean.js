/**
 * js/themes/ocean.js - 海洋世界主题装饰数据
 */

const OCEAN_DECORATIONS = {
  rich: [
    { type: 'wave', x: 0.08, y: 0.12 },
    { type: 'fish', x: 0.92, y: 0.12 },
    { type: 'shell', x: 0.08, y: 0.88 },
    { type: 'wave', x: 0.92, y: 0.88 },
    { type: 'fish', x: 0.06, y: 0.35 },
    { type: 'shell', x: 0.94, y: 0.35 },
    { type: 'wave', x: 0.06, y: 0.65 },
    { type: 'fish', x: 0.94, y: 0.65 },
    { type: 'shell', x: 0.20, y: 0.08 },
    { type: 'wave', x: 0.80, y: 0.08 }
  ],
  standard: [
    { type: 'wave', x: 0.08, y: 0.15 },
    { type: 'fish', x: 0.92, y: 0.15 },
    { type: 'shell', x: 0.08, y: 0.85 },
    { type: 'wave', x: 0.92, y: 0.85 },
    { type: 'fish', x: 0.50, y: 0.08 },
    { type: 'shell', x: 0.50, y: 0.92 }
  ],
  simple: [
    { type: 'wave', x: 0.10, y: 0.15 },
    { type: 'fish', x: 0.90, y: 0.15 }
  ],
  minimal: [
    { type: 'wave', x: 0.95, y: 0.05 }
  ]
};

const OCEAN_COLORS = {
  background: ['#e3f2fd', '#bbdefb', '#f5f5f5'],
  border: '#64b5f6',
  decorations: ['#4fc3f7', '#ff6b6b', '#ffb74d', '#81c784']
};

function getOceanDecorations(density) {
  return OCEAN_DECORATIONS[density] || OCEAN_DECORATIONS.standard;
}

function getOceanColors() {
  return OCEAN_COLORS;
}

window.OceanTheme = {
  decorations: OCEAN_DECORATIONS,
  colors: OCEAN_COLORS,
  getDecorations: getOceanDecorations,
  getColors: getOceanColors
};