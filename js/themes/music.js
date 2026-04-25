/**
 * js/themes/music.js - 音乐艺术主题装饰数据
 */

const MUSIC_DECORATIONS = {
  rich: [
    { type: 'note', x: 0.08, y: 0.12 },
    { type: 'brush', x: 0.92, y: 0.12 },
    { type: 'note', x: 0.08, y: 0.88 },
    { type: 'brush', x: 0.92, y: 0.88 },
    { type: 'note', x: 0.06, y: 0.35 },
    { type: 'brush', x: 0.94, y: 0.35 },
    { type: 'note', x: 0.06, y: 0.65 },
    { type: 'brush', x: 0.94, y: 0.65 },
    { type: 'note', x: 0.20, y: 0.08 },
    { type: 'brush', x: 0.80, y: 0.08 }
  ],
  standard: [
    { type: 'note', x: 0.08, y: 0.15 },
    { type: 'brush', x: 0.92, y: 0.15 },
    { type: 'note', x: 0.08, y: 0.85 },
    { type: 'brush', x: 0.92, y: 0.85 },
    { type: 'note', x: 0.50, y: 0.08 },
    { type: 'brush', x: 0.50, y: 0.92 }
  ],
  simple: [
    { type: 'note', x: 0.10, y: 0.15 },
    { type: 'brush', x: 0.90, y: 0.15 }
  ],
  minimal: [
    { type: 'note', x: 0.95, y: 0.05 }
  ]
};

const MUSIC_COLORS = {
  background: ['#fce4ec', '#f8bbd9', '#f5f5f5'],
  border: '#f06292',
  decorations: ['#333333', '#e91e63', '#9c27b0', '#ff9800']
};

function getMusicDecorations(density) {
  return MUSIC_DECORATIONS[density] || MUSIC_DECORATIONS.standard;
}

function getMusicColors() {
  return MUSIC_COLORS;
}

window.MusicTheme = {
  decorations: MUSIC_DECORATIONS,
  colors: MUSIC_COLORS,
  getDecorations: getMusicDecorations,
  getColors: getMusicColors
};