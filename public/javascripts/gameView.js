// 禁止手勢縮放與雙擊放大
['gesturestart', 'dblclick'].forEach(event => document.addEventListener(event, (e) => e.preventDefault()));

// 全螢幕
const isFullscreenSupported = (() => {
  const el = document.documentElement;
  return !!(el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen);
})();
const Fullscreen = {
  isSupported: isFullscreenSupported,
  isActive: () => !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement),
  enter: () => {
    if (Fullscreen.isSupported && !Fullscreen.isActive()) {
      const el = document.documentElement;
      const promise = el.requestFullscreen?.() || el.webkitRequestFullscreen?.() || el.msRequestFullscreen?.();
      if (promise instanceof Promise) promise.catch(err => console.warn('進入全螢幕失敗:', err));
    }
  },
  exit: () => {
    if (Fullscreen.isSupported && Fullscreen.isActive()) {
      const promise = document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.msExitFullscreen?.();
      if (promise instanceof Promise) promise.catch(err => console.warn('退出全螢幕失敗:', err));
    }
  },
  toggle: () => {
    if (Fullscreen.isSupported) {
      Fullscreen.isActive() ? Fullscreen.exit() : Fullscreen.enter();
    }
  }
}

// 判斷
const Env = {
  isInsufficient: () => window.innerWidth < 1024 || window.innerHeight < 512,
  isPortrait: () => window.matchMedia('(orientation: portrait)').matches
}

// 防抖函式
function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  // 簡易選擇器
  const $ = selector => document.querySelector(selector);
  // DOM 元素快取
  const DOM = {
    warning: $('#rotate-warning'),
    navbar: $('nav'),
    container: $('#gameContainer'),
    app: $('#app'),
    game: $('#app canvas')
  };

  // 畫面提示與調整
  const ViewManager = (() => {

    const applyView = () => {
      DOM.app && (DOM.app.style.display = '');
      DOM.warning && (DOM.warning.style.display = 'none');
    };

    const showHint = () => {
      DOM.app && (DOM.app.style.display = 'none');
      DOM.warning && (DOM.warning.style.display = '');
    };

    const onHintClick = () => {
      if (Env.isPortrait()) return;
      Fullscreen.enter();
      DOM.warning && (DOM.warning.style.display = 'none');
      DOM.app && (DOM.app.style.display = '');
    };

    const update = () => {
      const isNarrow = Env.isInsufficient();
      if (Env.isPortrait() || !isNarrow) {
        DOM.navbar && (DOM.navbar.style.display = '');
        DOM.container && (DOM.container.style.paddingTop = '');
      } else {
        DOM.navbar && (DOM.navbar.style.display = 'none');
        DOM.container && (DOM.container.style.paddingTop = '0px');
      }
      if (
        (Env.isPortrait() && isNarrow) ||
        (!Fullscreen.isActive() && isNarrow && DOM.game.offsetWidth < window.innerWidth)
      ) showHint();
      else applyView();
    };

    const init = () => {
      ['DOMContentLoaded', 'orientationchange', 'resize'].forEach(evt => window.addEventListener(evt, debounce(update, 100)));
      DOM.warning?.addEventListener('click', onHintClick);
    };

    return { init, update };
  })();

  ViewManager.init();
});