/**
 * js/ui/age-selector.js - 年龄段选择器交互
 */

// 年龄段配置
const AGE_GROUPS = [
  { id: 'kindergarten', label: '幼儿园', icon: '🧒' },
  { id: 'primary', label: '小学', icon: '📚' },
  { id: 'middle', label: '中学', icon: '🎒' },
  { id: 'high', label: '高中', icon: '🎓' }
];

/**
 * 初始化年龄段选择器
 */
function initAgeSelector() {
  const container = document.querySelector('.age-selector');

  AGE_GROUPS.forEach(age => {
    const btn = document.createElement('button');
    btn.className = 'age-btn';
    btn.dataset.age = age.id;
    btn.innerHTML = `
      <span class="age-btn-icon">${age.icon}</span>
      <span class="age-btn-text">${age.label}</span>
    `;
    container.appendChild(btn);
  });

  // 设置初始选中状态
  const state = StateModule.getState();
  updateAgeSelection(state.ageGroup);
  updateAnimationScale(state.ageGroup);

  // 绑定事件
  container.querySelectorAll('.age-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ageId = btn.dataset.age;

      // 触发过场动画
      triggerAgeTransition(ageId);

      StateModule.setAgeGroup(ageId);
      updateAgeSelection(ageId);
      updateAnimationScale(ageId);
    });
  });
}

/**
 * 触发年龄段切换过场动画
 */
function triggerAgeTransition(ageId) {
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  const panelCards = document.querySelectorAll('.panel-card');

  // Canvas 过场淡出
  canvasWrapper.classList.add('canvas-transitioning');

  // 面板滑入效果
  panelCards.forEach((card, index) => {
    card.classList.add('refreshing');
    card.style.animationDelay = `${index * 50}ms`;
  });

  // 动画结束后移除类
  setTimeout(() => {
    canvasWrapper.classList.remove('canvas-transitioning');
    panelCards.forEach(card => {
      card.classList.remove('refreshing');
      card.style.animationDelay = '';
    });
  }, 400);
}

/**
 * 更新动效缩放比例（高中模式克制）
 */
function updateAnimationScale(ageId) {
  const body = document.body;

  // 移除所有年龄段类
  AGE_GROUPS.forEach(age => {
    body.classList.remove(`age-group-${age.id}`);
  });

  // 添加当前年龄段类
  body.classList.add(`age-group-${ageId}`);
}

/**
 * 更新选中状态
 */
function updateAgeSelection(ageId) {
  document.querySelectorAll('.age-btn').forEach(btn => {
    const isActive = btn.dataset.age === ageId;
    btn.classList.toggle('active', isActive);

    // 触发按钮弹跳动效
    if (isActive) {
      btn.style.animation = 'none';
      void btn.offsetHeight; // 触发重绘
      btn.style.animation = '';
    }
  });
}

// 导出
window.AgeSelector = {
  init: initAgeSelector,
  update: updateAgeSelection,
  groups: AGE_GROUPS
};