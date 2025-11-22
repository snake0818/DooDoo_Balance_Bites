const API_ID =
  "AKfycbx1e5zJ11-VIEEtdAKAFaRsH1clK4yZq-d9Adsa_hFEHKovVPl-NZieMrKEaVJN-I5m";
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
  fetch(APIurl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      gameId: Data.gameID,
      errorCount: Data.wrong,
      duration: Data.playedTime,
      created: new Date().toISOString(),
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log("上傳成功:", data))
    .catch((err) => console.error("上傳失敗:", err));
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
