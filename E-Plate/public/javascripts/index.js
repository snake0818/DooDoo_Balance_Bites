const webPath = window.location.pathname.split('/').slice(0, -1).join('/');

const gameName = [
  '1.<span class="">食<ruby class=""><rt id="pinyin">ㄕ</rt><rt id="tone">ˊ</rt></ruby></span><span class="">物<ruby class=""><rt id="pinyin">ㄨ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">分<ruby class=""><rt id="pinyin">ㄈㄣ</rt></ruby></span><span class="">類<ruby class=""><rt id="pinyin">ㄌㄟ</rt><rt id="tone">ˋ</rt></ruby></span>',
  '2.<span class="">我<ruby class=""><rt id="pinyin">ㄨㄛ</rt><rt id="tone">ˇ</rt></ruby></span><span class="">的<ruby class=""><rt id="pinyin">˙ㄉㄜ</rt></ruby></span><span class="">餐<ruby class=""><rt id="pinyin">ㄘㄢ</rt></ruby></span><span class="">盤<ruby class=""><rt id="pinyin">ㄆㄢ</rt><rt id="tone">ˊ</rt></ruby></span>',
  '3.<span class="">念<ruby class=""><rt id="pinyin">ㄋㄧㄢ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">謠<ruby class=""><rt id="pinyin">ㄧㄠ</rt><rt id="tone">ˊ</rt></ruby></span><span class="">配<ruby class=""><rt id="pinyin">ㄆㄟ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">對<ruby class=""><rt id="pinyin">ㄉㄨㄟ</rt><rt id="tone">ˋ</rt></ruby></span>',
  '4.<span class="">彩<ruby class=""><rt id="pinyin">ㄘㄞ</rt><rt id="tone">ˇ</rt></ruby></span><span class="">虹<ruby class=""><rt id="pinyin">ㄏㄨㄥ</rt><rt id="tone">ˊ</rt></ruby></span><span class="">蔬<ruby class=""><rt id="pinyin">ㄕㄨ</rt></ruby></span><span class="">果<ruby class=""><rt id="pinyin">ㄍㄨㄛ</rt><rt id="tone">ˇ</rt></ruby></span><span class="">的<ruby class=""><rt id="pinyin">˙ㄉㄜ</rt></ruby></span><span class="">家<ruby class=""><rt id="pinyin">ㄐㄧㄚ</rt></ruby></span>',
  '5.<span class="">蔬<ruby class=""><rt id="pinyin">ㄕㄨ</rt></ruby></span><span class="">果<ruby class=""><rt id="pinyin">ㄍㄨㄛ</rt><rt id="tone">ˇ</rt></ruby></span><span class="">配<ruby class=""><rt id="pinyin">ㄆㄟ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">對<ruby class=""><rt id="pinyin">ㄉㄨㄟ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">身<ruby class=""><rt id="pinyin">ㄕㄣ</rt></ruby></span><span class="">體<ruby class=""><rt id="pinyin">ㄊㄧ</rt><rt id="tone">ˇ</rt></ruby></span>',
  '6.<span class="">食<ruby class=""><rt id="pinyin">ㄕ</rt><rt id="tone">ˊ</rt></ruby></span><span class="">物<ruby class=""><rt id="pinyin">ㄨ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">份<ruby class=""><rt id="pinyin">ㄈㄣ</rt><rt id="tone">ˋ</rt></ruby><span class="">量<ruby class=""><rt id="pinyin">ㄌㄧㄤ</rt><rt id="tone">ˊ</rt></ruby></span>',
];

// 將遊戲名稱分配給每個按鈕
const buttons = document.querySelectorAll('#game-btns .btn');
buttons.forEach((button, index) => {
  button.innerHTML = gameName[index]; // 使用 innerHTML 將 HTML 字串插入按鈕內容
});

$(function () {
  let audio;
  const game_frame = $('#game');
  const game_title = $('#game-title');
  const game_btns = $('#game-btns');
  const btns = $('#game-btns [id^=btn]');

  // 點擊確認按鈕
  $('#btnComfirm').click(function () {
    $('#gameContainer').removeClass('d-none');
    $('#ctrl').removeClass('d-none');
    $(this).addClass('d-none');
  });

  // 監聽鼠標移入按鈕事件
  btns.mouseenter(function () {
    // 檢查有無 guide-audio-play 類，避免多次重複播放
    if (!game_btns.hasClass('title-audio-play')) {
      // 提取按鈕的ID中的遊戲編號
      var gameId = $(this).attr('id').replace('btn', '');
      // 播放音效
      audio = new Audio(`${webPath}/public/audios/titles/game_title${gameId}.m4a`);
      audio.play();
      // 音效播放開始後添加 title-audio-play 類
      audio.addEventListener('play', () => {
        game_btns.addClass('title-audio-play');
      });
      // 音效播放結束後移除 title-audio-play 類
      audio.addEventListener('ended', () => {
        audio = null;
        game_btns.removeClass('title-audio-play');
      });
    }
  });

  // 監聽按鈕點擊事件
  btns.click(function () {
    // 切換時，確保沒有引導音效播放特殊情形的發生
    if (audio) {
      audio.pause();
      audio = null;
      game_title.removeClass('guide-audio-play');
    }
    // 提取按鈕的ID中的遊戲編號
    var gameId = $(this).attr('id').replace('btn', '');
    // 設置iframe的src屬性為相應的遊戲地址
    game_frame.attr('src', `${webPath}/game.html?game=${gameId}`);
    game_frame.removeClass('d-none'); // 移除 d-none 類以顯示 iframe 區域
    game_title.removeClass('d-none'); // 移除 d-none 類以顯示遊戲名稱區域
    game_title.html(gameName[gameId - 1]); // 添加遊戲名稱

    // 監聽鼠標移動進入元素事件
    game_title.mouseenter(function () {
      // 檢查有無 guide-audio-play 類，避免多次重複播放
      if (!this.classList.contains('guide-audio-play')) {
        this.classList.add('guide-audio-play'); // 添加 guide-audio-play 類以表示播放狀態
        // 播放音效
        audio = new Audio(`${webPath}/public/audios/guides/guide${gameId}.m4a`);
        audio.play();
        // 音效播放結束後移除 guide-audio-play 類
        audio.addEventListener('ended', () => {
          audio = null;
          game_title.removeClass('guide-audio-play');
        });
      }
    });
  });

  // 監聽 iframe 的 src 屬性變化事件，防止重複嵌套
  document.getElementById('game').addEventListener('load', function () {
    // 檢查新的 src 是否為根路徑 '/'
    if (this.contentWindow.location.pathname === '/') {
      // 清除先前的內容
      this.contentWindow.document.body.innerHTML = '';
      // 隱藏元素
      game_frame.classList.add('d-none');
      game_title.addClass('d-none');
    }
  });
});

document.getElementById('webTitle').href = webPath;
document.getElementById('home').href = webPath;