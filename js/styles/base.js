/**
 * js/styles/base.js - 基础绘制方法
 */

/**
 * 绘制姓名（镂空效果）
 */
function drawName(ctx, bounds, name, fontSize, namePosition, fontFamily = 'Ma Shan Zheng') {
  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height * (namePosition / 100);

  // 计算字体大小
  if (!fontSize) {
    const maxWidth = bounds.width * 0.7;
    fontSize = Math.min(bounds.height * 0.35, maxWidth / (name ? name.length : 3));
    fontSize = Math.max(fontSize, 200);
  }

  ctx.font = `bold ${fontSize}px "${fontFamily}"`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (!name) {
    ctx.fillStyle = '#cccccc';
    ctx.font = `24px "${fontFamily}"`;
    ctx.fillText('请输入姓名', centerX, centerY);
  } else {
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';

    // 逐字绘制，确保字体一致性
    const chars = name.split('');
    const charSpacing = fontSize * 0.9;
    const startX = centerX - (chars.length - 1) * charSpacing / 2;

    chars.forEach((char, i) => {
      const charX = startX + i * charSpacing;
      // 先清除该字符区域，避免重叠
      ctx.save();
      ctx.beginPath();
      ctx.rect(charX - fontSize / 2, centerY - fontSize / 2, fontSize, fontSize);
      ctx.clip();
      ctx.strokeText(char, charX, centerY);
      ctx.restore();
    });
  }
}

/**
 * 绘制班级（镂空效果）
 */
function drawClass(ctx, bounds, className, fontSize, classPosition, fontFamily = 'Ma Shan Zheng') {
  if (!className) return;

  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height * (classPosition / 100);

  ctx.font = `bold ${fontSize}px "${fontFamily}"`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';

  // 逐字绘制，确保字体一致性
  const chars = className.split('');
  const charSpacing = fontSize * 0.85;
  const startX = centerX - (chars.length - 1) * charSpacing / 2;

  chars.forEach((char, i) => {
    const charX = startX + i * charSpacing;
    ctx.strokeText(char, charX, centerY);
  });
}

/**
 * 绘制寄语（可选）
 */
function drawMotto(ctx, bounds, motto, namePosition, fontFamily = 'Noto Sans SC') {
  if (!motto) return;

  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height * 0.85;

  ctx.font = `18px "${fontFamily}"`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = '#666666';
  ctx.fillText(motto, centerX, centerY);
}

/**
 * 绘制照片预留区域
 */
function drawPhotoArea(ctx, bounds) {
  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height * 0.25;
  const size = Math.min(bounds.width, bounds.height) * 0.12;

  ctx.beginPath();
  ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = '14px "Noto Sans SC"';
  ctx.fillStyle = '#888888';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('照片', centerX, centerY);
}

/**
 * 绘制圆角矩形路径
 */
function drawRoundRectPath(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/**
 * 绘制背景渐变
 */
function drawGradientBackground(ctx, bounds, colors) {
  const gradient = ctx.createLinearGradient(
    bounds.x, bounds.y,
    bounds.x + bounds.width, bounds.y + bounds.height
  );

  colors.forEach((color, i) => {
    gradient.addColorStop(i / (colors.length - 1), color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
}

// 导出
window.BaseDraw = {
  drawName,
  drawClass,
  drawMotto,
  drawPhotoArea,
  drawRoundRectPath,
  drawGradientBackground
};