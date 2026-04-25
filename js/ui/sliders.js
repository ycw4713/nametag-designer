/**
 * js/ui/sliders.js - 滑块控制交互
 */

/**
 * 初始化滑块控制
 */
function initSliders() {
  const fontSizeSlider = document.getElementById('font-size-input');
  const fontSizeValue = document.getElementById('font-size-value');
  const positionSlider = document.getElementById('name-position-input');
  const positionValue = document.getElementById('name-position-value');

  // 字体大小滑块
  fontSizeSlider.addEventListener('input', () => {
    const size = parseInt(fontSizeSlider.value);
    fontSizeValue.textContent = size;
    StateModule.setState({ fontSize: size });
  });

  // 姓名位置滑块
  positionSlider.addEventListener('input', () => {
    const pos = parseInt(positionSlider.value);
    positionValue.textContent = pos;
    StateModule.setState({ namePosition: pos });
  });
}

/**
 * 更新滑块值（响应状态变化）
 */
function updateSliders(state) {
  document.getElementById('font-size-input').value = state.fontSize;
  document.getElementById('font-size-value').textContent = state.fontSize;
  document.getElementById('name-position-input').value = state.namePosition;
  document.getElementById('name-position-value').textContent = state.namePosition;
}

// 导出
window.SlidersUI = {
  init: initSliders,
  update: updateSliders
};