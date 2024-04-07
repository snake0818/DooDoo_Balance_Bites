const w = 7680;
const h = 4320;
const cx = w / 2;
const cy = h / 2;
// console.log(`width: ${w}, height: ${h}`);
const imageSize = 0.15 * h;  // 食物圖片大小
const numOfFood = 10;  // 食物數量
const shelfWidth = 0.15 * w; // 食物架寬度
const shelfHeight = 0.98 * h; // 食物架高度
const classFontSize = 0.03 * w; // 文字大小

const foodset = { nut: 8, milk: 7, meat: 8, vegetable: 12, fruit: 12, grain: 9 };
// 取得所有 foodset 的鍵(食物類型)
const foodTypes = Object.keys(foodset);

// 預載入資料
const GeneralPreload = (scene) => {
  // 設定背景
  scene.add.rectangle(cx, cy, w, h, 0xffffff).setDepth(-1);
  scene.load.image('end', '../public/images/ui/end.png');
  scene.load.image('O', '../public/images/ui/O.png');
  scene.load.image('X', '../public/images/ui/X.png');
  scene.load.image('nut0', '../public/images/foods/nuts/nut0.png');
  scene.load.image('nut1', '../public/images/foods/nuts/nut1.png');
  scene.load.image('nut2', '../public/images/foods/nuts/nut2.png');
  scene.load.image('nut3', '../public/images/foods/nuts/nut3.png');
  scene.load.image('nut4', '../public/images/foods/nuts/nut4.png');
  scene.load.image('nut5', '../public/images/foods/nuts/nut5.png');
  scene.load.image('nut6', '../public/images/foods/nuts/nut6.png');
  scene.load.image('nut7', '../public/images/foods/nuts/nut7.png');
  scene.load.image('nut8', '../public/images/foods/nuts/nut8.png');
  scene.load.image('milk0', '../public/images/foods/milks/milk0.png');
  scene.load.image('milk1', '../public/images/foods/milks/milk1.png');
  scene.load.image('milk2', '../public/images/foods/milks/milk2.png');
  scene.load.image('milk3', '../public/images/foods/milks/milk3.png');
  scene.load.image('milk4', '../public/images/foods/milks/milk4.png');
  scene.load.image('milk5', '../public/images/foods/milks/milk5.png');
  scene.load.image('milk6', '../public/images/foods/milks/milk6.png');
  scene.load.image('milk7', '../public/images/foods/milks/milk7.png');
  scene.load.image('meat0', '../public/images/foods/meats/meat0.png');
  scene.load.image('meat1', '../public/images/foods/meats/meat1.png');
  scene.load.image('meat2', '../public/images/foods/meats/meat2.png');
  scene.load.image('meat3', '../public/images/foods/meats/meat3.png');
  scene.load.image('meat4', '../public/images/foods/meats/meat4.png');
  scene.load.image('meat5', '../public/images/foods/meats/meat5.png');
  scene.load.image('meat6', '../public/images/foods/meats/meat6.png');
  scene.load.image('meat7', '../public/images/foods/meats/meat7.png');
  scene.load.image('meat8', '../public/images/foods/meats/meat8.png');
  scene.load.image('meat9', '../public/images/foods/meats/meat9.png');
  scene.load.image('meat10', '../public/images/foods/meats/meat10.png');
  scene.load.image('vegetable0', '../public/images/foods/vegetables/vegetable0.png');
  scene.load.image('vegetable1', '../public/images/foods/vegetables/vegetable1.png');
  scene.load.image('vegetable2', '../public/images/foods/vegetables/vegetable2.png');
  scene.load.image('vegetable3', '../public/images/foods/vegetables/vegetable3.png');
  scene.load.image('vegetable4', '../public/images/foods/vegetables/vegetable4.png');
  scene.load.image('vegetable5', '../public/images/foods/vegetables/vegetable5.png');
  scene.load.image('vegetable6', '../public/images/foods/vegetables/vegetable6.png');
  scene.load.image('vegetable7', '../public/images/foods/vegetables/vegetable7.png');
  scene.load.image('vegetable8', '../public/images/foods/vegetables/vegetable8.png');
  scene.load.image('vegetable9', '../public/images/foods/vegetables/vegetable9.png');
  scene.load.image('vegetable10', '../public/images/foods/vegetables/vegetable10.png');
  scene.load.image('vegetable11', '../public/images/foods/vegetables/vegetable11.png');
  scene.load.image('vegetable12', '../public/images/foods/vegetables/vegetable12.png');
  scene.load.image('fruit0', '../public/images/foods/fruits/fruit0.png');
  scene.load.image('fruit1', '../public/images/foods/fruits/fruit1.png');
  scene.load.image('fruit2', '../public/images/foods/fruits/fruit2.png');
  scene.load.image('fruit3', '../public/images/foods/fruits/fruit3.png');
  scene.load.image('fruit4', '../public/images/foods/fruits/fruit4.png');
  scene.load.image('fruit5', '../public/images/foods/fruits/fruit5.png');
  scene.load.image('fruit6', '../public/images/foods/fruits/fruit6.png');
  scene.load.image('fruit7', '../public/images/foods/fruits/fruit7.png');
  scene.load.image('fruit8', '../public/images/foods/fruits/fruit8.png');
  scene.load.image('fruit9', '../public/images/foods/fruits/fruit9.png');
  scene.load.image('fruit10', '../public/images/foods/fruits/fruit10.png');
  scene.load.image('fruit11', '../public/images/foods/fruits/fruit11.png');
  scene.load.image('fruit12', '../public/images/foods/fruits/fruit12.png');
  scene.load.image('grain0', '../public/images/foods/grains/grain0.png');
  scene.load.image('grain1', '../public/images/foods/grains/grain1.png');
  scene.load.image('grain2', '../public/images/foods/grains/grain2.png');
  scene.load.image('grain3', '../public/images/foods/grains/grain3.png');
  scene.load.image('grain4', '../public/images/foods/grains/grain4.png');
  scene.load.image('grain5', '../public/images/foods/grains/grain5.png');
  scene.load.image('grain6', '../public/images/foods/grains/grain6.png');
  scene.load.image('grain7', '../public/images/foods/grains/grain7.png');
  scene.load.image('grain8', '../public/images/foods/grains/grain8.png');
  scene.load.image('grain9', '../public/images/foods/grains/grain9.png');
}
// 定義遊戲結束
const endgame = (scene, userAnswer = null) => {
  // 清除資料
  if (userAnswer !== null) Object.keys(userAnswer).forEach(category => { userAnswer[category].length = 0; });
  // 結束介面
  endView(scene);
}// 定義拖動事件
const dragEvent = (scene, GameId, regions, userAnswer, colorSet = null) => {
  let whichArea
  let type;

  scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    // 更新物件的位置
    gameObject.x = dragX;
    gameObject.y = dragY;
    // 將物件移至最上層
    gameObject.depth = 1;
  });
  scene.input.on('dragend', function (pointer, gameObject) {
    const objName = gameObject.texture.key; // 移動物件的名稱
    let place = null;
    gameObject.depth = 0;
    // 檢查並清除 userAnswer 中 objName 的紀錄
    findToClean(userAnswer, objName);

    // 紀錄答案
    // 檢查食物在哪一區
    for (const region of regions) {
      switch (GameId) {
        case 'game1':
        case 'game6':
          type = 'class';
          whichArea = Phaser.Geom.Rectangle.Contains(region.bounds.getBounds(), gameObject.x, gameObject.y);
          break;
        case 'game4':
        case 'game5':
          type = 'color';
          whichArea = Phaser.Geom.Rectangle.Contains(region.bounds.getBounds(), gameObject.x, gameObject.y);
          break;
        case 'game2':
          type = 'class';
          whichArea = Phaser.Geom.Polygon.Contains(region.bounds, gameObject.x, gameObject.y);
          break;
        default:
          console.log('ERROR');
      }
      if (whichArea) {
        place = region.name;
        // 檢查userAnswer是否存在該類別的鍵，不存在則建立一個空陣列
        ckeckHasProperty(userAnswer, objName);
        userAnswer[region.name].push(objName);
        // console.log(`${objName} in ${region.name}`, userAnswer); // 驗證用途
        break;
      }
    }

    // 檢驗答案，都數量及答案正確則結束遊戲
    if (checkAnswer(scene, type, userAnswer, gameObject, place, colorSet)) { endgame(scene, userAnswer); }
  });
}

// 食物區域
const foodArea = (scene, foodArr, foodlist, x, y, w, h, gw, gh) => {
  // 食物區域
  const foodShelf = scene.add.rectangle(x, y, w, h, 0x888888).setDepth(-1);
  // 食物物件
  const foodSize = foodShelf.height / 5; // 假設每行有五個食物
  const foodSpacingX = foodSize + gw;
  const foodSpacingY = foodSize + gh;
  for (let i = 0; i < numOfFood; i++) {
    const row = Math.floor(i / 2); // 行數
    const col = i % 2; // 列數
    const x = foodShelf.x - foodSpacingX / 2 + col * foodSpacingX;
    const y = foodShelf.y - 2 * foodSpacingY + row * foodSpacingY;
    const food = scene.add.image(x, y, foodlist[i]);
    food.prevX = food.x;
    food.prevY = food.y;
    food.setDisplaySize((food.width / food.height) * imageSize, imageSize);
    food.setInteractive();  // 啟用交互
    scene.input.setDraggable(food);  // 啟用拖動
    foodArr.push({ name: foodlist[i], bounds: food });
  }
}
// 淡入、出介面
const fade = (scene, rect, image) => {
  // 淡入效果
  scene.tweens.add({
    targets: image,
    alpha: 1,
    duration: 0, // 淡入時間為n毫秒
    delay: 100, // 延遲n毫秒後開始
    onComplete: () => {
      // 在淡入完成後執行
      // 淡出效果
      scene.tweens.add({
        targets: image,
        alpha: 0,
        duration: 300, // 淡出時間為n毫秒
        delay: 100, // 延遲n毫秒後開始
        onComplete: () => {
          // 在淡出完成後執行
          image.destroy(); // 刪除圖片
          rect.destroy(); // 刪除矩形
        }
      });
    }
  });
}
// 正確介面
const CorrectView = (scene) => {
  const rect = scene.add.rectangle(cx, cy, w, h, 0x0, 0.3).setInteractive();
  const image = scene.add.image(cx, cy, 'O', 0.3).setDisplaySize(cy, cy);
  fade(scene, rect, image);
}
// 錯誤介面
const WrnogView = (scene) => {
  const rect = scene.add.rectangle(cx, cy, w, h, 0x0, 0.3).setInteractive();
  const image = scene.add.image(cx, cy, 'X', 0.3).setDisplaySize(cy, cy);
  fade(scene, rect, image);
}
// 結束介面
const endView = (scene) => {
  scene.add.rectangle(cx, cy, w, h, 0x0, 0.8).setInteractive();
  const end = scene.add.image(cx, cy, 'end', 0.3).setDisplaySize(cx, w * 0.5 * (3 / 4));
  let backWeb = scene.add.rectangle(end.x - end.width / 1.75, end.y + end.height / 2.3, end.width, end.height).setInteractive();
  let again = scene.add.rectangle(end.x + end.width / 1.75, end.y + end.height / 2.3, end.width, end.height).setInteractive();
  backWeb.on('pointerup', () => { window.location.href = '/'; })
  again.on('pointerup', () => { scene.scene.start('gameStart'); })
}
// 隨機食物
const randomFood = () => {
  // 隨機選擇一個食物類型及食物編號
  const randomType = foodTypes[Math.round(Math.random() * foodTypes.length)];
  const randomFoodNumber = Math.round(Math.random() * foodset[randomType]);
  const randomFoo = randomType + randomFoodNumber;
  return randomFoo;
}
// 隨機取用食物圖
const getRandomFoods = (count, set = null) => {
  const selectedFoods = [];
  while (selectedFoods.length < count) {
    const ramFoo = randomFood();
    // 檢查沒有重複，沒有則push進selectedFoods
    if (!selectedFoods.includes(ramFoo)) { selectedFoods.push(ramFoo); }

    // 食物清單條件設置，確保非限定不會出現
    if (set) {
      let isCorrect = !selectedFoods.some(food => {
        // 檢查食物是否包含在限定顏色之外
        return !Object.values(colorset).flat().includes(food);
      });
      if (!isCorrect) { selectedFoods.length = 0; };
    } else {
      // 檢查六大類食物都至少有1個
      if (selectedFoods.length === count) {
        const typesSet = new Set(selectedFoods.map(food => food.replace(/[0-9]|1[0-9]/g, '')));
        if (typesSet.size !== foodTypes.length) { selectedFoods.length = 0; };
      }
    }
  }
  // 傳回選擇食物陣列
  return selectedFoods;
}

// 檢查並清除特定值
const findToClean = (array, value) => {
  Object.values(array).forEach(arr => {
    // 使用 indexOf 找出特定元素的 index
    const index = arr.indexOf(value);
    // 使用 splice 將特定元素做刪除
    if (index != -1) { arr.splice(index, 1); }
  });
}
// 檢查array是否存在該類別的鍵，不存在則建立一個空陣列
const ckeckHasProperty = (array, key) => { if (!array.hasOwnProperty(key)) { array[key] = []; } }
//  method 使用方法, 顯示作答狀態的文字, Arraies 使用者答案陣列集, food, place, colorSet=null 顏色分類定義陣列集
const checkAnswer = (scene, method, Arraies, foodObject, place, colorSet = null) => {
  // 計算總數
  var AnswerNum = Object.keys(Arraies).reduce((total, category) => { return total + Arraies[category].length; }, 0);

  if (AnswerNum === numOfFood) {
    // 檢驗答案
    var AnswerNum = 0;
    var numOfWrong = 0;
    Object.keys(Arraies).forEach(category => {
      Arraies[category].forEach(obj => {
        // 紀錄總數
        AnswerNum++;
        // 檢驗是否有分類錯誤
        if (method === 'class') { if (category !== obj.split(/[0-9]|1[0-9]+/)[0]) { numOfWrong++ }; }
        else if (method === 'color') { if (colorSet[category].indexOf(obj) === -1) { numOfWrong++ }; }
        else { console.log('使用方法錯誤或尚未定義!'); }
      });
    });
    // 如果放置總數與食物數量相同，並且沒有分類錯誤，則結束遊戲
    if (numOfWrong === 0) { return true; };
  } else {
    const food = foodObject.texture.key;
    let findFoodIndex;
    if (method === 'color') { findFoodIndex = colorSet[place].indexOf(food) }
    if ((method === 'class' && place === food.split(/[0-9]|1[0-9]+/)[0]) ||
      (method === 'color' && findFoodIndex !== -1)) {
      CorrectView(scene);
    } else {
      foodObject.x = foodObject.prevX;
      foodObject.y = foodObject.prevY;
      findToClean(Arraies, food);
      WrnogView(scene);
    }
  }
  // console.log(Arraies);
  return false;
}