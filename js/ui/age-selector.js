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

  // 绑定事件
  container.querySelectorAll('.age-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ageId = btn.dataset.age;
      StateModule.setAgeGroup(ageId);
      updateAgeSelection(ageId);
    });
  });
}

/**
 * 更新选中状态
 */
function updateAgeSelection(ageId) {
  document.querySelectorAll('.age-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.age === ageId);
  });
}

// 导出
window.AgeSelector = {
  init: initAgeSelector,
  update: updateAgeSelection,
  groups: AGE_GROUPS
};