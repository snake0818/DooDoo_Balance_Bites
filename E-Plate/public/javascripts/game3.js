const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('rumor0', `${ResourcePATH}/images/ui/rumors/rumor0.png`);
    this.load.image('rumor1', `${ResourcePATH}/images/ui/rumors/rumor1.png`);
    this.load.image('rumor2', `${ResourcePATH}/images/ui/rumors/rumor2.png`);
    this.load.image('rumor3', `${ResourcePATH}/images/ui/rumors/rumor3.png`);
    this.load.image('rumor4', `${ResourcePATH}/images/ui/rumors/rumor4.png`);
    this.load.image('rumor5', `${ResourcePATH}/images/ui/rumors/rumor5.png`);
    this.load.image('rumors', `${ResourcePATH}/images/ui/rumors/rumors.png`);
    this.load.image('alert', `${ResourcePATH}/images/ui/click_to_continue.png`);
    this.load.image('rumor_btn', `${ResourcePATH}/images/ui/rumor_btn.png`);
    this.load.audio('nut', `${ResourcePATH}/audios/rumors/rumor_nut_effect.m4a`);
    this.load.audio('milk', `${ResourcePATH}/audios/rumors/rumor_milk_effect.m4a`);
    this.load.audio('meat', `${ResourcePATH}/audios/rumors/rumor_meat_effect.m4a`);
    this.load.audio('fruit', `${ResourcePATH}/audios/rumors/rumor_fruit_effect.m4a`);
    this.load.audio('vegetable', `${ResourcePATH}/audios/rumors/rumor_vegetable_effect.m4a`);
    this.load.audio('grain', `${ResourcePATH}/audios/rumors/rumor_grain_effect.m4a`);
    this.load.audio('all_rumor', `${ResourcePATH}/audios/rumors/rumors_effect.m4a`);
  },
  create: function () {

    // /************************************************ 物件設置部分 ************************************************/
    const imageSize = 0.35 * h; // 食物圖片大小
    const foodlist = getRandomFoods(numOfFood); // 隨機食物陣列
    let index; // 宣告用於顯示第幾個食物
    let food; // 宣告用於暫存食物圖片
    let rumor;  // 宣告用於暫存唸謠圖片
    let rumorEffect; // 宣告播放音效元素
    let EffectCompleted = true; // 宣告用於表示音效播放狀態
    let completed = false; // 宣告用於表示該食物唸謠已完成
    // 提示使用者點擊畫面已進入下一階段之文字圖示
    const alert_img = this.add.image(cx, 0.95 * h, 'alert').setDisplaySize(0.75 * cx, 0.25 * imageSize).setVisible(false);

    const show_rumors_collection = () => {
      // 顯示唸謠總圖
      const rumorsCollection = this.add.image(cx, 0.875 * cy, 'rumors').setDisplaySize(0.8 * cx, 0.8 * h);
      // 顯示按鈕
      const rumorsBtns = this.add.image(cx, 0.925 * h, 'rumor_btn').setDisplaySize(0.35 * w, 0.25 * cy);
      // 按鈕區域點擊元素
      const effect_btn = this.add.rectangle(rumorsBtns.x - rumorsBtns.width / 1.9, rumorsBtns.y, rumorsBtns.width / 1.15, rumorsBtns.height / 0.6).setInteractive();
      const continue_btn = this.add.rectangle(rumorsBtns.x + rumorsBtns.width / 1.9, rumorsBtns.y, rumorsBtns.width / 1.15, rumorsBtns.height / 0.6).setInteractive();

      // '播放音效'按鈕點擊事件
      effect_btn.on('pointerdown', (pointer) => {
        if (EffectCompleted) {
          EffectCompleted = false;
          rumorEffect = this.sound.add('all_rumor');
          rumorEffect.play();
          rumorEffect.on('complete', () => { EffectCompleted = true; });
        }
      });

      // '開始遊玩'按鈕點擊事件
      continue_btn.on('pointerdown', (pointer) => {
        // 清除唸謠總圖及按鈕圖與其點擊區域元素
        rumorsCollection.destroy();
        rumorsBtns.destroy();
        effect_btn.destroy();
        continue_btn.destroy();
        // 如果正在播放音效則清除並重置紀錄
        if (!EffectCompleted) {
          rumorEffect.destroy();
          EffectCompleted = true;
        }
        // 執行開始遊戲函式
        game_play();
      });
    }

    // 食物物件
    // this.add.rectangle(cx, 0.33 * h, 0.3 * w, 0.4 * h, 0x888888);
    const setFood = () => {
      // 若所有食物都已播放完畢則結束遊戲
      if (++index === numOfFood) { endgame(this);return; }
      // 重置唸謠完成狀態
      completed = false;
      // 設置食物圖片
      food = this.add.image(cx, 0.33 * h, foodlist[index]);
      food.setDisplaySize((food.width / food.height) * imageSize, imageSize);
      // 設置對應食物之唸謠文字圖片
      const types = Object.keys(foodset);
      const foodType = foodlist[index].split(/[0-9]|1[0-9]+/)[0];
      const typeIndex = types.indexOf(foodType);
      rumor = this.add.image(0.5 * w, 0.75 * h, `rumor${typeIndex}`).setDisplaySize(3.3 * imageSize, imageSize / 1.3).setVisible(false);
      // 設置對應食物之唸謠音效
      rumorEffect = this.sound.add(foodType);
      // 顯示提示文字圖片
      alert_img.setVisible(true);
    }

    const game_play = () => {
      index = -1; // 初始化 index
      setFood(); // 執行顯示食物物件函式

      // 定義互動元素及其點擊事件
      screen = this.add.rectangle(cx, cy, w, h, 0xffffff, 0).setInteractive();
      screen.on('pointerdown', (pointer) => {
        if (EffectCompleted) {
          if (!completed) {
            rumor.setVisible(true); // 顯示唸謠文字圖片
            alert_img.setVisible(false); // 隱藏提示文字圖片
            EffectCompleted = false; // 將要播放音效，賦予狀態
            rumorEffect.play(); // 播放音效
            rumorEffect.on('complete', () => {
              EffectCompleted = true; // 音效播放完畢，賦予狀態
              completed = true; // 該食物唸謠完畢，賦予狀態
              alert_img.setVisible(true); // 顯示提示文字圖片
            });
          } else {
            // 清除當前食物相關之元件
            rumor.destroy();
            food.destroy();
            alert_img.setVisible(false); // 隱藏提示文字圖片
            setFood();
          }
        }
      });
    }

    show_rumors_collection();
  },
  update: function () {
    // 遊戲狀態更新
  }
}

const config = {
  type: Phaser.AUTO,
  width: w,
  height: h,
  parent: 'app',
  scene: [gameStart,]
}
const game = new Phaser.Game(config);