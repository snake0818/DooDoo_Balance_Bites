export default class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);
    // ********** 變數 ********** //
    this.firstGuidePlayed = false; // 首次引導指南播放狀態(false)
    this.audioSTATUS = false;
    this.foodList = [];
    this.mode = null;
    // ********** 元件 ********** //
    this.bg = null;
    this.audio = null;
    this.interactiveArea = null;
    this.backButton = null;
    this.foodCabinet = null;
    // ********** 紀錄用 ********** //
    this.CurrentGamingID = null;
    this.StartTime = null;
  }
  // ********** 快取用 ********** //
  #_cachedView = null;
  #_debugRects = null;

  get view() {
    if (!this.#_cachedView) {
      const { centerX: cX, centerY: cY, width: W, height: H } = this.cameras.main;
      this.#_cachedView = { cX, cY, W, H };
    }
    return this.#_cachedView;
  }

  initializeLoad() {
    if (preloadStatus) return;
    if (DEV_MODE) console.log('Preloading...')
    preloadStatus = true;
    // 載入顯示
    this.setLoadingStatus();
    // 載入資源
    this.preloadFoodAtlas();
    this.preloadImageUI();
    this.preloadAudio();
  }
  // ******************** 載入 ******************** //
  setLoadingStatus() {
    const { cX, cY, H } = this.view;
    // 設置加載進度文字
    const loadingText = this.add.text(cX, cY, 'Loading...', {
      fontSize: H * .1,
      fill: '#000',
      fontFamily: 'Times New Roman'
    }).setOrigin(0.5);
    // 監聽加載進度變化與完成事件
    const updateInterval = 100;
    let lastUpdate = 0;
    this.load.on('progress', (value) => {
      const now = performance.now();
      if (now - lastUpdate < updateInterval) return;
      lastUpdate = now;
      loadingText.setText(`Loading... ${~~(value * 100)}%`);
    }).once('complete', () => loadingText.destroy());
  }
  preloadFoodAtlas() {
    foodTypes.forEach(category => {
      this.load.atlas(
        category.toUpperCase(),
        `${PATH.Food}/${category}.webp`,
        `${PATH.Food}/${category}.json`
      );
      if (DEV_MODE) console.log(`Load ${category} Atlas.`);
    });
  }
  preloadImageUI() {
    const categories = ['backgrounds', 'game_btns', 'btns', 'regions', 'rhymes', 'rhyme_lists'];
    categories.forEach(category => {
      this.load.atlas(
        category.toUpperCase(),
        `${PATH.Atlas}/${category}.png`,
        `${PATH.Atlas}/${category}.json`
      );
      if (DEV_MODE) console.log(`Load ${category} Atlas.`);
    });
    if (DEV_MODE) console.log('Load UI Images.');
    const UI = {
      other: {
        path: '/',
        files: {
          foodCabinet: 'foodCabinet',
          correct: 'sign_correct',
          wrong: 'sign_wrong',
          plateType: 'plate_type',
          plateFull: 'plate_full'
        }
      }
    };
    Object.values(UI).forEach(group => {
      Object.entries(group.files).forEach(([key, file]) => {
        this.load.image(key, `${PATH.UI}${group.path}${file}.png`);
      });
    });
  }
  preloadAudio() {
    if (DEV_MODE) console.log('Load Audios.');
    const Audio = {
      title: {
        path: '/titles/',
        files: {
          audio_title1: 'game_title1',
          audio_title2: 'game_title2',
          audio_title3: 'game_title3',
          audio_title4: 'game_title4',
          audio_title5: 'game_title5',
          audio_title6: 'game_title6'
        }
      },
      guide: {
        path: '/guides/',
        files: {
          audio_start: 'guide_start',
          audio_Menu: 'guide_game_select',
          audio_Game1: 'guide1',
          audio_Game2: 'guide2',
          audio_Game3: 'guide3',
          audio_Game4: 'guide4',
          audio_Game5: 'guide5',
          audio_Game6: 'guide6'
        }
      },
      rhymes: {
        path: '/rhymes/',
        files: {
          rhyme_list: 'rhyme_list',
          rhyme_nut: 'rhyme_nut',
          rhyme_dairy: 'rhyme_dairy',
          rhyme_grain: 'rhyme_grain',
          rhyme_meat: 'rhyme_meat',
          rhyme_fruit: 'rhyme_fruit',
          rhyme_vegetable: 'rhyme_vegetable'
        }
      },
      colors: {
        path: '/colors/',
        files: {
          color_orange_and_yellow: 'orange_and_yellow_effect',
          color_red: 'red_effect',
          color_white: 'white_effect',
          color_green: 'green_effect',
          color_indigo_and_dark: 'indigo_and_dark_effect'
        }
      },
      other: {
        path: '/ui/',
        files: {
          correct: 'correct',
          wrong: 'wrong'
        }
      }
    }
    Object.values(Audio).forEach(group => {
      Object.entries(group.files).forEach(([key, file]) => {
        this.load.audio(key, `${PATH.Audio}${group.path}${file}.m4a`);
      });
    });
  }

  // ******************** 設置 ******************** //
  setSceneShow() {
    const key = this.scene.key;
    this.CurrentGamingID = key;

    if (!DEV_MODE) return;
    const { cX, H } = this.view;
    console.log(`Now in ${key} Scene`);
    this.add.text(cX, .965 * H, `Scene: ${key}`, {
      fontSize: H * .08,
      backgroundColor: '#000'
    }).setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(999);
  }
  setBackground(textureKey) {
    const { cX, cY } = this.view;
    try { this.bg = this.add.image(cX, cY, 'BACKGROUNDS', textureKey).setDepth(-1); }
    catch (error) { console.error(`Error set background image with key: '${textureKey}'\n`, error); }
  }
  setDevTest(element, { color, alpha, isRelationship = false } = {}) {
    if (!DEV_MODE) return;
    // 可視化
    const debugColor = color ?? 0x000000;
    const debugAlpha = alpha ?? .7;
    const debugRect = this.add.rectangle(
      element.x,
      element.y,
      element.width,
      element.height,
      debugColor,
      debugAlpha
    ).setOrigin(0.5).setScale(element._scaleX, element._scaleY);
    this.children.moveBelow(debugRect, element); // 放在 element 底下
    this.#_debugRects ??= [];
    this.#_debugRects.push(debugRect);
    // 關聯清除事件
    if (isRelationship) element.once('destroy', () => debugRect?.destroy());
    // 點擊測試
    const data_type = element.getData('type');
    if (data_type) element.setInteractive().on('pointerdown', () => console.log(`${data_type}`));
  }
  setInteractiveArea(scaleX = 1, scaleY = 1, scaleW = 1, scaleH = 1) {
    const { cX, cY, W, H } = this.view;
    const interactiveArea = this.add.rectangle(
      scaleX * cX,
      scaleY * cY,
      scaleW * W,
      scaleH * H
    );
    this.setDevTest(interactiveArea, { color: '0xAAAAAA', alpha: .5 });
    this.interactiveArea = interactiveArea;
  }
  setAudio(AudioKey, { concurrent, subsequent, volume = audio_volume, rate = audio_rate } = {}) {
    // 若已有音效在播放中，或開發模式禁用音效
    if (this.audioSTATUS || DEV_MUTE) {
      if (typeof concurrent === 'function') concurrent();
      if (typeof subsequent === 'function') subsequent();
      return;
    }
    // 嘗試載入並播放音效
    try {
      this.audio = this.sound.add(AudioKey, { volume, rate })
        // 設定音效播放時，執行並行動作
        .once('play', () => {
          this.audioSTATUS = true;
          if (typeof concurrent === 'function') concurrent();
        })
        // 設定音效播完後，變更狀態並銷毀音效物件
        .once('complete', () => {
          if (typeof subsequent === 'function') subsequent();
          this.audio.stop();
          this.sound.remove(this.audio); // 從 sound manager 中移除聲音
          this.audio = null;
          this.audioSTATUS = false;
        });
      this.audio.play();
    } catch (error) {
      console.error(`Error loading or playing audio with key: '${AudioKey}'\n`, error);
    } // 捕捉到錯誤時執行
  }
  setGuideAudio(GuideAudioKey = `audio_${this.scene.key}`) {
    const { cX, cY, W, H } = this.view;
    const rect = !DEV_MODE ? this.add.rectangle(cX, cY, W, H, 0x0, 0).setDepth(10).setInteractive() : null;
    this.setAudio(GuideAudioKey, {
      subsequent: () => {
        rect?.destroy();
        this.StartTime = this.time.now;
      }
    });
  }
  setBackMenuButton() {
    const { W, H } = this.view;
    const backButton = this.add.image(W * .07, H * .135, 'BTNS', 'back').setOrigin(0.5);
    this.fitImageElement(backButton, { maxWidth: W * .07 });
    this.setDevTest(backButton);
    backButton.setInteractive(pixelExactConfig)
      .once('pointerdown', () => {
        this.clearAllDebugRects();
        this.interruptCurrentAudio();
        this.scene.stop(this.scene.key);
        this.scene.start('Menu');
      });
    this.backButton = backButton;
  }
  setFoodCabinet(X, Y, Width, Height, Regions, PosMapping = null, FoodSizeRatio = 0.15) {
    // 建立食物櫃
    const cabinet = this.add.image(X, Y, 'foodCabinet')
    this.fitImageElement(cabinet, { maxWidth: Width, maxHeight: Height });
    this.foodCabinet = cabinet;
    // 放置食物
    const { x, y, width: w, height: h } = cabinet;
    const numRows = 4; // 常數為食物櫃總列數(依素材)
    const numCols = Math.ceil(this.foodList.length / numRows); // 每行食物數量
    const foodSize = h * FoodSizeRatio;
    // 計算食物之間的間距
    const colGap = Math.floor((w - foodSize * numCols) / (numCols + 1));
    const rowGap = Math.floor((h - foodSize * numRows) / (numRows + 1));
    // 整體區塊的起始位置（置中）
    const totalFoodWidth = foodSize * numCols + colGap * (numCols - 1);
    const totalFoodHeight = foodSize * numRows + rowGap * (numRows - 1);
    const SD = 0.15 - FoodSizeRatio;
    const startX = Math.floor(x - totalFoodWidth / 2 + foodSize / (2 - SD * 30));
    const startY = Math.floor(y - totalFoodHeight / 2 + foodSize / 2);
    this.foodList.forEach((foodKey, index) => {
      const row = index % numRows;
      const col = Math.floor(index / numRows);
      const foodX = startX + col * (foodSize + colGap) * (1 - SD * 7);
      const foodY = startY + row * (foodSize + rowGap) * .95;
      const food = this.add.image(foodX, foodY, `${this.getCategory(foodKey).toUpperCase()}`, foodKey);
      food.setData('type', this.getCategory(foodKey, this.mode));
      food.prevX = food.x;
      food.prevY = food.y;
      this.fitImageElement(food, { maxWidth: foodSize });
      food.setInteractive(pixelExactConfig);
      this.input.setDraggable(food);
      this.setDevTest(food);
    });
    this.setFoodDragEvent(Regions, PosMapping);

    this.StartTime = this.time.now;
  }
  setFoodDragEvent(regions, posMapping = null) {
    this.input
      // 物件拖動事件
      .on('drag', (pointer, gameObject, dragX, dragY) => {
        // 更新物件的位置並移至最上層
        gameObject.setPosition(dragX, dragY);
        gameObject.depth = 1;
      })
      // 物件放置事件
      .on('dragend', (pointer, gameObject) => {
        gameObject.depth = 0;
        const { status, type } = this.verifyDraggingIntoRegion(gameObject, regions);
        if (!type) this.revertFoodPosition(gameObject);
        else {
          if (status) {
            gameObject.input.enabled = false;
            if (++NumOfCorrect === this.foodList.length) this.setEndGameView();
            if (posMapping) this.setObjPosition(posMapping[type], gameObject);
            this.setResultView('correct');
          } else {
            NumOfError++;
            this.revertFoodPosition(gameObject);
            this.setResultView('wrong');
          }
        }
      });
  }
  setObjPosition(posMap, gameObj) {
    if (posMap.length > 0) {
      const position = posMap.shift(); // 取出並移除第一個元素
      gameObj.setPosition(position.x, position.y);
      if (position.sizeMulti) gameObj.setScale(position.sizeMulti);
    } else this.revertFoodPosition(gameObj);
  }
  setResultView(keyword) {
    const { cX, cY, W, H } = this.view;
    const rect = this.add.rectangle(cX, cY, W, H, 0x0, .5).setInteractive();
    const result = this.add.image(cX, cY, keyword);
    this.fitImageElement(result, { maxHeight: H });
    const fadeIn = () => { // 淡入效果
      const tweenIn = this.tweens.add({
        targets: result,
        alpha: 1,
        duration: 0,
        delay: 500 / rate,
        onComplete: () => {
          tweenIn.remove();
        }
      });
    }
    const fadeOut = () => { // 淡出效果
      const tweenOut = this.tweens.add({
        targets: result,
        alpha: 0,
        duration: 500,
        delay: 1,
        onComplete: () => {
          result.destroy();
          rect.destroy();
          tweenOut.remove();
        }
      });
    }
    this.setAudio(keyword, {
      concurrent: () => fadeIn(),
      subsequent: () => fadeOut()
    });
  }
  setEndGameView() {
    // 紀錄
    const record = {
      gameID: this.CurrentGamingID,
      wrong: NumOfError,
      playedTime: this.time.now - this.StartTime
    }
    storageRecord(record);
    // 清除資料
    NumOfError = 0;
    NumOfCorrect = 0;
    // 切換至遊戲結束場景
    this.scene.start('EndGame', { CurrentGamingID: this.CurrentGamingID });
  }

  // ******************** 功能 ******************** //
  interruptCurrentAudio() {
    if (DEV_MUTE || !this.audio || !this.audioSTATUS) return;
    this.audio.stop();
    this.audio.destroy();
    this.audioSTATUS = false;
  }
  fitImageElement(imageElement, { maxWidth, maxHeight, allowScaleUp = true }) {
    const frame = imageElement.frame;
    const isFromAtlas = frame.name !== imageElement.texture.key;
    // 來自 atlas 使用 frame，否則單張圖片使用 getSourceImage()
    const { width: sourceWidth, height: sourceHeight } = isFromAtlas
      ? frame
      : this.textures.get(imageElement.texture.key).getSourceImage();
    const scale = Math.min(
      typeof maxWidth === 'number' ? maxWidth / sourceWidth : 1,
      typeof maxHeight === 'number' ? maxHeight / sourceHeight : 1
    );
    imageElement.setScale(allowScaleUp ? scale : Math.min(scale, 1));
  }
  allocationFoods({ count = default_food_num, mode = 'TYPE', usePlateRestriction = false } = {}) {
    this.mode = mode;
    const selectedFoods = [];
    const categories = { TYPE: foodTypes, COLOR: ['vegetable', 'fruit'] }[mode];
    const setMap = { TYPE: foodTypes, COLOR: colorSets }[mode];
    if (!categories || !setMap) return;

    const isTypePlate = mode === 'TYPE' && usePlateRestriction;
    if (isTypePlate) count = Object.values(plateSets).reduce((sum, val) => sum + val, 0);

    // 各類型獲取 pickCount 個
    const quotient = Math.floor(count / setMap.length);
    const getFrames = (category) => {
      const atlasKey = category.toUpperCase();
      const frames = this.textures.get(atlasKey)?.getFrameNames();
      if (!frames?.length) {
        console.warn(`Atlas "${atlasKey}" 無 frames，略過`);
        return [];
      }
      return frames;
    };
    if (mode === 'TYPE') {
      // TYPE 模式：依據每個 category 抽一定數量
      categories.forEach(category => {
        const frames = getFrames(category);
        const pickCount = Math.min(isTypePlate ? plateSets[category] || 0 : quotient, frames.length); // 避免超出實際數量
        selectedFoods.push(...Phaser.Utils.Array.Shuffle(frames).slice(0, pickCount));
      })
    } else if (mode === 'COLOR') {
      // COLOR 模式：抓出所有 frames，再依顏色分組
      const allFrames = categories.flatMap(getFrames).filter(name => name.includes('/'));
      const colorGrouped = Object.fromEntries(colorSets.map(color => [color, []]));
      allFrames.forEach(f => {
        const color = f.split('/')[0];
        if (colorGrouped[color]) colorGrouped[color].push(f);
      });
      colorSets.forEach(color => {
        const frames = colorGrouped[color];
        const pickCount = Math.min(quotient, frames.length);
        selectedFoods.push(...Phaser.Utils.Array.Shuffle(frames).slice(0, pickCount));
      });
    }
    if (DEV_MODE) console.log('[已選擇]', selectedFoods);

    // 若有餘，補齊至目標數量
    const remainder = count % selectedFoods.length;
    if (!isTypePlate && remainder > 0) {
      const allFrames = categories.flatMap(getFrames);
      const leftover = Phaser.Utils.Array.Shuffle(allFrames)
        .filter(name => mode !== 'COLOR' || name.includes('/'))
        .filter(f => !selectedFoods.includes(f)) // 避免重複
        .slice(0, remainder);
      selectedFoods.push(...leftover);
      if (DEV_MODE) console.log('[補齊]', leftover);
    }
    // 隨機排序並儲存
    this.foodList = Phaser.Utils.Array.Shuffle(selectedFoods);
    // 驗證
    if (DEV_MODE) {
      const statMap = {};
      this.foodList.forEach(food => {
        const cat = this.getCategory(food, mode);
        statMap[cat] = (statMap[cat] || 0) + 1;
      });
      if (DEV_MODE) console.table(statMap);
    }
  }

  // ******************** 方法 ******************** //
  verifyDraggingIntoRegion(gameObj, regions) {
    const objKey = gameObj.getData('type'); // 從物件圖片鍵取得名稱
    let status = false, type = null;
    for (const region of regions) {
      // 若食物在特定區域範圍內
      if (Phaser.Geom.Rectangle.Contains(region.getBounds(), gameObj.x, gameObj.y)) {
        type = region.getData('type');
        // 檢驗食物與特定區域相符
        status = this.getCategory(type) === objKey;
        if (status) break;
      }
    }
    return { status, type };
  }
  clearAllDebugRects() {
    if (Array.isArray(this.#_debugRects)) {
      this.#_debugRects.forEach(rect => {
        if (rect?.destroy && typeof rect.destroy === 'function') {
          try { rect.destroy(); }
          catch (e) { console.warn('Failed to destroy debugRect:', e); }
        }
      });
      this.#_debugRects = [];
    }
  }
  revertFoodPosition(FoodObject) {
    const { prevX, prevY } = FoodObject;
    FoodObject.setPosition(prevX, prevY);
  }
  getCategory = (key, mode = null) => {
    return (key.includes('/')
      ? key.split('/')[mode === 'COLOR' ? 0 : 1]
      : key
    ).split(/[0-9]|[0-9][0-9]+/)[0];
  }
}