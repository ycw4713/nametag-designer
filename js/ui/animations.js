/**
 * js/ui/animations.js - 动效控制模块
 */

/**
 * 创建涟漪点击效果
 * @param {Event} event - 点击事件
 * @param {HTMLElement} element - 目标元素
 */
function createRipple(event, element) {
  // 检查是否为高中模式（动效克制）
  const state = StateModule.getState();
  if (state.ageGroup === 'high') return;

  // 移除已有涟漪
  const existingRipple = element.querySelector('.ripple');
  if (existingRipple) {
    existingRipple.remove();
  }

  const rect = element.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';

  // 计算涟漪位置和大小
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  element.appendChild(ripple);

  // 动画结束后移除
  ripple.addEventListener('animationend', () => {
    if (ripple.parentNode) {
      ripple.remove();
    }
  });
}

/**
 * 初始化涟漪效果
 * 为所有按钮添加涟漪点击效果
 */
function initRippleEffects() {
  const rippleButtons = document.querySelectorAll('.generate-btn, .export-btn, .age-btn, .theme-btn, .density-btn');

  rippleButtons.forEach(btn => {
    btn.classList.add('ripple-container');
    btn.addEventListener('click', (e) => createRipple(e, btn));
  });
}

/**
 * 创建粒子散开效果
 * @param {HTMLElement} triggerElement - 触发粒子效果的元素
 * @param {number} count - 粒子数量（默认8-12个）
 */
function createParticles(triggerElement, count = 10) {
  // 检查是否为高中模式（动效克制）
  const state = StateModule.getState();
  if (state.ageGroup === 'high') {
    count = Math.ceil(count / 2);
  }

  const rect = triggerElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const colors = ['', 'particle--secondary', 'particle--accent'];
  const particleCount = count;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = `particle ${colors[i % 3]}`;

    // 计算散开方向（随机角度）
    const angle = (360 / particleCount) * i + Math.random() * 30;
    const distance = 60 + Math.random() * 40;
    const tx = Math.cos(angle * Math.PI / 180) * distance;
    const ty = Math.sin(angle * Math.PI / 180) * distance;
    const rotate = Math.random() * 360;

    particle.style.cssText = `
      left: ${centerX}px;
      top: ${centerY}px;
      --tx: ${tx}px;
      --ty: ${ty}px;
      --rotate: ${rotate}deg;
    `;

    document.body.appendChild(particle);

    // 动画结束后移除
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, 1000);
  }
}

/**
 * 显示导出进度覆盖层
 * @param {string} type - 导出类型 ('png' 或 'pdf')
 * @returns {Object} - 进度控制对象
 */
function showExportProgress(type) {
  // 创建覆盖层
  const overlay = document.createElement('div');
  overlay.className = 'export-overlay';

  const isPDF = type === 'pdf';

  overlay.innerHTML = `
    <div class="export-progress-container">
      <div class="export-progress-title">${isPDF ? '正在生成 PDF...' : '正在导出图片...'}</div>
      <div class="export-progress-bar">
        <div class="export-progress-fill"></div>
      </div>
      <div class="export-progress-text">0%</div>
    </div>
  `;

  document.body.appendChild(overlay);

  // 触发显示动画
  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });

  const progressFill = overlay.querySelector('.export-progress-fill');
  const progressText = overlay.querySelector('.export-progress-text');

  return {
    update: (percent) => {
      progressFill.style.width = `${percent}%`;
      progressText.textContent = `${Math.round(percent)}%`;
    },
    complete: () => {
      // 更新为完成状态
      const container = overlay.querySelector('.export-progress-container');
      container.innerHTML = `
        <div class="export-complete-badge">✓</div>
        <div class="export-complete-text">导出完成！</div>
      `;

      // 2秒后关闭
      setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.remove();
          }
        }, 250);
      }, 1500);
    },
    close: () => {
      overlay.classList.remove('active');
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.remove();
        }
      }, 250);
    }
  };
}

/**
 * 显示输入错误提示
 * @param {HTMLElement} inputElement - 输入框元素
 * @param {string} message - 错误消息
 */
function showInputError(inputElement, message) {
  const inputGroup = inputElement.closest('.input-group');
  if (!inputGroup) return;

  // 添加错误状态
  inputElement.classList.add('error');
  inputGroup.classList.add('has-error');

  // 移除已有的错误提示
  const existingTooltip = inputGroup.querySelector('.error-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // 创建错误提示
  const tooltip = document.createElement('div');
  tooltip.className = 'error-tooltip';
  tooltip.textContent = message;
  inputGroup.appendChild(tooltip);

  // 3秒后自动消失
  setTimeout(() => {
    hideInputError(inputElement);
  }, 3000);
}

/**
 * 隐藏输入错误提示
 * @param {HTMLElement} inputElement - 输入框元素
 */
function hideInputError(inputElement) {
  const inputGroup = inputElement.closest('.input-group');
  if (!inputGroup) return;

  inputElement.classList.remove('error');
  inputGroup.classList.remove('has-error');

  const tooltip = inputGroup.querySelector('.error-tooltip');
  if (tooltip) {
    tooltip.remove();
  }
}

/**
 * 显示输入成功反馈
 * @param {HTMLElement} inputElement - 输入框元素
 */
function showInputSuccess(inputElement) {
  inputElement.classList.add('success');

  setTimeout(() => {
    inputElement.classList.remove('success');
  }, 500);
}

/**
 * 更新预览空状态提示
 */
function updatePreviewHint() {
  const state = StateModule.getState();
  const hintElement = document.querySelector('.preview-hint');

  if (!hintElement) return;

  if (state.name) {
    hintElement.textContent = '拖动滑块调整样式';
    hintElement.style.opacity = '0.7';
  } else {
    hintElement.textContent = '输入姓名后自动生成预览';
    hintElement.style.opacity = '1';
  }
}

// 导出
window.AnimationsUI = {
  createRipple,
  initRippleEffects,
  createParticles,
  showExportProgress,
  showInputError,
  hideInputError,
  showInputSuccess,
  updatePreviewHint
};