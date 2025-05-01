const STORAGE_KEY = 'GameRecords';

// 取得所有紀錄
const getAllRecords = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// 儲存一筆紀錄
const storageRecord = (Data) => {
  const record = {
    GameID: Data.gameID,
    NumOfError: Data.wrong,
    PlayedTime: Data.playedTime,
    Created_at: new Date().toISOString(),
  };
  const existing = getAllRecords();
  existing.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  console.log('✅ 遊玩紀錄已成功儲存至 localStorage！');
};

// 建立遊玩紀錄項目
function newItem(item) {
  return `
    <div class="container alert alert-info"> 
      <div class="row" style="text-align:center;">
        <div class="col-3">
          <text class="gameID">${item.GameID}</text>
        </div>
        <div class="col-3">
          <text class="numOfError">${item.NumOfError}</text>
        </div>
        <div class="col-3">
          <text class="playedTime">${formatTime(item.PlayedTime)}</text>
        </div>
        <div class="col-3">
          <text class="created_at">${new Date(item.Created_at).toLocaleString()}</text>
        </div>
      <div>
    </div>
    `;
}

// 時間格式化
function formatTime(ms) {
  const pad = (n, z = 2) => String(n).padStart(z, '0');
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor(ms % 1000);
  const timeStr = (hours > 0 ? `${pad(hours)}:` : '') +
    `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`
  return timeStr;
}