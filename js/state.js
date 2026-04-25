/**
 * js/state.js - 状态管理模块
 */

// 年龄段推荐配置
const AGE_RECOMMENDATIONS = {
  kindergarten: { density: 'rich', theme: 'animals' },
  primary: { density: 'standard', theme: 'nature' },
  middle: { density: 'simple', theme: 'geometric' },
  high: { density: 'minimal', theme: 'ink' }
};

// 装饰密度配置
const DENSITY_CONFIG = {
  rich: { count: 10, borderWidth: 3, hasShadow: true },
  standard: { count: 6, borderWidth: 2, hasShadow: false },
  simple: { count: 3, borderWidth: 1, hasShadow: false },
  minimal: { count: 1, borderWidth: 0.5, hasShadow: false }
};

// 初始状态
let appState = {
  ageGroup: 'kindergarten',  // 年龄段: kindergarten | primary | middle | high
  theme: 'animals',          // 主题
  density: 'rich',           // 装饰密度: rich | standard | simple | minimal
  name: '',                  // 姓名
  className: '',             // 班级
  motto: '',                 // 寄语
  showPhoto: false,          // 照片预留区
  fontSize: 250,             // 姓名字体大小
  namePosition: 50,          // 姓名位置百分比
  classSize: 40,             // 班级字体大小
  classPosition: 30,         // 班级位置百分比
  layout: 1                  // 每页数量
};

// 状态变更回调
let stateCallbacks = [];

/**
 * 获取当前状态
 */
function getState() {
  return { ...appState };
}

/**
 * 更新状态
 */
function setState(newState) {
  const oldState = { ...appState };
  appState = { ...appState, ...newState };

  // 触发回调
  stateCallbacks.forEach(cb => cb(appState, oldState));
}

/**
 * 注册状态变更回调
 */
function onStateChange(callback) {
  stateCallbacks.push(callback);
}

/**
 * 切换年龄段（自动应用推荐值）
 */
function setAgeGroup(ageGroup) {
  const recommend = AGE_RECOMMENDATIONS[ageGroup];
  setState({
    ageGroup,
    theme: recommend.theme,
    density: recommend.density
  });
}

/**
 * 切换主题
 */
function setTheme(theme) {
  setState({ theme });
}

/**
 * 切换装饰密度
 */
function setDensity(density) {
  setState({ density });
}

/**
 * 获取装饰密度配置
 */
function getDensityConfig(density) {
  return DENSITY_CONFIG[density || appState.density];
}

/**
 * 获取年龄段推荐配置
 */
function getAgeRecommendation(ageGroup) {
  return AGE_RECOMMENDATIONS[ageGroup || appState.ageGroup];
}

// 导出
window.StateModule = {
  getState,
  setState,
  onStateChange,
  setAgeGroup,
  setTheme,
  setDensity,
  getDensityConfig,
  getAgeRecommendation,
  AGE_RECOMMENDATIONS,
  DENSITY_CONFIG
};