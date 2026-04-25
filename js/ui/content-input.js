/**
 * js/ui/content-input.js - 内容输入交互
 */

/**
 * 初始化内容输入
 */
function initContentInput() {
  const nameInput = document.getElementById('name-input');
  const classInput = document.getElementById('class-input');
  const mottoInput = document.getElementById('motto-input');
  const photoCheckbox = document.getElementById('show-photo');

  // 姓名输入
  nameInput.addEventListener('input', async () => {
    const name = nameInput.value;
    await preloadNameFont(name);
    if (nameInput.value === name) {
      StateModule.setState({ name });
    }
  });

  // 班级输入
  classInput.addEventListener('input', () => {
    StateModule.setState({ className: classInput.value });
  });

  // 寄语输入（高中可用）
  mottoInput.addEventListener('input', () => {
    StateModule.setState({ motto: mottoInput.value });
  });

  // 照片预留区开关
  photoCheckbox.addEventListener('change', () => {
    StateModule.setState({ showPhoto: photoCheckbox.checked });
  });
}

/**
 * 预加载当前姓名的字体字形，避免首帧逐字回退到不同字体
 */
async function preloadNameFont(name) {
  if (!name || !document.fonts) return;

  try {
    const { fontSize } = StateModule.getState();
    await document.fonts.load(`bold ${fontSize}px "Ma Shan Zheng"`, name);
    await document.fonts.ready;
  } catch (e) {
    console.warn('Name font loading warning:', e);
  }
}

/**
 * 更新输入框值（响应状态变化）
 */
function updateContentInputs(state) {
  document.getElementById('name-input').value = state.name;
  document.getElementById('class-input').value = state.className;
  document.getElementById('motto-input').value = state.motto || '';
  document.getElementById('show-photo').checked = state.showPhoto;

  // 根据年龄段调整寄语输入框显示
  const mottoGroup = document.getElementById('motto-input').closest('.input-group');
  if (mottoGroup) {
    mottoGroup.style.display = state.ageGroup === 'high' ? 'block' : 'none';
  }
}

// 导出
window.ContentInput = {
  init: initContentInput,
  preloadNameFont,
  update: updateContentInputs
};
