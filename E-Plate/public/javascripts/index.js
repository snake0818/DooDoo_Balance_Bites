const webPath = window.location.pathname.split('/').slice(0, -1).join('/');

$(function () {
  let audio;
  const game_frame = $('#game');
  const game_title = $('#game-title');

  // 監聽 iframe 的 src 屬性變化事件，防止重複嵌套
  game_frame.on('load', function () {
    const iframeContent = this.contentWindow;
    // 檢查新的 src 是否為根路徑 webPath
    if (iframeContent.location.pathname === `${webPath}/`) {
      // 清除先前的內容
      iframeContent.document.body.innerHTML = '';
      // 隱藏元素
      game_frame.addClass('d-none');
      game_title.addClass('d-none');
    }
  });

  game_frame.attr('src', `${webPath}/game.html`);
});

document.getElementById('webTitle').href = webPath;
document.getElementById('home').href = webPath;