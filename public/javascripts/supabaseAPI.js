const supabaseUrl = 'https://iqgdyspcuxjjwycoqpml.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZ2R5c3BjdXhqand5Y29xcG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2MjA3ODIsImV4cCI6MjAzOTE5Njc4Mn0.Kuwfbtb218GtxQcptFj7XX4S2VZWFUdQnCFkx3IhMvU';
const supa = supabase.createClient(supabaseUrl, supabaseKey);

// 送出一筆紀錄資料
const sendRecord = async (gameName, wrong, playtime) => {
  const { data, error } = await supa
    .from('GameRecord')
    .insert([
      {
        gameID: gameName,
        numOfError: wrong,
        totalPlayedTime: playtime,
        created_at: new Date()
      }
    ]);
  if (error) console.error('遊玩紀錄儲存發生問題:', error);
  else console.log('遊玩紀錄已成功儲存!');
};

// 取得所有紀錄資料
const getAllRecords = async () => {
  const { data, error } = await supa
    .from('GameRecord')
    .select('*');
  if (error) console.error('取得所有遊玩紀錄發生問題:', error);
  else { console.log('已成功取得所有遊玩紀錄!'); return data; }
}

// 取得特定欄位資料
const getRecord = async (column) => {
  const { data, error } = await supa
    .from('GameRecord')
    .select(column);
  if (error) console.error(`取得${column}紀錄發生問題:`, error);
  else { console.log(`已成功取得${column}遊玩紀錄:`, data); return data; }
}