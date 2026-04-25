/**
 * 导出功能模块
 */

/**
 * 导出为 PNG 图片
 */
function exportPNG() {
    const dataURL = CanvasModule.getDataURL('png');
    const link = document.createElement('a');
    link.download = `姓名牌_${getState().name || '未命名'}.png`;
    link.href = dataURL;
    link.click();
}

/**
 * 导出为 PDF 文件（横向）
 */
function exportPDF() {
    const { jsPDF } = window.jspdf;
    const state = getState();
    const a4Size = CanvasModule.getA4();
    const layout = CanvasModule.getLayout();

    // 创建 A4 横向尺寸 PDF ('l' = landscape)
    const pdf = new jsPDF('l', 'mm', 'a4');

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

        // 当前只绘制了一个，复制到所有位置
        const dataURL = CanvasModule.getDataURL('png');
        const positions = configs[layout];

        positions.forEach(pos => {
            pdf.addImage(dataURL, 'PNG', pos.x, pos.y, pos.w, pos.h);
        });
    }

    // 保存 PDF
    pdf.save(`姓名牌_${state.name || '未命名'}.pdf`);
}

/**
 * 批量导出多个姓名牌（可选功能）- 横向
 * @param {Array} names - 姓名列表
 * @param {Object} options - 导出选项
 */
function exportBatch(names, options = {}) {
    const { jsPDF } = window.jspdf;
    const state = getState();
    const a4Size = CanvasModule.getA4();
    const layout = options.layout || CanvasModule.getLayout();

    // 创建 PDF（横向）
    const pdf = new jsPDF('l', 'mm', 'a4');

    let pageIndex = 0;
    let itemIndex = 0;

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

    names.forEach((name, i) => {
        // 更新状态并重新绘制
        updateState({ name: name });
        redraw();

        // 获取图像
        const dataURL = CanvasModule.getDataURL('png');

        // 添加到 PDF
        const pos = positions[itemIndex % itemsPerPage];
        pdf.addImage(dataURL, 'PNG', pos.x, pos.y, pos.w, pos.h);

        itemIndex++;

        // 如果当前页已满，添加新页
        if (itemIndex % itemsPerPage === 0 && i < names.length - 1) {
            pdf.addPage();
            pageIndex++;
        }
    });

    // 保存 PDF
    pdf.save(`姓名牌批量导出.pdf`);
}

// 导出函数
window.ExportModule = {
    png: exportPNG,
    pdf: exportPDF,
    batch: exportBatch
};