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
  const classSizeSlider = document.getElementById('class-size-input');
  const classSizeValue = document.getElementById('class-size-value');
  const classPositionSlider = document.getElementById('class-position-input');
  const classPositionValue = document.getElementById('class-position-value');

  // 初始化滑块轨道填充
  updateSliderTrack(fontSizeSlider);
  updateSliderTrack(positionSlider);
  updateSliderTrack(classSizeSlider);
  updateSliderTrack(classPositionSlider);

  // 字体大小滑块
  fontSizeSlider.addEventListener('input', () => {
    const size = parseInt(fontSizeSlider.value);
    fontSizeValue.textContent = size;
    updateSliderTrack(fontSizeSlider);
    StateModule.setState({ fontSize: size });
  });

  // 姓名位置滑块
  positionSlider.addEventListener('input', () => {
    const pos = parseInt(positionSlider.value);
    positionValue.textContent = pos;
    updateSliderTrack(positionSlider);
    StateModule.setState({ namePosition: pos });
  });

  // 班级大小滑块
  classSizeSlider.addEventListener('input', () => {
    const size = parseInt(classSizeSlider.value);
    classSizeValue.textContent = size;
    updateSliderTrack(classSizeSlider);
    StateModule.setState({ classSize: size });
  });

  // 班级位置滑块
  classPositionSlider.addEventListener('input', () => {
    const pos = parseInt(classPositionSlider.value);
    classPositionValue.textContent = pos;
    updateSliderTrack(classPositionSlider);
    StateModule.setState({ classPosition: pos });
  });
}

/**
 * 更新滑块轨道填充百分比
 */
function updateSliderTrack(slider) {
  const min = parseInt(slider.min);
  const max = parseInt(slider.max);
  const value = parseInt(slider.value);
  const percentage = ((value - min) / (max - min)) * 100;

  slider.style.setProperty('--track-fill', `${percentage}%`);
}

/**
 * 更新滑块值（响应状态变化）
 */
function updateSliders(state) {
  const fontSizeSlider = document.getElementById('font-size-input');
  const positionSlider = document.getElementById('name-position-input');
  const classSizeSlider = document.getElementById('class-size-input');
  const classPositionSlider = document.getElementById('class-position-input');

  fontSizeSlider.value = state.fontSize;
  document.getElementById('font-size-value').textContent = state.fontSize;
  updateSliderTrack(fontSizeSlider);

  positionSlider.value = state.namePosition;
  document.getElementById('name-position-value').textContent = state.namePosition;
  updateSliderTrack(positionSlider);

  classSizeSlider.value = state.classSize;
  document.getElementById('class-size-value').textContent = state.classSize;
  updateSliderTrack(classSizeSlider);

  classPositionSlider.value = state.classPosition;
  document.getElementById('class-position-value').textContent = state.classPosition;
  updateSliderTrack(classPositionSlider);
}

// 导出
window.SlidersUI = {
  init: initSliders,
  update: updateSliders,
  updateSliderTrack: updateSliderTrack
};