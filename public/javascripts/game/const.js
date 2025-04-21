// ********** 路徑 ********** //
const resourcePATH = 'public';
const PATH = {
  UI: `${resourcePATH}/images/ui`,
  Atlas: `${resourcePATH}/images/atlas`,
  Food: `${resourcePATH}/images/food`,
  Audio: `${resourcePATH}/audios`
}
// ********** 全域參數 ********** //
const rate = 2;
const [WIDTH, HEIGHT] = [1920 * rate, 1080 * rate]; // 全域寬高
const audio_volume = 0.5; // 音效量
const audio_rate = 1; // 音效速度
const default_food_num = 8;
const foodTypes = ['nut', 'vegetable', 'dairy', 'fruit', 'meat', 'grain'];
const colorSets = ['orange_and_yellow', 'red', 'white', 'green', 'indigo_and_dark'];
const plateSets = { grain: 3, fruit: 2, meat: 3, dairy: 2, nut: 1, vegetable: 3 };
const pixelExactConfig = { // 精確像素點擊設置
  useHandCursor: true,
  pixelPerfect: true,   // 只點擊圖片有實際像素部分(重要!!!)
  pixelPerfectAlpha: 1  // 最低透明度判斷值（建議保持 1）
}
// ********** 開發用 ********** //
const DEV_MODE = false; // (false)
const DEV_MUTE = false; // (false)
// ********** 全域變數 ********** //
var preloadStatus = false;
// ********** 紀錄用 ********** //
var NumOfCorrect = 0;
var NumOfError = 0;