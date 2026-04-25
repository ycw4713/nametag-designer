/**
 * js/app.js - 主入口、初始化、事件绑定
 */

/**
 * 初始化应用
 */
function initApp() {
  // 初始化 Canvas
  CanvasModule.init();

  // 初始化 UI 模块
  AgeSelector.init();
  ThemeSelector.init();
  DensitySelector.init();
  ContentInput.init();
  SlidersUI.init();

  // 绑定生成按钮
  const generateBtn = document.getElementById('generate-btn');
  generateBtn.addEventListener('click', () => {
    Renderer.redrawAll();

    // 成功反馈
    generateBtn.classList.add('success');
    setTimeout(() => generateBtn.classList.remove('success'), 300);
  });

  // 绑定导出按钮
  document.getElementById('export-png').addEventListener('click', () => {
    ExportModule.png();
  });

  document.getElementById('export-pdf').addEventListener('click', () => {
    ExportModule.pdf();
  });

  // 注册状态变更回调
  StateModule.onStateChange((newState, oldState) => {
    Renderer.redrawAll();

    // 同步 UI 状态
    if (newState.ageGroup !== oldState.ageGroup) {
      AgeSelector.update(newState.ageGroup);
      ThemeSelector.update(newState.theme);
      DensitySelector.update(newState.density);
    }
    if (newState.theme !== oldState.theme && newState.ageGroup === oldState.ageGroup) {
      ThemeSelector.update(newState.theme);
    }
    if (newState.density !== oldState.density && newState.ageGroup === oldState.ageGroup) {
      DensitySelector.update(newState.density);
    }
  });

  // 初始绘制
  Renderer.redrawAll();
}

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', initApp);

// 导出
window.App = { init: initApp };