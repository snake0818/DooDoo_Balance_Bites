//============== 此檔案定義前端網頁使用的自訂JavaScript函數 ================

async function getItemList() {
  try {
    // 等待 getAllRecords() 解析完成並獲取數據
    const data = await getAllRecords();
    // 如果 data 是空的，則返回
    if (!data || data.length === 0) return;
    // 遍歷 data 並創建每個項目的 HTML 元素，並顯示在網頁上
    for (let i = 0; i < data.length; i++) { newItem(data[i]); }
  } catch (error) { console.error('獲取遊玩紀錄時發生錯誤:', error); }
}


// 建立一個遊玩紀錄的HTML元素，並顯示在網頁上
function newItem(item) {
  let content = `
    <div class="container alert alert-info" id="${item.id}"> 
      <div class="row" style="text-align:center;">
        <div class="col-3">
          <text id="gameID${item.id}">${item.gameID}</text>
        </div>
        <div class="col-3">
          <text id="numOfError${item.id}">${item.numOfError}</text>
        </div>
        <div class="col-3">
          <text id="totalPlayedTime${item.id}">${formatTime(item.totalPlayedTime)}</text>
        </div>
        <div class="col-3">
          <text id="created_at${item.id}">${new Date(item.created_at).toLocaleString()}</text>
        </div>
      <div>
    </div>
    `;
  $('body').append(content); // 將content加到body元素的最後面
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // 將小於10的數字補零
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const secsStr = String(secs).padStart(2, '0');

  return `${hoursStr}:${minutesStr}:${secsStr}`;
}