/**
 * js/ui/theme-selector.js - 主题选择器交互
 */

// 主题配置
const THEMES = [
  { id: 'animals', label: '卡通动物', icon: '🧸', available: true },
  { id: 'nature', label: '自然植物', icon: '🌿', available: true },
  { id: 'space', label: '星空宇宙', icon: '🌟', available: true },
  { id: 'ocean', label: '海洋世界', icon: '🐠', available: true },
  { id: 'music', label: '音乐艺术', icon: '🎵', available: true },
  { id: 'geometric', label: '几何科技', icon: '⬡', available: true },
  { id: 'ink', label: '文艺水墨', icon: '🖌️', available: true },
  { id: 'minimal', label: '极简线条', icon: '〰', available: true }
];

/**
 * 初始化主题选择器
 */
function initThemeSelector() {
  const container = document.querySelector('.theme-selector');

  THEMES.forEach(theme => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn';
    if (!theme.available) btn.classList.add('disabled');
    btn.dataset.theme = theme.id;
    btn.innerHTML = `
      <span class="theme-btn-icon">${theme.icon}</span>
      <span class="theme-btn-text">${theme.label}</span>
    `;
    container.appendChild(btn);
  });

  // 设置初始选中状态
  const state = StateModule.getState();
  updateThemeSelection(state.theme);

  // 绑定事件（只绑定可用的主题）
  container.querySelectorAll('.theme-btn:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      const themeId = btn.dataset.theme;
      StateModule.setTheme(themeId);
      updateThemeSelection(themeId);
    });
  });
}

/**
 * 更新选中状态
 */
function updateThemeSelection(themeId) {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeId);
  });
}

// 导出
window.ThemeSelector = {
  init: initThemeSelector,
  update: updateThemeSelection,
  themes: THEMES
};