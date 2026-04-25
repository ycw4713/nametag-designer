/**
 * js/styles/decorations.js - 装饰元素绘制方法
 */

/**
 * 绘制星星（镂空）
 */
function drawStar(ctx, cx, cy, size, color = '#ff9800') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();

  const spikes = 5;
  const outerRadius = size;
  const innerRadius = size * 0.4;

  for (let i = 0; i < spikes; i++) {
    const angle = (i * 2 * Math.PI / spikes) - Math.PI / 2;
    const outerX = cx + Math.cos(angle) * outerRadius;
    const outerY = cy + Math.sin(angle) * outerRadius;
    const innerAngle = angle + Math.PI / spikes;
    const innerX = cx + Math.cos(innerAngle) * innerRadius;
    const innerY = cy + Math.sin(innerAngle) * innerRadius;

    if (i === 0) ctx.moveTo(outerX, outerY);
    else ctx.lineTo(outerX, outerY);
    ctx.lineTo(innerX, innerY);
  }

  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

/**
 * 绘制爱心（镂空）
 */
function drawHeart(ctx, cx, cy, size, color = '#ff6b6b') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();

  const topY = cy - size * 0.5;
  const topCurveHeight = size * 0.3;

  ctx.moveTo(cx, topY + topCurveHeight);
  ctx.bezierCurveTo(cx - size * 0.5, topY, cx - size, topY + topCurveHeight, cx - size * 0.5, cy + size * 0.3);
  ctx.bezierCurveTo(cx + size, topY + topCurveHeight, cx + size * 0.5, topY, cx, topY + topCurveHeight);

  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

/**
 * 绘制云朵（镂空）
 */
function drawCloud(ctx, cx, cy, size, color = '#4fc3f7') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;

  const cloudHeight = size * 0.6;

  ctx.beginPath();
  ctx.arc(cx - size * 0.25, cy, cloudHeight * 0.5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy - cloudHeight * 0.2, cloudHeight * 0.6, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx + size * 0.25, cy, cloudHeight * 0.5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * 绘制小熊轮廓（卡通动物）
 */
function drawBear(ctx, cx, cy, size, color = '#8b7355') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;

  // 头部
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.6, 0, Math.PI * 2);
  ctx.stroke();

  // 耳朵
  const earSize = size * 0.25;
  ctx.beginPath();
  ctx.arc(cx - size * 0.5, cy - size * 0.4, earSize, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx + size * 0.5, cy - size * 0.4, earSize, 0, Math.PI * 2);
  ctx.stroke();

  // 眼睛
  ctx.beginPath();
  ctx.arc(cx - size * 0.2, cy - size * 0.1, size * 0.08, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx + size * 0.2, cy - size * 0.1, size * 0.08, 0, Math.PI * 2);
  ctx.stroke();

  // 鼻子
  ctx.beginPath();
  ctx.arc(cx, cy + size * 0.15, size * 0.12, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * 绘制兔子轮廓（卡通动物）
 */
function drawRabbit(ctx, cx, cy, size, color = '#d7ccc8') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;

  // 头部
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
  ctx.stroke();

  // 长耳朵
  ctx.beginPath();
  ctx.ellipse(cx - size * 0.25, cy - size * 0.7, size * 0.15, size * 0.4, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(cx + size * 0.25, cy - size * 0.7, size * 0.15, size * 0.4, 0, 0, Math.PI * 2);
  ctx.stroke();

  // 眼睛
  ctx.beginPath();
  ctx.arc(cx - size * 0.15, cy, size * 0.06, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx + size * 0.15, cy, size * 0.06, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * 绘制猫咪轮廓（卡通动物）
 */
function drawCat(ctx, cx, cy, size, color = '#ff9800') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;

  // 头部
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
  ctx.stroke();

  // 三角耳朵
  ctx.beginPath();
  ctx.moveTo(cx - size * 0.4, cy - size * 0.3);
  ctx.lineTo(cx - size * 0.55, cy - size * 0.7);
  ctx.lineTo(cx - size * 0.2, cy - size * 0.45);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx + size * 0.4, cy - size * 0.3);
  ctx.lineTo(cx + size * 0.55, cy - size * 0.7);
  ctx.lineTo(cx + size * 0.2, cy - size * 0.45);
  ctx.closePath();
  ctx.stroke();

  // 眼睛
  ctx.beginPath();
  ctx.arc(cx - size * 0.15, cy - size * 0.05, size * 0.08, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx + size * 0.15, cy - size * 0.05, size * 0.08, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * 绘制太阳（镂空）
 */
function drawSun(ctx, cx, cy, size, color = '#ffca28') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
  ctx.stroke();

  const rays = 8;
  for (let i = 0; i < rays; i++) {
    const angle = (i * 2 * Math.PI / rays);
    const innerX = cx + Math.cos(angle) * size * 0.6;
    const innerY = cy + Math.sin(angle) * size * 0.6;
    const outerX = cx + Math.cos(angle) * size;
    const outerY = cy + Math.sin(angle) * size;

    ctx.beginPath();
    ctx.moveTo(innerX, innerY);
    ctx.lineTo(outerX, outerY);
    ctx.stroke();
  }

  ctx.restore();
}

// 导出
window.DecorationDraw = {
  drawStar,
  drawHeart,
  drawCloud,
  drawBear,
  drawRabbit,
  drawCat,
  drawSun
};