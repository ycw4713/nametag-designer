/**
 * js/renderer.js - 姓名/班级/装饰组装绘制流程
 */

/**
 * 绘制背景
 */
function renderBackground(ctx, bounds, state) {
  const colors = ThemeManager.getColors(state.theme);
  BaseDraw.drawGradientBackground(ctx, bounds, colors.background);
}

/**
 * 绘制边框
 */
function renderBorder(ctx, bounds, state) {
  const densityConfig = StateModule.getDensityConfig(state.density);
  const colors = ThemeManager.getColors(state.theme);

  const padding = 18;
  const radius = 20;
  const x = bounds.x + padding;
  const y = bounds.y + padding;
  const w = bounds.width - padding * 2;
  const h = bounds.height - padding * 2;

  ctx.strokeStyle = colors.border;
  ctx.lineWidth = densityConfig.borderWidth;

  if (densityConfig.hasShadow) {
    ctx.save();
    ctx.shadowColor = colors.decorations[0];
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.beginPath();
    BaseDraw.drawRoundRectPath(ctx, x, y, w, h, radius);
    ctx.stroke();
    ctx.restore();
  }

  ctx.beginPath();
  BaseDraw.drawRoundRectPath(ctx, x, y, w, h, radius);
  ctx.stroke();
}

/**
 * 绘制装饰
 */
function renderDecorations(ctx, bounds, state) {
  const decorations = ThemeManager.getDecorations(state.theme, state.density);
  const colors = ThemeManager.getColors(state.theme);
  const size = Math.min(bounds.width, bounds.height) * 0.04;

  decorations.forEach((dec, index) => {
    const x = bounds.x + bounds.width * dec.x;
    const y = bounds.y + bounds.height * dec.y;
    const drawMethod = ThemeManager.getDrawMethod(state.theme, dec.type);
    const colorIndex = index % colors.decorations.length;
    drawMethod(ctx, x, y, size, colors.decorations[colorIndex]);
  });
}

/**
 * 绘制完整姓名牌
 */
function renderNameTag(ctx, bounds, state) {
  const scale = CanvasModule.getScale();
  const scaledState = {
    ...state,
    fontSize: Math.round(state.fontSize * scale),
    classSize: Math.round((state.fontSize * 0.15) * scale)
  };

  // 绘制背景
  renderBackground(ctx, bounds, scaledState);

  // 绘制边框
  renderBorder(ctx, bounds, scaledState);

  // 绘制装饰
  renderDecorations(ctx, bounds, scaledState);

  // 绘制照片区域（如果启用）
  if (state.showPhoto) {
    BaseDraw.drawPhotoArea(ctx, bounds);
  }

  // 绘制姓名
  BaseDraw.drawName(ctx, bounds, state.name, scaledState.fontSize, state.namePosition, 'Ma Shan Zheng');

  // 绘制班级（如果有）
  if (state.className) {
    BaseDraw.drawClass(ctx, bounds, state.className, scaledState.classSize, state.namePosition, 'Ma Shan Zheng');
  }

  // 绘制寄语（如果有）
  if (state.motto) {
    BaseDraw.drawMotto(ctx, bounds, state.motto, state.namePosition);
  }
}

/**
 * 重绘所有姓名牌
 */
function redrawAll() {
  const state = StateModule.getState();
  const layout = state.layout;

  CanvasModule.clear();
  CanvasModule.setSize(layout);

  for (let i = 0; i < layout; i++) {
    const bounds = CanvasModule.getBounds(i);
    const ctx = CanvasModule.getContext();
    renderNameTag(ctx, bounds, state);
  }
}

// 导出
window.Renderer = {
  renderBackground,
  renderBorder,
  renderDecorations,
  renderNameTag,
  redrawAll
};