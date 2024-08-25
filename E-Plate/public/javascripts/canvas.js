// ****************************** 參數定義 ****************************** //

// 網站路徑
const webPath = window.location.pathname.split('/').slice(0, -1).join('/');
// 資源路徑
const resourcePATH = 'public';
const PATH_UI = `${resourcePATH}/images/ui`;
const PATH_Foods = `${resourcePATH}/images/foods`;
const PATH_Audio = `${resourcePATH}/audios`;

// 全域參數設置
const [WIDTH, HEIGHT] = [7680, 4320];   // 全域寬高
const [GCX, GCY] = [WIDTH / 2, HEIGHT / 2];   // 全域中心點
const DefaultNumOfFood = 8;  // 食物數量
const imageSize = 0.1 * HEIGHT;  // 食物圖片大小

// 設置限制
const foodSet = { nut: 3, dairy: 3, meat: 11, vegetable: 13, fruit: 14, grain: 9 };
const colorSet = {
  red: ['vegetable9', 'vegetable10', 'vegetable11', 'fruit6', 'fruit7', 'fruit8', 'fruit9', 'fruit10', 'fruit11',],
  gre: ['vegetable4', 'vegetable5', 'vegetable6', 'vegetable7', 'vegetable8', 'fruit0', 'fruit1',],
  whi: ['vegetable0', 'vegetable1', 'vegetable2', 'vegetable3',],
  o_y: ['fruit2', 'fruit3', 'fruit4', 'fruit5',],
  i_d: ['vegetable12', 'fruit12', 'fruit13',],
};
const plateSet = { nut: 1, dairy: 2, meat: 3, vegetable: 3, fruit: 2, grain: 3 };
const totalPlateCount = Object.values(plateSet).reduce((total, count) => total + count, 0);
const fruitAndVeget = ['vegetable', 'fruit'];
const foodTypes = Object.keys(foodSet); // 取得所有 foodSet 的鍵(食物類型)

let GamingName; // 正在進行的遊戲名稱紀錄

// 測試用參數
const audio_effect_play = true;
const [DefaultCOLOR, SHOW, BGV] = ['0x000000', false, false];
const Interactive_Depth = 0;

// ************************************************** Function ************************************************** //

// 通用預載入資料
const GeneralPreload = (scene) => {
  // 設定底色
  scene.add.rectangle(GCX, GCY, WIDTH, HEIGHT, 0xffffff).setDepth(-1);
  // ********** 載入資源 **********
  // UI
  scene.load.audio('correct', `${PATH_Audio}/ui/correct.m4a`);
  scene.load.audio('wrong', `${PATH_Audio}/ui/wrong.m4a`);
  scene.load.image('foodShelf', `${PATH_UI}/foodShelf.png`);
  scene.load.image('start', `${PATH_UI}/bg/bg_start.png`);
  scene.load.image('end', `${PATH_UI}/bg/bg_end.png`);
  scene.load.image('correct', `${PATH_UI}/correct.png`);
  scene.load.image('wrong', `${PATH_UI}/wrong.png`);
  scene.load.image('btn_home', `${PATH_UI}/buttons/btn_home_page.png`);
  scene.load.image('btn_again', `${PATH_UI}/buttons/btn_play_again.png`);
  // 食物
  scene.load.image('nut0', `${PATH_Foods}/nuts/nut0.png`);
  scene.load.image('nut1', `${PATH_Foods}/nuts/nut1.png`);
  scene.load.image('nut2', `${PATH_Foods}/nuts/nut2.png`);
  scene.load.image('dairy0', `${PATH_Foods}/dairies/dairy0.png`);
  scene.load.image('dairy1', `${PATH_Foods}/dairies/dairy1.png`);
  scene.load.image('dairy2', `${PATH_Foods}/dairies/dairy2.png`);
  scene.load.image('grain0', `${PATH_Foods}/grains/grain0.png`);
  scene.load.image('grain1', `${PATH_Foods}/grains/grain1.png`);
  scene.load.image('grain2', `${PATH_Foods}/grains/grain2.png`);
  scene.load.image('grain3', `${PATH_Foods}/grains/grain3.png`);
  scene.load.image('grain4', `${PATH_Foods}/grains/grain4.png`);
  scene.load.image('grain5', `${PATH_Foods}/grains/grain5.png`);
  scene.load.image('grain6', `${PATH_Foods}/grains/grain6.png`);
  scene.load.image('grain7', `${PATH_Foods}/grains/grain7.png`);
  scene.load.image('grain8', `${PATH_Foods}/grains/grain8.png`);
  scene.load.image('meat0', `${PATH_Foods}/meats/meat0.png`);
  scene.load.image('meat1', `${PATH_Foods}/meats/meat1.png`);
  scene.load.image('meat2', `${PATH_Foods}/meats/meat2.png`);
  scene.load.image('meat3', `${PATH_Foods}/meats/meat3.png`);
  scene.load.image('meat4', `${PATH_Foods}/meats/meat4.png`);
  scene.load.image('meat5', `${PATH_Foods}/meats/meat5.png`);
  scene.load.image('meat6', `${PATH_Foods}/meats/meat6.png`);
  scene.load.image('meat7', `${PATH_Foods}/meats/meat7.png`);
  scene.load.image('meat8', `${PATH_Foods}/meats/meat8.png`);
  scene.load.image('meat9', `${PATH_Foods}/meats/meat9.png`);
  scene.load.image('meat10', `${PATH_Foods}/meats/meat10.png`);
  scene.load.image('fruit0', `${PATH_Foods}/fruits/fruit0.png`);
  scene.load.image('fruit1', `${PATH_Foods}/fruits/fruit1.png`);
  scene.load.image('fruit2', `${PATH_Foods}/fruits/fruit2.png`);
  scene.load.image('fruit3', `${PATH_Foods}/fruits/fruit3.png`);
  scene.load.image('fruit4', `${PATH_Foods}/fruits/fruit4.png`);
  scene.load.image('fruit5', `${PATH_Foods}/fruits/fruit5.png`);
  scene.load.image('fruit6', `${PATH_Foods}/fruits/fruit6.png`);
  scene.load.image('fruit7', `${PATH_Foods}/fruits/fruit7.png`);
  scene.load.image('fruit8', `${PATH_Foods}/fruits/fruit8.png`);
  scene.load.image('fruit9', `${PATH_Foods}/fruits/fruit9.png`);
  scene.load.image('fruit10', `${PATH_Foods}/fruits/fruit10.png`);
  scene.load.image('fruit11', `${PATH_Foods}/fruits/fruit11.png`);
  scene.load.image('fruit12', `${PATH_Foods}/fruits/fruit12.png`);
  scene.load.image('fruit13', `${PATH_Foods}/fruits/fruit13.png`);
  scene.load.image('vegetable0', `${PATH_Foods}/vegetables/vegetable0.png`);
  scene.load.image('vegetable1', `${PATH_Foods}/vegetables/vegetable1.png`);
  scene.load.image('vegetable2', `${PATH_Foods}/vegetables/vegetable2.png`);
  scene.load.image('vegetable3', `${PATH_Foods}/vegetables/vegetable3.png`);
  scene.load.image('vegetable4', `${PATH_Foods}/vegetables/vegetable4.png`);
  scene.load.image('vegetable5', `${PATH_Foods}/vegetables/vegetable5.png`);
  scene.load.image('vegetable6', `${PATH_Foods}/vegetables/vegetable6.png`);
  scene.load.image('vegetable7', `${PATH_Foods}/vegetables/vegetable7.png`);
  scene.load.image('vegetable8', `${PATH_Foods}/vegetables/vegetable8.png`);
  scene.load.image('vegetable9', `${PATH_Foods}/vegetables/vegetable9.png`);
  scene.load.image('vegetable10', `${PATH_Foods}/vegetables/vegetable10.png`);
  scene.load.image('vegetable11', `${PATH_Foods}/vegetables/vegetable11.png`);
  scene.load.image('vegetable12', `${PATH_Foods}/vegetables/vegetable12.png`);
}

// 食物櫃設置
const foodArea = (scene, foodArr, foodlist, layoutConfig) => {
  const { x, y, width, heigh } = layoutConfig;
  // 食物櫃區域及背景
  scene.add.image(x, y, 'foodShelf').setDisplaySize(width, heigh).setOrigin(0.5);
  const foodShelf = scene.add.rectangle(x, .98 * y, .9 * width, .92 * heigh, 0x888888, SHOW).setDepth(0);
  const [FS_x, FS_y] = [foodShelf.x - foodShelf.width * .5, foodShelf.y - foodShelf.height * .5];

  // 食物物件設置
  const numOfShelfRows = 4; // 食物櫃總列數
  const numOfFoodInRow = Math.ceil(foodlist.length / numOfShelfRows); // 每行食物數量
  const foodSize = .15 * heigh;
  const Colgap = (foodShelf.width - numOfFoodInRow * foodSize) / numOfFoodInRow;
  const RowGap = foodShelf.height * .105;
  for (let i = 0; i < foodlist.length; i++) {
    const location = { row: Math.floor(i / numOfFoodInRow), col: i % numOfFoodInRow };
    const position = {
      x: FS_x + foodSize * (location.col + .5) + Colgap * (location.col + .5),
      y: FS_y + foodSize * (location.row + .5) + RowGap * location.row
    };
    const food = scene.add.image(position.x, position.y, foodlist[i]).setDisplaySize(foodSize, foodSize).setInteractive();
    food.prevX = food.x;
    food.prevY = food.y;
    scene.input.setDraggable(food);  // 啟用拖動
    foodArr.push({ name: foodlist[i], bounds: food });
  }
}

// 遊戲結束
const endGame = (scene, userAnswer = null) => {
  // 清除資料
  if (userAnswer) Object.keys(userAnswer).forEach(category => { userAnswer[category].length = 0; });
  // ********** 結束介面 **********
  const end_bg = scene.add.image(GCX, GCY, 'end').setDisplaySize(WIDTH, HEIGHT);
  scene.time.delayedCall(1000, () => {
    // '返回網站'與'再次遊玩'按鈕
    const backWeb = scene.add.image(GCX - .1 * WIDTH, GCY + .25 * HEIGHT, 'btn_home').setDisplaySize(3 * imageSize, 1.5 * imageSize);
    const again = scene.add.image(GCX + .1 * WIDTH, GCY + .25 * HEIGHT, 'btn_again').setDisplaySize(3 * imageSize, 1.5 * imageSize);
    // '返回網站'按鈕點擊事件，回到主選單場景
    backWeb.setInteractive().on('pointerdown', () => { scene.scene.stop(GamingName); scene.scene.start('MainMenu'); });
    // '再次遊玩'按鈕點擊事件，再次啟用當前遊戲場景
    again.setInteractive().on('pointerdown', () => { scene.scene.start(GamingName); });
  });
}

// 定義拖動事件
const dragEvent = (scene, gameType, topicNum = DefaultNumOfFood, regions, userAnswer, posMapping = null) => {
  scene.input
    // 物件拖動事件
    .on('drag', (pointer, gameObject, dragX, dragY) => {
      // 更新物件的位置並移至最上層
      gameObject.setPosition(dragX, dragY);
      gameObject.depth = 1;
    })
    // 物件放置事件
    .on('dragend', (pointer, gameObject) => {
      const objName = gameObject.texture.key; // 從物件圖片鍵取得名稱      
      let place = null;
      gameObject.depth = 0;
      findToClean(userAnswer, objName);

      // 檢查並取得食物放置區域
      for (const region of regions) {
        // switch (gameType) {
        //   case 'class':
        //   case 'color':
        //     inArea = Phaser.Geom.Rectangle.Contains(region.bounds.getBounds(), gameObject.x, gameObject.y);
        //     break;
        //   default:
        //     console.error('GAMETYPE ERROR');
        // }

        // 若食物在特定區域範圍內
        if (Phaser.Geom.Rectangle.Contains(region.bounds.getBounds(), gameObject.x, gameObject.y)) {
          place = region.name; // 特定區域名稱
          // 檢驗食物與特定區域相符
          const verifyStatus = verification(gameType, objName, place);
          if (verifyStatus) {
            userAnswer[place].push(objName); // 使用者答案填入
            // 將食物放置到指定位置
            if (posMapping) {
              const posIndex = userAnswer[place].length - 1; // 取當前數量為索引
              setFoodObjectPosition(posMapping[place], gameObject, posIndex);
            }
            // 數量及答案正確則結束遊戲
            if (verifyAnswer(gameType, userAnswer, topicNum)) { endGame(scene, userAnswer); }
            else showResultView(scene, 'correct');
          }
          else {
            revertFoodPosition(gameObject);
            findToClean(userAnswer, objName);
            showResultView(scene, 'wrong');
          }
          // console.log(`${objName} in ${place}`, userAnswer); // 驗證用
          break;
        }
      }
      // 不在任何放置區域位置，則回到初始位置
      if (!place) revertFoodPosition(gameObject);
    });
}

// 取得隨機食物集
const getRandomFoods = (count = DefaultNumOfFood, RestrictionType = null) => {
  const selectedFoods = [];
  let isGameTypeForColor = false, isGameForPortionSize = false;

  // 特殊模式設置
  switch (RestrictionType) {
    case 'color_fruit_vegetable':
      isGameTypeForColor = true;
      break;
    case 'food_portion_size':
      isGameForPortionSize = true;
      if (count > totalPlateCount) count = totalPlateCount;
      break;
    default: break;
  }

  // 初始化放置
  const inital = () => {
    // 五大色蔬果各先隨機放入一個
    if (isGameTypeForColor) Object.values(colorSet).forEach(color => { selectedFoods.push(randomPickOne(color)) });
    // 六大類食物各先隨機放入一個
    else foodTypes.forEach(category => { selectedFoods.push(classRandomFood(category)); });
  }

  inital();
  // 補齊直至需求數量
  while (selectedFoods.length < count) {
    // 視情況隨機取一食物
    const ramFoo = isGameTypeForColor ? randomFood(fruitAndVeget) : randomFood();

    // 特殊情境處理:檢查是否符合數量限制
    if (isGameForPortionSize) {
      if (selectedFoods.length === totalPlateCount) break;
      const category = ramFoo.match(/[a-zA-Z]+/)[0];
      const currentCount = selectedFoods.filter(food => food.startsWith(category)).length;
      if (currentCount >= plateSet[category]) continue;
    }

    // 檢查重複性
    if (ramFoo && !selectedFoods.includes(ramFoo)) selectedFoods.push(ramFoo);

    // 最終檢查
    if (selectedFoods.length === count) {
      // 特殊情境處理:確保非顏色限定不會出現
      if (isGameTypeForColor) {
        // 檢查食物是否皆存在於 colorSet 的任一顏色類別中，並且每個顏色類別都至少有一個被選取
        const Correct =
          selectedFoods.every(food => { return Object.values(colorSet).flat().includes(food); })
          && Object.keys(colorSet).every(color => { return selectedFoods.some(food => colorSet[color].includes(food)); });
        if (!Correct) { selectedFoods.length = 0; inital(); };
      }
      if (isGameForPortionSize) {
        const foodCounts = foodTypes.map(category => {
          return {
            category: category,
            count: selectedFoods.filter(food => food.startsWith(category)).length
          };
        });
        // console.log(foodCounts);
      }
    }
  }
  return shuffleArray(selectedFoods);
}

// 取得輸入元件幾個參數
const getInteractiveAreaMetrics = (interactive) => {
  const Metrics = [
    interactive.x - .5 * interactive.width,
    interactive.x,
    interactive.x + .5 * interactive.width,
    interactive.y - .5 * interactive.height,
    interactive.y,
    interactive.y + .5 * interactive.height,
    interactive.width,
    interactive.height
  ];
  return Metrics;
}

// ************************************************** Action ************************************************** //

// 隨機食物
const randomFood = (foodtypes = foodTypes) => {
  // 隨機選擇一個食物類
  const randomType = foodtypes[Math.round(Math.random() * (foodtypes.length - 1))];
  return classRandomFood(randomType);
}

// 類別中隨機選一個
const classRandomFood = (category) => {
  const food = category + Math.round(Math.random() * (foodSet[category] - 1));
  return food;
}

// 從中隨機選擇一個
const randomPickOne = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const shuffleArray = (array) => {
  // 從最後一個元素開始迭代
  for (let i = array.length - 1; i > 0; i--) {
    // 產生一個從 0 到 i 之間的隨機索引
    const j = Math.floor(Math.random() * (i + 1));
    // 交換元素 array[i] 和 array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 淡入、出動畫
const fade = (scene, rect, image) => {
  // 淡入效果
  const tweenIn = scene.tweens.add({
    targets: image,
    alpha: 1,
    duration: 0,
    delay: 0,
    onComplete: () => {
      // 淡出效果
      const tweenOut = scene.tweens.add({
        targets: image,
        alpha: 0,
        duration: 500,
        delay: 2500,
        onComplete: () => {
          image.destroy();
          rect.destroy();
          tweenOut.remove();
        }
      });
      tweenIn.remove();
    }
  });
}

// 通用正確與錯誤介面
const showResultView = (scene, keyword) => {
  if (audio_effect_play) {
    const rect = scene.add.rectangle(GCX, GCY, WIDTH, HEIGHT, 0x0, 0.5).setInteractive();
    const image = scene.add.image(GCX, GCY, keyword).setDisplaySize(GCY, GCY);
    scene.sound.add(keyword).play();
    fade(scene, rect, image);
  }
}

// 檢查並清除特定值
const findToClean = (array, value) => {
  Object.values(array).some(arr => {
    const index = arr.indexOf(value);
    if (index != -1) { arr.splice(index, 1); return; }
  });
}

// 食物物件返回初始位置
const revertFoodPosition = (FoodObject) => {
  const { prevX, prevY } = FoodObject;
  FoodObject.setPosition(prevX, prevY);
}

// 食物物件特定位置設置
const setFoodObjectPosition = (PosMapping, FoodObject, PosIndex) => {
  if (PosMapping.length > PosIndex) {
    const position = PosMapping[PosIndex];
    FoodObject.setPosition(position.x, position.y);
    FoodObject.input.enabled = false;
  } else { revertFoodPosition(FoodObject); }
}

// 驗證物件放置正確性
const verification = (Method, objectName, Located) => {
  const verifyStatus =
    (Method === 'class' && Located === objectName.split(/[0-9]|1[0-9]+/)[0]) ||
    (Method === 'color' && colorSet && colorSet[Located].includes(objectName));
  return verifyStatus;
}

// 驗證用戶答案正確性
const verifyAnswer = (Method, UserAnswers, targetNum) => {
  // 計算總數
  const AnswerNum = Object.values(UserAnswers).reduce((total, category) => { return total + category.length; }, 0);
  if (AnswerNum === targetNum) {
    var numOfWrong = 0;
    // 檢驗答案是否有分類錯誤
    Object.entries(UserAnswers).forEach(([type, array]) => {
      array.forEach(obj => {
        if (!verification(Method, obj, type, colorSet)) { numOfWrong++; }
        else if (Method !== 'class' && Method !== 'color') { console.error('METHOD ERROR'); }
      });
    });
    return !numOfWrong;
  }
  return false;
}