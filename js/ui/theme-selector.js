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

      // 触发装饰飘入动效
      triggerThemeTransition(themeId);

      StateModule.setTheme(themeId);
      updateThemeSelection(themeId);
    });
  });
}

/**
 * 触发主题切换装饰飘入动效
 */
function triggerThemeTransition(themeId) {
  // 检查是否为高中模式（动效克制）
  const state = StateModule.getState();
  if (state.ageGroup === 'high') return;

  // 获取装饰数量
  const decorations = ThemeManager.getDecorations(themeId, state.density);

  // 创建装饰飘入动画层
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  let decorationsLayer = canvasWrapper.querySelector('.canvas-decorations');

  if (!decorationsLayer) {
    decorationsLayer = document.createElement('div');
    decorationsLayer.className = 'canvas-decorations';
    canvasWrapper.appendChild(decorationsLayer);
  }

  // 清空并添加新装饰元素
  decorationsLayer.innerHTML = '';

  decorations.forEach((dec, index) => {
    const item = document.createElement('div');
    item.className = 'canvas-decoration-item';

    // 计算飘入方向（从边缘到中心）
    const centerX = 0.5;
    const centerY = 0.5;
    const dx = dec.x - centerX;
    const dy = dec.y - centerY;
    const startX = dx > 0 ? 50 : -50;
    const startY = dy > 0 ? 50 : -50;

    item.style.cssText = `
      left: ${dec.x * 100}%;
      top: ${dec.y * 100}%;
      --start-x: ${startX}px;
      --start-y: ${startY}px;
      --delay: ${index * 60}ms;
      font-size: 20px;
      opacity: 0;
    `;

    // 获取主题图标
    const theme = THEMES.find(t => t.id === themeId);
    item.textContent = theme ? theme.icon : '✨';

    decorationsLayer.appendChild(item);
  });

  // 动画结束后清理
  setTimeout(() => {
    if (decorationsLayer) {
      decorationsLayer.style.opacity = '0';
      setTimeout(() => {
        if (decorationsLayer && decorationsLayer.parentNode) {
          decorationsLayer.remove();
        }
      }, 250);
    }
  }, 600);
}

/**
 * 更新选中状态
 */
function updateThemeSelection(themeId) {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    const isActive = btn.dataset.theme === themeId;
    btn.classList.toggle('active', isActive);

    // 触发按钮弹跳动效
    if (isActive) {
      btn.style.animation = 'none';
      void btn.offsetHeight;
      btn.style.animation = '';
    }
  });
}

// 导出
window.ThemeSelector = {
  init: initThemeSelector,
  update: updateThemeSelection,
  themes: THEMES
};