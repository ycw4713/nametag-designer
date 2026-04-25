/**
 * js/themes/index.js - 主题注册表和绘制映射
 */

// 主题映射表
const THEME_MAP = {
  animals: {
    module: 'AnimalsTheme',
    drawMethods: {
      star: 'drawStar',
      heart: 'drawHeart',
      cloud: 'drawCloud',
      bear: 'drawBear',
      rabbit: 'drawRabbit',
      cat: 'drawCat',
      sun: 'drawSun'
    }
  },
  nature: {
    module: 'NatureTheme',
    drawMethods: {
      leaf: 'drawLeaf',
      flower: 'drawFlower'
    }
  },
  space: {
    module: 'SpaceTheme',
    drawMethods: {
      star: 'drawStar',
      moon: 'drawMoon',
      rocket: 'drawRocket'
    }
  },
  ocean: {
    module: 'OceanTheme',
    drawMethods: {
      wave: 'drawWave',
      shell: 'drawShell',
      fish: 'drawFish'
    }
  },
  music: {
    module: 'MusicTheme',
    drawMethods: {
      note: 'drawNote',
      brush: 'drawBrush'
    }
  },
  geometric: {
    module: 'GeometricTheme',
    drawMethods: {
      triangle: 'drawTriangle',
      circle: 'drawCircle',
      diamond: 'drawDiamond'
    }
  },
  ink: {
    module: 'InkTheme',
    drawMethods: {
      inkBlob: 'drawInkBlob'
    }
  },
  minimal: {
    module: 'MinimalTheme',
    drawMethods: {
      line: 'drawLine'
    }
  }
};

/**
 * 获取主题模块
 */
function getThemeModule(themeId) {
  const moduleName = THEME_MAP[themeId]?.module || 'AnimalsTheme';
  return window[moduleName] || window.AnimalsTheme;
}

/**
 * 获取主题装饰配置
 */
function getThemeDecorations(themeId, density) {
  const module = getThemeModule(themeId);
  return module.getDecorations(density);
}

/**
 * 获取主题配色
 */
function getThemeColors(themeId) {
  const module = getThemeModule(themeId);
  return module.getColors();
}

/**
 * 获取装饰绘制方法
 */
function getDrawMethod(themeId, decorationType) {
  const themeConfig = THEME_MAP[themeId];
  const methodName = themeConfig?.drawMethods[decorationType] || 'drawStar';
  return window.DecorationDraw[methodName] || window.DecorationDraw.drawStar;
}

/**
 * 绘制装饰元素
 */
function drawDecoration(ctx, themeId, dec, x, y, size) {
  const colors = getThemeColors(themeId);
  const drawMethod = getDrawMethod(themeId, dec.type);
  const colorIndex = Math.floor(Math.random() * colors.decorations.length);
  drawMethod(ctx, x, y, size, colors.decorations[colorIndex]);
}

// 导出
window.ThemeManager = {
  map: THEME_MAP,
  getModule: getThemeModule,
  getDecorations: getThemeDecorations,
  getColors: getThemeColors,
  getDrawMethod,
  drawDecoration
};