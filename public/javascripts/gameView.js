// 禁止手勢縮放與雙擊放大
['gesturestart', 'dblclick'].forEach(event => document.addEventListener(event, (e) => e.preventDefault()));

// 簡易選擇器
const $ = selector => document.querySelector(selector);
// DOM 元素快取
const DOM = {
  warning: $('#rotate-warning'),
  navbar: $('nav'),
  game: $('#game'),
  app: $('#app'),
};

// 全螢幕
const Fullscreen = {
  isActive: () => !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement),
  enter: () => {
    if (!Fullscreen.isActive()) {
      const el = document.documentElement;
      (el.requestFullscreen?.() || el.webkitRequestFullscreen?.() || el.msRequestFullscreen?.())
        .then(DOM.game && (DOM.game.style.paddingTop = ''))
        ?.catch(err => console.warn('進入全螢幕失敗:', err));
    }
  },
  exit: () => {
    if (Fullscreen.isActive())
      (document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.msExitFullscreen?.())
        .then(DOM.game && (DOM.game.style.paddingTop = '40px'))
        ?.catch(err => console.warn('退出全螢幕失敗:', err));
  }
}
// 判斷
const Env = {
  isMobile: () => Math.min(window.innerWidth, window.innerHeight) <= 768,
  isPortrait: () => window.matchMedia('(orientation: portrait)').matches
}

// 畫面提示與調整
const ViewManager = (() => {
  let hasClicked = false;

  const applyView = () => {
    Fullscreen.exit();
    DOM.navbar && (DOM.navbar.style.display = '');
    DOM.warning && (DOM.warning.style.display = 'none');
    DOM.app && (DOM.app.style.display = '');
  };

  const showHint = () => {
    DOM.app && (DOM.app.style.display = 'none');
    DOM.warning && (DOM.warning.style.display = '');
  };

  const onHintClick = () => {
    if (Env.isPortrait()) return;
    hasClicked = true;
    Fullscreen.enter();
    DOM.warning && (DOM.warning.style.display = 'none');
    DOM.navbar && (DOM.navbar.style.display = 'none');
    DOM.app && (DOM.app.style.display = '');
  };

  const update = () => {
    if (hasClicked) return;
    if (!Env.isMobile()) applyView();
    else if (Env.isPortrait()) showHint();
  };

  const init = () => {
    ['DOMContentLoaded', 'orientationchange', 'resize'].forEach(evt => window.addEventListener(evt, update));
    DOM.warning?.addEventListener('click', onHintClick);
  };

  return { init, update };
})();

ViewManager.init();