/**
 * js/export.js - 导出功能模块（带进度动画）
 */

/**
 * 导出为 PNG 图片
 */
async function exportPNG() {
  const state = StateModule.getState();

  // 检查是否有姓名
  if (!state.name) {
    AnimationsUI.showInputError(
      document.getElementById('name-input'),
      '请先输入姓名'
    );
    return;
  }

  // 显示进度
  const progress = AnimationsUI.showExportProgress('png');

  try {
    // 模拟导出进度（实际导出很快，主要为了视觉效果）
    progress.update(30);
    await sleep(150);

    progress.update(60);
    const dataURL = CanvasModule.getDataURL('png');

    progress.update(80);
    await sleep(100);

    // 执行下载
    const link = document.createElement('a');
    link.download = `姓名牌_${state.name}.png`;
    link.href = dataURL;
    link.click();

    progress.update(100);
    await sleep(100);

    // 完成反馈
    progress.complete();

    // 成功粒子效果
    const exportBtn = document.getElementById('export-png');
    AnimationsUI.createParticles(exportBtn, 8);

  } catch (error) {
    progress.close();
    console.error('Export PNG error:', error);
    alert('导出失败，请重试');
  }
}

/**
 * 导出为 PDF 文件（横向）
 */
async function exportPDF() {
  const state = StateModule.getState();

  // 检查是否有姓名
  if (!state.name) {
    AnimationsUI.showInputError(
      document.getElementById('name-input'),
      '请先输入姓名'
    );
    return;
  }

  // 显示进度
  const progress = AnimationsUI.showExportProgress('pdf');

  try {
    const { jsPDF } = window.jspdf;
    const a4Size = CanvasModule.getA4();
    const layout = CanvasModule.getLayout();

    progress.update(20);

    // 创建 A4 横向尺寸 PDF ('l' = landscape)
    const pdf = new jsPDF('l', 'mm', 'a4');

    progress.update(40);
    await sleep(100);

    // 根据布局处理导出
    if (layout === 1) {
      // 单个姓名牌，直接导出
      const dataURL = CanvasModule.getDataURL('png');
      pdf.addImage(dataURL, 'PNG', 0, 0, a4Size.width, a4Size.height);
    } else if (layout === 2 || layout === 4) {
      // 多个姓名牌，横向排列
      const configs = {
        2: [
          { x: 0, y: 0, w: a4Size.width / 2 - 5, h: a4Size.height },
          { x: a4Size.width / 2 + 5, y: 0, w: a4Size.width / 2 - 5, h: a4Size.height }
        ],
        4: [
          { x: 0, y: 0, w: a4Size.width / 2 - 5, h: a4Size.height / 2 - 5 },
          { x: a4Size.width / 2 + 5, y: 0, w: a4Size.width / 2 - 5, h: a4Size.height / 2 - 5 },
          { x: 0, y: a4Size.height / 2 + 5, w: a4Size.width / 2 - 5, h: a4Size.height / 2 - 5 },
          { x: a4Size.width / 2 + 5, y: a4Size.height / 2 + 5, w: a4Size.width / 2 - 5, h: a4Size.height / 2 - 5 }
        ]
      };

      const dataURL = CanvasModule.getDataURL('png');
      const positions = configs[layout];

      positions.forEach((pos, i) => {
        pdf.addImage(dataURL, 'PNG', pos.x, pos.y, pos.w, pos.h);
        progress.update(50 + (i + 1) * 10);
      });
    }

    progress.update(90);
    await sleep(50);

    // 保存 PDF
    pdf.save(`姓名牌_${state.name}.pdf`);

    progress.update(100);
    await sleep(100);

    // 完成反馈
    progress.complete();

    // 成功粒子效果
    const exportBtn = document.getElementById('export-pdf');
    AnimationsUI.createParticles(exportBtn, 10);

  } catch (error) {
    progress.close();
    console.error('Export PDF error:', error);
    alert('导出失败，请重试');
  }
}

/**
 * 批量导出多个姓名牌（可选功能）- 横向
 * @param {Array} names - 姓名列表
 * @param {Object} options - 导出选项
 */
async function exportBatch(names, options = {}) {
  if (!names || names.length === 0) {
    alert('请输入姓名列表');
    return;
  }

  // 显示进度
  const progress = AnimationsUI.showExportProgress('pdf');

  try {
    const { jsPDF } = window.jspdf;
    const state = StateModule.getState();
    const a4Size = CanvasModule.getA4();
    const layout = options.layout || CanvasModule.getLayout();

    // 创建 PDF（横向）
    const pdf = new jsPDF('l', 'mm', 'a4');

    progress.update(10);

    // 布局配置（横向）
    const configs = {
      1: [{ x: 0, y: 0, w: a4Size.width, h: a4Size.height }],
      2: [
        { x: 0, y: 0, w: a4Size.width / 2 - 5, h: a4Size.height },
        { x: a4Size.width / 2 + 5, y: 0, w: a4Size.width / 2 - 5, h: a4Size.height }
      ],
      4: [
        { x: 0, y: 0, w: a4Size.width / 2 - 5, h: a4Size.height / 2 - 5 },
        { x: a4Size.width / 2 + 5, y: 0, w: a4Size.width / 2 - 5, h: a4Size.height / 2 - 5 },
        { x: 0, y: a4Size.height / 2 + 5, w: a4Size.width / 2 - 5, h: a4Size.height / 2 - 5 },
        { x: a4Size.width / 2 + 5, y: a4Size.height / 2 + 5, w: a4Size.width / 2 - 5, h: a4Size.height / 2 - 5 }
      ]
    };

    const positions = configs[layout];
    const itemsPerPage = layout;
    const totalItems = names.length;

    let itemIndex = 0;

    names.forEach((name, i) => {
      // 更新状态并重新绘制
      StateModule.setState({ name: name });
      Renderer.redrawAll();

      // 获取图像
      const dataURL = CanvasModule.getDataURL('png');

      // 添加到 PDF
      const pos = positions[itemIndex % itemsPerPage];
      pdf.addImage(dataURL, 'PNG', pos.x, pos.y, pos.w, pos.h);

      itemIndex++;

      // 更新进度
      progress.update(Math.round((i + 1) / totalItems * 80));

      // 如果当前页已满，添加新页
      if (itemIndex % itemsPerPage === 0 && i < names.length - 1) {
        pdf.addPage();
      }
    });

    progress.update(90);

    // 恢复原始状态
    StateModule.setState({ name: state.name });
    Renderer.redrawAll();

    // 保存 PDF
    pdf.save(`姓名牌批量导出.pdf`);

    progress.update(100);
    await sleep(100);

    // 完成反馈
    progress.complete();

  } catch (error) {
    progress.close();
    console.error('Batch export error:', error);
    alert('批量导出失败，请重试');
  }
}

/**
 * 简单的 sleep 函数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 导出函数
window.ExportModule = {
  png: exportPNG,
  pdf: exportPDF,
  batch: exportBatch
};