let userClassAnswer = { nut: [], dairy: [], meat: [], vegetable: [], fruit: [], grain: [] };
let userColorAnswer = { red: [], gre: [], whi: [], o_y: [], i_d: [] };

const game1 = {
  key: 'game1',
  preload: function () {
    this.load.image('bg1', `${PATH_UI}/bg/bg_game1.png`)
    this.load.image('nut', `${PATH_UI}/types/nuts.png`);
    this.load.image('dairy', `${PATH_UI}/types/dairy.png`);
    this.load.image('meat', `${PATH_UI}/types/meats.png`);
    this.load.image('vegetable', `${PATH_UI}/types/vegetables.png`);
    this.load.image('fruit', `${PATH_UI}/types/fruits.png`);
    this.load.image('grain', `${PATH_UI}/types/grains.png`);
    this.load.audio('guide1', `${PATH_Audio}/guides/guide1.m4a`);
  },
  create: function () {
    // 背景設置
    this.add.image(GCX, GCY, 'bg1').setDisplaySize(WIDTH, HEIGHT);
    // 互動區域設置
    const interactive = this.add.rectangle(GCX, 1.05 * GCY, .72 * WIDTH, .7 * HEIGHT, DefaultCOLOR, BGV).setDepth(Interactive_Depth);
    const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = getInteractiveAreaMetrics(interactive);

    setBackMenuScene(this);

    // /************************************************ 物件設置部分 ************************************************/
    const foodlist = getRandomFoods();
    const foodArr = [];

    // 食物分類區域
    const [region_W, region_H] = [.3 * IA_W, .3 * IA_H];
    const typeRegions = [
      { bounds: null, name: 'nut', },
      { bounds: null, name: 'dairy', },
      { bounds: null, name: 'meat', },
      { bounds: null, name: 'vegetable', },
      { bounds: null, name: 'fruit', },
      { bounds: null, name: 'grain', },
    ];
    for (let i = 0; i < typeRegions.length; i++) {
      const dx = (i < 3) ? IA_x + .5 * region_W : IA_X - .5 * region_W;
      const dy = .35 * IA_H * (i % 3);
      typeRegions[i].bounds = this.add.image(dx, IA_y + .5 * region_H + dy, typeRegions[i].name).setDisplaySize(region_W, region_H).setOrigin(.5);
    }

    // 食物區域
    const LConfig = {
      x: IA_cx,
      y: IA_cy,
      width: .35 * IA_W,
      heigh: IA_H
    };
    foodArea(this, foodArr, foodlist, LConfig);

    guide(this, 'guide1');

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'class', undefined, typeRegions, userClassAnswer, null); // 添加拖動事件
  }
}

const game2 = {
  key: 'game2',
  preload: function () {
    this.load.image('bg2', `${PATH_UI}/bg/bg_game2.png`);
    this.load.image('plateT', `${PATH_UI}/plate_type.png`);
    this.load.audio('guide2', `${PATH_Audio}/guides/guide2.m4a`);
  },
  create: function () {
    // 背景設置
    this.add.image(GCX, GCY, 'bg2').setDisplaySize(WIDTH, HEIGHT);
    // 互動區域設置
    const interactive = this.add.rectangle(GCX, 1.07 * GCY, .88 * WIDTH, .7 * HEIGHT, DefaultCOLOR, BGV).setDepth(Interactive_Depth);
    const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = getInteractiveAreaMetrics(interactive);

    setBackMenuScene(this);

    // /************************************************ 物件設置部分 ************************************************/
    const foodlist = getRandomFoods();
    const foodArr = [];

    // 食物分類區域
    const [pw, ph] = [.7 * IA_W, IA_H];
    const plate = this.add.image(IA_x + .5 * pw, IA_cy, 'plateT').setDisplaySize(pw, ph);
    const typeRegions = [
      { name: 'nut', bounds: this.add.rectangle(IA_x + .615 * pw, .635 * IA_cy, .22 * pw, .22 * ph, DefaultCOLOR, SHOW), text: '堅果類' },
      { name: 'dairy', bounds: this.add.rectangle(IA_x + .84 * pw, .635 * IA_cy, .15 * pw, .22 * ph, DefaultCOLOR, SHOW), text: '乳品類' },
      { name: 'meat', bounds: this.add.rectangle(IA_x + .716 * pw, 1.015 * IA_cy, .42 * pw, .27 * ph, DefaultCOLOR, SHOW), text: '豆魚蛋肉類' },
      { name: 'fruit', bounds: this.add.rectangle(IA_x + .716 * pw, 1.445 * IA_cy, .42 * pw, .3 * ph, DefaultCOLOR, SHOW), text: '水果類' },
      { name: 'grain', bounds: this.add.rectangle(IA_x + .115 * pw, 1.065 * IA_cy, .22 * pw, .9 * ph, DefaultCOLOR, SHOW), text: '全榖雜糧類' },
      { name: 'vegetable', bounds: this.add.rectangle(IA_x + .365 * pw, 1.065 * IA_cy, .22 * pw, .9 * ph, DefaultCOLOR, SHOW), text: '蔬果類' },
    ];

    // 食物區域
    const LConfig = {
      x: IA_X - .135 * IA_W,
      y: IA_cy,
      width: .27 * IA_W,
      heigh: IA_H
    };
    foodArea(this, foodArr, foodlist, LConfig);

    guide(this, 'guide2');

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'class', undefined, typeRegions, userClassAnswer, null); // 添加拖動事件
  }
}

const game3 = {
  key: 'game3',
  preload: function () {
    this.load.image('bg3', `${PATH_UI}/bg/bg_game3.png`);
    this.load.image('bg3-1', `${PATH_UI}/bg/bg_game3-1.png`);
    this.load.image('formula0', `${PATH_UI}/formulas/formula0.png`);
    this.load.image('formula1', `${PATH_UI}/formulas/formula1.png`);
    this.load.image('formula2', `${PATH_UI}/formulas/formula2.png`);
    this.load.image('formula3', `${PATH_UI}/formulas/formula3.png`);
    this.load.image('formula4', `${PATH_UI}/formulas/formula4.png`);
    this.load.image('formula5', `${PATH_UI}/formulas/formula5.png`);
    this.load.image('formulaList0', `${PATH_UI}/formulas/formula_list0.png`);
    this.load.image('formulaList1', `${PATH_UI}/formulas/formula_list1.png`);
    this.load.image('formulaList2', `${PATH_UI}/formulas/formula_list2.png`);
    this.load.image('formulaList3', `${PATH_UI}/formulas/formula_list3.png`);
    this.load.image('formulaList4', `${PATH_UI}/formulas/formula_list4.png`);
    this.load.image('formulaList5', `${PATH_UI}/formulas/formula_list5.png`);
    this.load.image('formulaList6', `${PATH_UI}/formulas/formula_list6.png`);
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
    this.load.audio('guide3', `${PATH_Audio}/guides/guide3.m4a`);
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
    const formula = this.add.image(GCX, GCY - .01 * HEIGHT, 'formulaList0').setDisplaySize(.38 * WIDTH, .53 * HEIGHT);

    // 播放口訣按鈕
    let btn_rumor_play = this.add.image(GCX - Size_BTN, 1.65 * GCY, 'btn_formulaListPlay').setDisplaySize(2 * Size_BTN, Size_BTN);
    setCursor(this, btn_rumor_play);
    btn_rumor_play.setInteractive().on('pointerdown', () => {
      // 若'沒有播放'狀態，則賦予新狀態並播放音訊
      if (!audioSTATUS && audio_effect_play) {
        audioSTATUS = true; // 賦予狀態
        audio_formula = this.sound.add('formulaList', { volume: audio_volume }); // 添加音訊
        audio_formula
          .on('play', () => {
            let formulaStatus = 0;
            const timer = this.time.addEvent({
              delay: 100,
              loop: true,
              callback: () => {
                let status = formulaStatus;
                const currentTime = audio_formula.seek * 1000; // 當前播放時間（毫秒）
                const current = Math.floor(currentTime / 100);
                
                switch (current) {
                  case 63:
                    status = 1;
                    break;
                  case 110:
                    status = 2;
                    break;
                  case 157:
                    status = 3;
                    break;
                  case 203:
                    status = 4;
                    break;
                  case 248:
                    status = 5;
                    break;
                  case 292:
                    status = 6;
                    break;
                  case 337:
                    status = 0;
                    break;
                  default:
                    break;
                }
                if (status != formulaStatus) {
                  formula.setTexture(`formulaList${status}`);
                  formulaStatus = status;
                }

                if (!audio_formula.isPlaying) { timer.remove(); } // 如果音效播放完畢，則停止定時器
              }
            });
          })
          .on('complete', () => { audioSTATUS = false; }); // 播放完畢，清除狀態
        audio_formula.play(); // 播放音訊
      }
    });
    // 開始遊玩按鈕
    let btn_game_play = this.add.image(GCX + Size_BTN, 1.65 * GCY, 'btn_gamePlay').setDisplaySize(2 * Size_BTN, Size_BTN);
    setCursor(this, btn_game_play);
    btn_game_play.setInteractive().on('pointerdown', () => {
      // 若'正在播放'狀態，則清除音訊及狀態
      if (audioSTATUS) { audio_formula.destroy(); audioSTATUS = false; }
      // 更換背景
      bg.setTexture('bg3-1').setDisplaySize(WIDTH, HEIGHT);
      formula.destroy();
      // 清除按鈕
      btn_rumor_play.destroy();
      btn_game_play.destroy();
      // 執行開始遊戲函式
      game_play();
    });

    guide(this, 'guide3');

    setBackMenuScene(this);

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
      const types = foodTypes;
      const foodType = foodlist[index].split(/[0-9]|1[0-9]+/)[0];
      const typeIndex = types.indexOf(foodType);
      image_formula = this.add.image(GCX, 1.19 * GCY, `formula${typeIndex}`).setDisplaySize(2.5 * Size_image, .6 * Size_image).setVisible(false);
      // 設置對應食物之唸謠音效
      audio_formula = this.sound.add(foodType, { volume: audio_volume });
    }

    // 唸謠遊戲
    const game_play = () => {
      index = -1; // 初始化 index
      setFood(); // 執行顯示食物物件函式

      // 定義"解答"按鈕元件及其點擊事件
      const BTN_answer = this.add.image(GCX - Size_BTN, 1.5 * GCY, 'btn_answer').setDisplaySize(2 * Size_BTN, Size_BTN);
      setCursor(this, BTN_answer);
      BTN_answer.setInteractive().on('pointerdown', (pointer) => {
        // 若'沒有播放'狀態
        if (!audioSTATUS && audio_effect_play) {
          image_formula.setVisible(true); // 顯示唸謠文字圖片
          audioSTATUS = true; // 賦予狀態
          audio_formula.play(); // 播放音訊
          // 播放完畢，清除狀態
          audio_formula.on('complete', () => { audioSTATUS = false; });
        }
      });

      // 定義"下一個"按鈕元件及其點擊事件
      const BTN_next = this.add.image(GCX + Size_BTN, 1.5 * GCY, 'btn_next').setDisplaySize(2 * Size_BTN, Size_BTN);
      setCursor(this, BTN_next);
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

const game4 = {
  key: 'game4',
  preload: function () {
    this.load.image('bg4', `${PATH_UI}/bg/bg_game4.png`)
    this.load.image('red', `${PATH_UI}/colors/red.png`);
    this.load.image('gre', `${PATH_UI}/colors/green.png`);
    this.load.image('whi', `${PATH_UI}/colors/white.png`);
    this.load.image('o_y', `${PATH_UI}/colors/orange_and_yellow.png`);
    this.load.image('i_d', `${PATH_UI}/colors/blue_and_purple.png`);
    this.load.audio('guide4', `${PATH_Audio}/guides/guide4.m4a`);
  },
  create: function () {
    // 背景設置
    this.add.image(GCX, GCY, 'bg4').setDisplaySize(WIDTH, HEIGHT);
    // 互動區域設置
    const interactive = this.add.rectangle(GCX, 1.05 * GCY, .72 * WIDTH, .7 * HEIGHT, DefaultCOLOR, BGV).setDepth(Interactive_Depth);
    const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = getInteractiveAreaMetrics(interactive);

    setBackMenuScene(this);

    // /************************************************ 物件設置部分 ************************************************/
    const foodlist = getRandomFoods(undefined, 'color_fruit_vegetable');
    const foodArr = [];

    // 食物分類區域
    const [region_W, region_H] = [.3 * IA_W, .3 * IA_H];
    const typeRegions = [
      { bounds: null, name: 'red' },
      { bounds: null, name: 'gre' },
      { bounds: null, name: 'whi' },
      { bounds: null, name: 'o_y' },
      { bounds: null, name: 'i_d' },
    ];
    for (let i = 0; i < typeRegions.length; i++) {
      const dx = (i < 3) ? IA_x + .5 * region_W : IA_X - .5 * region_W;
      const dy = .35 * IA_H * (i % 3) + .175 * IA_H * Math.floor(i / 3);
      typeRegions[i].bounds = this.add.image(dx, IA_y + .5 * region_H + dy, typeRegions[i].name).setDisplaySize(region_W, region_H).setOrigin(.5);
    }

    // 食物區域
    const LConfig = {
      x: IA_cx,
      y: IA_cy,
      width: .35 * IA_W,
      heigh: IA_H
    };
    foodArea(this, foodArr, foodlist, LConfig);

    guide(this, 'guide4');

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'color', undefined, typeRegions, userColorAnswer, null); // 添加拖動事件
  }
}

const game5 = {
  key: 'game5',
  preload: function () {
    this.load.image('bg5', `${PATH_UI}/bg/bg_game5.png`)
    this.load.image('body', `${PATH_UI}/body.png`);
    this.load.image('red', `${PATH_UI}/colors/red2.png`);
    this.load.image('gre', `${PATH_UI}/colors/green2.png`);
    this.load.image('whi', `${PATH_UI}/colors/white2.png`);
    this.load.image('o_y', `${PATH_UI}/colors/orange_and_yellow2.png`);
    this.load.image('i_d', `${PATH_UI}/colors/blue_and_purple2.png`);
    this.load.audio('red', `${PATH_Audio}/colors/red_effect.m4a`);
    this.load.audio('gre', `${PATH_Audio}/colors/green_effect.m4a`);
    this.load.audio('whi', `${PATH_Audio}/colors/white_effect.m4a`);
    this.load.audio('o_y', `${PATH_Audio}/colors/orange_effect.m4a`);
    this.load.audio('i_d', `${PATH_Audio}/colors/indigo_effect.m4a`);
    this.load.audio('guide5', `${PATH_Audio}/guides/guide5.m4a`);
  },
  create: function () {
    // 背景設置
    this.add.image(GCX, GCY, 'bg5').setDisplaySize(WIDTH, HEIGHT);
    // 互動區域設置
    const interactive = this.add.rectangle(GCX, 1.07 * GCY, .88 * WIDTH, .7 * HEIGHT, DefaultCOLOR, BGV).setDepth(Interactive_Depth);
    const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = getInteractiveAreaMetrics(interactive);

    setBackMenuScene(this);

    // /************************************************ 物件設置部分 ************************************************/
    const foodlist = getRandomFoods(undefined, 'color_fruit_vegetable');
    const foodArr = [];
    let EffectCompleted = true;

    // 食物分類區域
    const [region_W, region_H] = [.22 * IA_W, .28 * IA_H];
    const typeRegions = [
      { name: 'o_y', bounds: null },
      { name: 'whi', bounds: null },
      { name: 'i_d', bounds: null },
      { name: 'red', bounds: null },
      { name: 'gre', bounds: null },
    ];
    for (let i = 0; i < typeRegions.length; i++) {
      const dx = (i < 3) ? IA_x : IA_cx;
      const dy = .36 * IA_H * (i % 3);
      typeRegions[i].bounds = this.add.image(dx + .5 * region_W, IA_y + .5 * region_H + dy, typeRegions[i].name).setDisplaySize(region_W, region_H).setOrigin(.5);
    }

    // 每個區域添加互動
    typeRegions.forEach(region => {
      region.bounds.setDisplaySize(region_W, region_H).setOrigin(.5);
      // 設置區域為可交互並添加點擊事件
      region.bounds.setInteractive().on('pointerdown', (pointer) => {
        if (EffectCompleted) {
          const soundEffect = this.sound.add(region.name, { volume: audio_volume })
          EffectCompleted = false;
          soundEffect.play();
          soundEffect.on('complete', () => { EffectCompleted = true; })
        }
      });
    });

    // 食物區域
    const LConfig = {
      x: IA_X - .135 * IA_W,
      y: IA_cy,
      width: .27 * IA_W,
      heigh: IA_H
    };
    foodArea(this, foodArr, foodlist, LConfig);

    guide(this, 'guide5');

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'color', undefined, typeRegions, userColorAnswer, null); // 添加拖動事件
  }
}

const game6 = {
  key: 'game6',
  preload: function () {
    this.load.image('bg6', `${PATH_UI}/bg/bg_game6.png`);
    this.load.image('plateF', `${PATH_UI}/plate_full.png`);
    this.load.audio('guide6', `${PATH_Audio}/guides/guide6.m4a`);
  },
  create: function () {
    // 背景設置
    this.add.image(GCX, GCY, 'bg6').setDisplaySize(WIDTH, HEIGHT);
    // 互動區域設置
    const interactive = this.add.rectangle(GCX, 1.07 * GCY, .88 * WIDTH, .7 * HEIGHT, DefaultCOLOR, BGV).setDepth(Interactive_Depth);
    const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = getInteractiveAreaMetrics(interactive);

    setBackMenuScene(this);

    // /************************************************ 物件設置部分 ************************************************/
    // 食物分類區域
    const [pw, ph] = [.7 * IA_W, IA_H];
    const plate = this.add.image(IA_x + .5 * pw, IA_cy, 'plateF').setDisplaySize(pw, ph);
    const typeRegions = [
      {
        bounds: this.add.rectangle(IA_x + .615 * pw, .635 * IA_cy, .22 * pw, .22 * ph, DefaultCOLOR, SHOW),
        name: 'nut', text: '堅果類'
      },
      {
        bounds: this.add.rectangle(IA_x + .84 * pw, .635 * IA_cy, .15 * pw, .22 * ph, DefaultCOLOR, SHOW),
        name: 'dairy', text: '乳品類'
      },
      {
        bounds: this.add.rectangle(IA_x + .716 * pw, 1.015 * IA_cy, .42 * pw, .27 * ph, DefaultCOLOR, SHOW),
        name: 'meat', text: '豆魚蛋肉類'
      },
      {
        bounds: this.add.rectangle(IA_x + .716 * pw, 1.445 * IA_cy, .42 * pw, .3 * ph, DefaultCOLOR, SHOW),
        name: 'fruit', text: '水果類'
      },
      {
        bounds: this.add.rectangle(IA_x + .115 * pw, 1.065 * IA_cy, .22 * pw, .9 * ph, DefaultCOLOR, SHOW),
        name: 'grain', text: '全榖雜糧類'
      },
      {
        bounds: this.add.rectangle(IA_x + .365 * pw, 1.065 * IA_cy, .22 * pw, .9 * ph, DefaultCOLOR, SHOW),
        name: 'vegetable', text: '蔬果類'
      },
    ];

    // 定義特定放置位置
    const positionMapping = {
      'nut': [
        {
          x: typeRegions[0].bounds.x - .05 * typeRegions[0].bounds.width,
          y: typeRegions[0].bounds.y - .2 * typeRegions[0].bounds.height,
          sizeMulti: .6
        },],
      'dairy': [
        {
          x: typeRegions[1].bounds.x,
          y: typeRegions[1].bounds.y - .25 * typeRegions[1].bounds.height,
          sizeMulti: undefined
        },
        {
          x: typeRegions[1].bounds.x,
          y: typeRegions[1].bounds.y + .25 * typeRegions[1].bounds.height,
          sizeMulti: undefined
        },],
      'meat': [
        {
          x: typeRegions[2].bounds.x - .275 * typeRegions[2].bounds.width,
          y: typeRegions[2].bounds.y + .2 * typeRegions[2].bounds.height,
          sizeMulti: undefined
        },
        {
          x: typeRegions[2].bounds.x,
          y: typeRegions[2].bounds.y + .2 * typeRegions[2].bounds.height,
          sizeMulti: undefined
        },
        {
          x: typeRegions[2].bounds.x + .275 * typeRegions[2].bounds.width,
          y: typeRegions[2].bounds.y + .2 * typeRegions[2].bounds.height,
          sizeMulti: undefined
        },],
      'fruit': [
        {
          x: typeRegions[3].bounds.x - .2 * typeRegions[3].bounds.width,
          y: typeRegions[3].bounds.y + .1 * typeRegions[3].bounds.height,
          sizeMulti: undefined
        },
        {
          x: typeRegions[3].bounds.x + .15 * typeRegions[3].bounds.width,
          y: typeRegions[3].bounds.y + .1 * typeRegions[3].bounds.height,
          sizeMulti: undefined
        },],
      'grain': [
        {
          x: typeRegions[4].bounds.x,
          y: typeRegions[4].bounds.y - .05 * typeRegions[4].bounds.height,
          sizeMulti: undefined
        },
        {
          x: typeRegions[4].bounds.x,
          y: typeRegions[4].bounds.y + .15 * typeRegions[4].bounds.height,
          sizeMulti: undefined
        },
        {
          x: typeRegions[4].bounds.x,
          y: typeRegions[4].bounds.y + .35 * typeRegions[4].bounds.height,
          sizeMulti: undefined
        },],
      'vegetable': [
        {
          x: typeRegions[5].bounds.x,
          y: typeRegions[5].bounds.y - .05 * typeRegions[5].bounds.height,
          sizeMulti: undefined
        },
        {
          x: typeRegions[5].bounds.x,
          y: typeRegions[5].bounds.y + .15 * typeRegions[5].bounds.height,
          sizeMulti: undefined
        },
        {
          x: typeRegions[5].bounds.x,
          y: typeRegions[5].bounds.y + .35 * typeRegions[5].bounds.height,
          sizeMulti: undefined
        },],
    }
    const topic = 14;
    const foodlist = getRandomFoods(topic, 'food_portion_size');
    const foodArr = [];

    // 食物區域    
    const LConfig = {
      x: IA_X - .162 * IA_W,
      y: IA_cy,
      width: .325 * IA_W,
      heigh: IA_H
    };
    foodArea(this, foodArr, foodlist, LConfig);

    guide(this, 'guide6');

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'class', topic, typeRegions, userClassAnswer, positionMapping); // 添加拖動事件
  }
}

const MainMenu = {
  key: 'MainMenu',
  preload: function () {
    // 設置加載進度文字
    const loadingText = this.add.text(GCX, GCY, 'Loading...', {
      fontSize: .1 * WIDTH,
      fill: '0x000000',
      fontFamily: 'Times New Roman'
    }).setOrigin(0.5, 0.5);
    // 監聽加載進度變化
    this.load.on('progress', (value) => { loadingText.setText(`Loading... ${Math.floor(value * 100)}`); });
    // 監聽加載完成事件
    this.load.on('complete', () => { loadingText.setText('Loading complete!'); loadingText.destroy(); });

    // 加載資源
    if (this.firstGuidePlayed === undefined) { this.firstGuidePlayed = false; }
    GeneralPreload(this);
    this.load.image('bg', `${PATH_UI}/bg/bg_game_menu.png`)
    this.load.image('btn_gameStart', `${PATH_UI}/buttons/btn_game_start.png`);
    this.load.image('btn_game1', `${PATH_UI}/buttons/btn_game1.png`);
    this.load.image('btn_game2', `${PATH_UI}/buttons/btn_game2.png`);
    this.load.image('btn_game3', `${PATH_UI}/buttons/btn_game3.png`);
    this.load.image('btn_game4', `${PATH_UI}/buttons/btn_game4.png`);
    this.load.image('btn_game5', `${PATH_UI}/buttons/btn_game5.png`);
    this.load.image('btn_game6', `${PATH_UI}/buttons/btn_game6.png`);
    this.load.audio('audio_title1', `${PATH_Audio}/titles/game_title1.m4a`);
    this.load.audio('audio_title2', `${PATH_Audio}/titles/game_title2.m4a`);
    this.load.audio('audio_title3', `${PATH_Audio}/titles/game_title3.m4a`);
    this.load.audio('audio_title4', `${PATH_Audio}/titles/game_title4.m4a`);
    this.load.audio('audio_title5', `${PATH_Audio}/titles/game_title5.m4a`);
    this.load.audio('audio_title6', `${PATH_Audio}/titles/game_title6.m4a`);
    this.load.audio('audio_start', `${PATH_Audio}/guides/guide_start.m4a`);
    this.load.audio('audio_select', `${PATH_Audio}/guides/guide_game_select.m4a`);
  },
  create: function () {
    const Size_BTN = 1.5 * imageSize; // 按鈕圖片大小
    // 設置背景
    const bg = this.add.image(GCX, GCY, 'start').setDisplaySize(WIDTH, HEIGHT);

    // 定義選擇遊戲
    const selectGame = () => {
      let audio; // 宣告播放音效元素
      let audioSTATUS = false; // 宣告用於表示音訊播放狀態

      // 背景設置
      bg.setTexture('bg').setDisplaySize(WIDTH, HEIGHT);

      if (!this.firstGuidePlayed) guide(this, 'audio_select', true);
      this.firstGuidePlayed = true;

      // 互動區域設置
      const interactive = this.add.rectangle(GCX, GCY, .75 * WIDTH, .4 * HEIGHT, DefaultCOLOR, SHOW).setDepth(Interactive_Depth);
      const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = [
        interactive.x - .5 * interactive.width,
        interactive.x,
        interactive.x + .5 * interactive.width,
        interactive.y - .5 * interactive.height,
        interactive.y,
        interactive.y + .5 * interactive.height,
        interactive.width,
        interactive.height
      ];
      // 選擇遊戲按鈕設置
      const [btn_w, btn_h] = [.3 * IA_W, .4 * IA_H];
      const typeRegions = [
        { bounds: null, name: 'game1', value: 1 },
        { bounds: null, name: 'game2', value: 2 },
        { bounds: null, name: 'game3', value: 3 },
        { bounds: null, name: 'game4', value: 4 },
        { bounds: null, name: 'game5', value: 5 },
        { bounds: null, name: 'game6', value: 6 },
      ];
      for (let i = 0; i < typeRegions.length; i++) {
        const dx = IA_x + .375 * IA_W * (i % 3) + .5 * btn_w;
        const dy = (i < 3) ? IA_y + .6 * btn_h : IA_Y - .6 * btn_h;
        typeRegions[i].bounds = this.add.image(dx, dy, `btn_${typeRegions[i].name}`).setDisplaySize(btn_w, btn_h);
        setCursor(this, typeRegions[i].bounds);
        // 點擊事件
        typeRegions[i].bounds.setInteractive()
          .on('pointerup', () => {
            // 確保沒有播放音訊
            if (audioSTATUS) {
              audio.stop();
              audio.destroy();
              audioSTATUS = false;
            }
            // 清除當前情境之元件
            interactive.destroy();
            typeRegions.forEach(element => { element.bounds.destroy(); });
            GamingName = typeRegions[i].name;
            // 啟用指定遊戲場景
            this.scene.start(GamingName);
            GamingID = GamingName;
          })
          .on('pointerover', () => {
            if (!audioSTATUS && audio_effect_play) {
              audioSTATUS = true;
              // 播放音效
              audio = this.sound.add(`audio_title${i + 1}`, { volume: audio_volume });
              audio.play();

              // 音效播放結束
              audio.on('complete', () => {
                audioSTATUS = false;
              });
            }
          });
      }
    }

    if (!this.firstGuidePlayed) {
      // 設置'開始遊戲'按鈕
      this.time.delayedCall(100, () => {
        const btn_game_start = this.add.image(GCX, 1.45 * GCY, 'btn_gameStart').setDisplaySize(2 * Size_BTN, Size_BTN);
        setCursor(this, btn_game_start);
        // '開始遊戲'按鈕點擊事件
        btn_game_start.setInteractive().on('pointerup', () => {
          btn_game_start.destroy();
          // 選擇遊戲
          selectGame();
        });
      });
      guide(this, 'audio_start');
    } else { selectGame(); }
  }
}

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: 'app',
  scene: [MainMenu, game1, game2, game3, game4, game5, game6]
}
const game = new Phaser.Game(config);