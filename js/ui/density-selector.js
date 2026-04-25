/**
 * js/ui/density-selector.js - 装饰密度选择器交互
 */

// 装饰密度配置
const DENSITY_OPTIONS = [
  { id: 'rich', label: '繁复', icon: '✨' },
  { id: 'standard', label: '标准', icon: '⭐' },
  { id: 'simple', label: '简约', icon: '◇' },
  { id: 'minimal', label: '极简', icon: '·' }
];

/**
 * 初始化装饰密度选择器
 */
function initDensitySelector() {
  const container = document.querySelector('.density-selector');

  DENSITY_OPTIONS.forEach(density => {
    const btn = document.createElement('button');
    btn.className = 'density-btn';
    btn.dataset.density = density.id;
    btn.innerHTML = `
      <span class="density-btn-icon">${density.icon}</span>
      <span class="density-btn-text">${density.label}</span>
    `;
    container.appendChild(btn);
  });

  // 设置初始选中状态
  const state = StateModule.getState();
  updateDensitySelection(state.density);

  // 绑定事件
  container.querySelectorAll('.density-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const densityId = btn.dataset.density;
      StateModule.setDensity(densityId);
      updateDensitySelection(densityId);
    });
  });
}

/**
 * 更新选中状态
 */
function updateDensitySelection(densityId) {
  document.querySelectorAll('.density-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.density === densityId);
  });
}

// 导出
window.DensitySelector = {
  init: initDensitySelector,
  update: updateDensitySelection,
  options: DENSITY_OPTIONS
};