/**
 * js/app.js - 主入口、初始化、事件绑定
 */

/**
 * 等待字体加载完成
 */
async function waitForFonts() {
  try {
    await document.fonts.ready;
    // 确保关键字体和常见中文姓名字形已加载
    const sampleText = '请输入姓名王佳伊张李陈刘杨黄赵吴周徐孙马朱胡郭何高林罗郑梁谢宋唐许邓韩冯曹彭曾萧田董潘袁于蒋蔡余杜叶程魏苏吕丁任沈姚卢姜崔钟谭陆汪范金石廖贾夏韦傅方白邹孟熊秦邱江尹薛闫段雷侯龙史陶黎贺顾毛郝龚邵万钱严覃武戴莫孔向汤';
    const fonts = ['Ma Shan Zheng', 'ZCOOL KuaiLe', 'Noto Sans SC'];
    for (const font of fonts) {
      try {
        await document.fonts.load(`bold 200px "${font}"`, sampleText);
      } catch (e) {
        console.warn(`Font ${font} load warning:`, e);
      }
    }
    await document.fonts.ready;
  } catch (e) {
    console.warn('Font loading warning:', e);
  }
}

/**
 * 初始化应用
 */
async function initApp() {
  // 等待字体加载
  await waitForFonts();

  // 初始化 Canvas
  CanvasModule.init();

  // 初始化 UI 模块
  AgeSelector.init();
  ThemeSelector.init();
  DensitySelector.init();
  ContentInput.init();
  SlidersUI.init();

  // 初始化涟漪效果
  AnimationsUI.initRippleEffects();

  // 初始化预览提示状态
  AnimationsUI.updatePreviewHint();

  // 绑定生成按钮
  const generateBtn = document.getElementById('generate-btn');
  generateBtn.addEventListener('click', () => {
    const state = StateModule.getState();

    // 检查是否有姓名
    if (!state.name) {
      AnimationsUI.showInputError(
        document.getElementById('name-input'),
        '请先输入姓名'
      );
      return;
    }

    // 重绘
    Renderer.redrawAll();

    // 成功反馈动效
    generateBtn.classList.add('success');
    setTimeout(() => generateBtn.classList.remove('success'), 300);

    // 粒子散开效果
    AnimationsUI.createParticles(generateBtn, 12);

    // 成功提示更新
    AnimationsUI.updatePreviewHint();
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

    // 更新预览提示
    AnimationsUI.updatePreviewHint();

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