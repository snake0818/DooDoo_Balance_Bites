const gameName = [
  '1.<span class="">食<ruby class=""><rt id="pinyin">ㄕ</rt><rt id="tone">ˊ</rt></ruby></span><span class="">物<ruby class=""><rt id="pinyin">ㄨ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">分<ruby class=""><rt id="pinyin">ㄈㄣ</rt></ruby></span><span class="">類<ruby class=""><rt id="pinyin">ㄌㄟ</rt><rt id="tone">ˋ</rt></ruby></span>',
  '2.<span class="">我<ruby class=""><rt id="pinyin">ㄨㄛ</rt><rt id="tone">ˇ</rt></ruby></span><span class="">的<ruby class=""><rt id="pinyin">˙ㄉㄜ</rt></ruby></span><span class="">餐<ruby class=""><rt id="pinyin">ㄘㄢ</rt></ruby></span><span class="">盤<ruby class=""><rt id="pinyin">ㄆㄢ</rt><rt id="tone">ˊ</rt></ruby></span>',
  '3.<span class="">念<ruby class=""><rt id="pinyin">ㄋㄧㄢ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">謠<ruby class=""><rt id="pinyin">ㄧㄠ</rt><rt id="tone">ˊ</rt></ruby></span><span class="">配<ruby class=""><rt id="pinyin">ㄆㄟ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">對<ruby class=""><rt id="pinyin">ㄉㄨㄟ</rt><rt id="tone">ˋ</rt></ruby></span>',
  '4.<span class="">彩<ruby class=""><rt id="pinyin">ㄘㄞ</rt><rt id="tone">ˇ</rt></ruby></span><span class="">虹<ruby class=""><rt id="pinyin">ㄏㄨㄥ</rt><rt id="tone">ˊ</rt></ruby></span><span class="">蔬<ruby class=""><rt id="pinyin">ㄕㄨ</rt></ruby></span><span class="">果<ruby class=""><rt id="pinyin">ㄍㄨㄛ</rt><rt id="tone">ˇ</rt></ruby></span><span class="">的<ruby class=""><rt id="pinyin">˙ㄉㄜ</rt></ruby></span><span class="">家<ruby class=""><rt id="pinyin">ㄐㄧㄚ</rt></ruby></span>',
  '5.<span class="">蔬<ruby class=""><rt id="pinyin">ㄕㄨ</rt></ruby></span><span class="">果<ruby class=""><rt id="pinyin">ㄍㄨㄛ</rt><rt id="tone">ˇ</rt></ruby></span><span class="">配<ruby class=""><rt id="pinyin">ㄆㄟ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">對<ruby class=""><rt id="pinyin">ㄉㄨㄟ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">身<ruby class=""><rt id="pinyin">ㄕㄣ</rt></ruby></span><span class="">體<ruby class=""><rt id="pinyin">ㄊㄧ</rt><rt id="tone">ˇ</rt></ruby></span>',
  '6.<span class="">食<ruby class=""><rt id="pinyin">ㄕ</rt><rt id="tone">ˊ</rt></ruby></span><span class="">物<ruby class=""><rt id="pinyin">ㄨ</rt><rt id="tone">ˋ</rt></ruby></span><span class="">份<ruby class=""><rt id="pinyin">ㄈㄣ</rt><rt id="tone">ˋ</rt></ruby><span class="">量<ruby class=""><rt id="pinyin">ㄌㄧㄤ</rt><rt id="tone">ˊ</rt></ruby></span>',
];

// 將遊戲名稱分配給每個按鈕
const buttons = document.querySelectorAll('.btn');
buttons.forEach((button, index) => {
  button.innerHTML = gameName[index]; // 使用 innerHTML 將 HTML 字串插入按鈕內容
});

$(function () {
  // 監聽按鈕點擊事件
  $('[id^=btn]').click(function () {
    var gameId = $(this).attr('id').replace('btn', ''); // 提取按鈕的ID中的遊戲編號
    $('#game').attr('src', '/website/E-Plate/views/game' + gameId + '.html'); // 設置iframe的src屬性為相應的遊戲地址
    $('#game').removeClass('d-none'); // 移除 d-none 類以顯示 iframe
    $('#now').removeClass('d-none');
    $('#now').html(gameName[gameId - 1]);
  });
})

// 防止重複嵌套
// 監聽 iframe 的 src 屬性變化事件
document.getElementById('game').addEventListener('load', function () {
  // 檢查新的 src 是否為根路徑 '/'
  if (this.contentWindow.location.pathname === '/') {
    // 清除先前的內容
    this.contentWindow.document.body.innerHTML = '';
    document.getElementById('game').classList.add('d-none');
    $('#now').addClass('d-none');
  }
});