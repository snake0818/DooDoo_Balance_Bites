const API_ID =
  "AKfycbzAlvas7FZK9jMtH1yLSpR1pKy524I0uF7Oi8pLfjKlW31ZLsZkImh55GwlOulR2EV4";
const APIurl = `https://script.google.com/macros/s/${API_ID}/exec`;

// 取得所有紀錄並顯示所有紀錄項目
function getAllRecords() {
  fetch(APIurl)
    .then((res) => res.json())
    .then((datas) => {
      console.log("收到資料：", datas);
      if (!datas.length) return;
      datas.forEach((item) => $("body").append(newItem(item)));
    })
    .catch((err) => console.error(err));
}

// 儲存一筆紀錄
function uploadNewRecord(Data) {
  const record = {
    gameId: Data.gameID,
    errorCount: Data.wrong,
    duration: Data.playedTime,
    created: new Date().toISOString(),
  };
  navigator.sendBeacon(APIurl, JSON.stringify(record));
}

// 建立遊玩紀錄項目
function newItem(item) {
  return `
    <div class="container alert alert-info"> 
      <div class="row" style="text-align:center;">
        <div class="col-3">
          <text class="gameID">${item.遊戲編號}</text>
        </div>
        <div class="col-3">
          <text class="numOfError">${item.錯誤次數}</text>
        </div>
        <div class="col-3">
          <text class="playedTime">${formatTime(item.作答耗時)}</text>
        </div>
        <div class="col-3">
          <text class="created_at">${new Date(
            item.建立時間
          ).toLocaleString()}</text>
        </div>
      <div>
    </div>
    `;
}

// 時間格式化
function formatTime(ms) {
  const pad = (n, z = 2) => String(n).padStart(z, "0");
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor(ms % 1000);
  const timeStr =
    (hours > 0 ? `${pad(hours)}:` : "") +
    `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
  return timeStr;
}
