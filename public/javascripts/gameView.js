// 禁止手勢縮放與雙擊放大
['gesturestart', 'dblclick'].forEach(event => document.addEventListener(event, (e) => e.preventDefault()));

// 全螢幕
const Fullscreen = {
  isActive: () => !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement),
  enter: () => {
    if (!Fullscreen.isActive()) {
      const el = document.documentElement;
      (el.requestFullscreen?.() || el.webkitRequestFullscreen?.() || el.msRequestFullscreen?.())
        ?.catch(err => console.warn('進入全螢幕失敗:', err));
    }
  },
  exit: () => {
    if (Fullscreen.isActive())
      (document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.msExitFullscreen?.())
        ?.catch(err => console.warn('退出全螢幕失敗:', err));
  }
}
// 判斷
const Env = {
  isInsufficientWidth: () => window.innerWidth < 768,
  isPortrait: () => window.matchMedia('(orientation: portrait)').matches
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
    game: $('#app canvas'),
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
      const isNarrow = Env.isInsufficientWidth();
      if (
        (Env.isPortrait() && isNarrow) ||
        (!Fullscreen.isActive() && isNarrow && DOM.game.offsetWidth < window.innerWidth)
      ) showHint();
      else applyView();
    };

    const init = () => {
      ['DOMContentLoaded', 'orientationchange', 'resize'].forEach(evt => window.addEventListener(evt, update));
      DOM.warning?.addEventListener('click', onHintClick);
    };

    return { init, update };
  })();

  ViewManager.init();
});