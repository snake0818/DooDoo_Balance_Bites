const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('bg3', `${PATH_UI}/bg/bg_game3.png`);
    this.load.image('bg3-1', `${PATH_UI}/bg/bg_game3-1.png`);
    this.load.image('formula0', `${PATH_UI}/formulas/formula0.png`);
    this.load.image('formula1', `${PATH_UI}/formulas/formula1.png`);
    this.load.image('formula2', `${PATH_UI}/formulas/formula2.png`);
    this.load.image('formula3', `${PATH_UI}/formulas/formula3.png`);
    this.load.image('formula4', `${PATH_UI}/formulas/formula4.png`);
    this.load.image('formula5', `${PATH_UI}/formulas/formula5.png`);
    this.load.image('btn_formulaListPlay', `${PATH_UI}/buttons/btn_formula_list_play.png`);
    this.load.image('btn_gamePlay', `${PATH_UI}/buttons/btn_game_play.png`);
    this.load.image('btn_answer', `${PATH_UI}/buttons/btn_game_answer.png`);
    this.load.image('btn_next', `${PATH_UI}/buttons/btn_game_next.png`);
    this.load.audio('nut', `${PATH_Audio}/formulas/formula_nut_effect.m4a`);
    this.load.audio('dairy', `${PATH_Audio}/formulas/formula_dairy_effect.m4a`);
    this.load.audio('meat', `${PATH_Audio}/formulas/formula_meat_effect.m4a`);
    this.load.audio('fruit', `${PATH_Audio}/formulas/formula_fruit_effect.m4a`);
    this.load.audio('vegetable', `${PATH_Audio}/formulas/formula_vegetable_effect.m4a`);
    this.load.audio('grain', `${PATH_Audio}/formulas/formula_grain_effect.m4a`);
    this.load.audio('formulaList', `${PATH_Audio}/formulas/formula_list_effect.m4a`);
  },
  create: function () {
    const Size_image = 2 * imageSize; // 食物圖片大小
    const Size_BTN = 1.5 * imageSize; // 按鈕圖片大小
    const topic = 10; // 題目數量
    const foodlist = getRandomFoods(topic); // 隨機食物陣列
    let index; // 宣告用於顯示第幾個食物
    let image_food; // 宣告用於暫存食物圖片
    let image_formula; // 宣告圖片元素
    let audio_formula; // 宣告播放音效元素
    let audioSTATUS = false; // 宣告用於表示音訊播放狀態

    // 背景設置
    const bg = this.add.image(GCX, GCY, 'bg3').setDisplaySize(WIDTH, HEIGHT);

    // 播放口訣按鈕
    let btn_rumor_play = this.add.image(GCX - Size_BTN, 1.65 * GCY, 'btn_formulaListPlay').setDisplaySize(2 * Size_BTN, Size_BTN);
    btn_rumor_play.setInteractive().on('pointerdown', () => {
      // 若'沒有播放'狀態，則賦予新狀態並播放音訊
      if (!audioSTATUS) {
        audioSTATUS = true; // 賦予狀態
        audio_formula = this.sound.add('formulaList'); // 添加音訊
        audio_formula.play(); // 播放音訊
        // 播放完畢，清除狀態
        audio_formula.on('complete', () => { audioSTATUS = false; });
      }
    });

    // 開始遊玩按鈕
    let btn_game_play = this.add.image(GCX + Size_BTN, 1.65 * GCY, 'btn_gamePlay').setDisplaySize(2 * Size_BTN, Size_BTN);
    btn_game_play.setInteractive().on('pointerdown', () => {
      // 若'正在播放'狀態，則清除音訊及狀態
      if (audioSTATUS) { audio_formula.destroy(); audioSTATUS = false; }
      // 更換背景
      bg.setTexture('bg3-1');
      // 清除按鈕
      btn_rumor_play.destroy();
      btn_game_play.destroy();
      // 執行開始遊戲函式
      game_play();
    });

    // /************************************************ 物件設置部分 ************************************************/

    // 食物物件
    const setFood = () => {      
      // 若所有食物都已播放完畢則結束遊戲
      if (++index === topic) { endGame(this); return; }
      completed = false; // 重置唸謠完成狀態
      // 設置食物圖片
      image_food = this.add.image(GCX, .7 * GCY, foodlist[index])
      image_food.setDisplaySize((image_food.width / image_food.height) * Size_image, Size_image);
      // 設置對應食物之唸謠文字圖片
      const types = Object.keys(foodSet);
      const foodType = foodlist[index].split(/[0-9]|1[0-9]+/)[0];
      const typeIndex = types.indexOf(foodType);
      image_formula = this.add.image(GCX, 1.19 * GCY, `formula${typeIndex}`).setDisplaySize(2.5 * Size_image, .6 * Size_image).setVisible(false);
      // 設置對應食物之唸謠音效
      audio_formula = this.sound.add(foodType);
    }

    const game_play = () => {
      index = -1; // 初始化 index
      setFood(); // 執行顯示食物物件函式

      // 定義"解答"按鈕元件及其點擊事件
      const BTN_answer = this.add.image(GCX - Size_BTN, 1.5 * GCY, 'btn_answer').setDisplaySize(2 * Size_BTN, Size_BTN);
      BTN_answer.setInteractive().on('pointerdown', (pointer) => {
        // 若'沒有播放'狀態
        if (!audioSTATUS) {
          image_formula.setVisible(true); // 顯示唸謠文字圖片
          audioSTATUS = true; // 賦予狀態
          audio_formula.play(); // 播放音訊
          // 播放完畢，清除狀態
          audio_formula.on('complete', () => { audioSTATUS = false; });
        }
      });

      // 定義"下一個"按鈕元件及其點擊事件
      const BTN_next = this.add.image(GCX + Size_BTN, 1.5 * GCY, 'btn_next').setDisplaySize(2 * Size_BTN, Size_BTN);
      BTN_next.setInteractive().on('pointerdown', (pointer) => {
        // 清除當前食物相關之元件
        image_food.destroy();
        image_formula.destroy();
        audio_formula.destroy();
        audioSTATUS = false;
        // 設置新食物
        setFood();
      });
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: 'app',
  scene: [gameStart,]
}
const game = new Phaser.Game(config);