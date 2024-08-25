const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
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
  },
  create: function () {
    // 背景設置
    this.add.image(GCX, GCY, 'bg5').setDisplaySize(WIDTH, HEIGHT);
    // 互動區域設置
    const interactive = this.add.rectangle(GCX, 1.07 * GCY, .88 * WIDTH, .7 * HEIGHT, '0xaa0000', BGV).setDepth(-1);
    const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = getInteractiveAreaMetrics(interactive);

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
      // 測試用點擊事件
      // typeRegions[i].bounds.setInteractive().on('pointerdown', () => { console.log(`${typeRegions[i].name}`); });
    }

    // 每個區域添加互動
    typeRegions.forEach(region => {
      region.bounds.setDisplaySize(region_W, region_H).setOrigin(.5);
      // 設置區域為可交互並添加點擊事件
      region.bounds.setInteractive().on('pointerdown', (pointer) => {
        if (EffectCompleted) {
          const soundEffect = this.sound.add(region.name)
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

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'color', typeRegions, userColorAnswer, null); // 添加拖動事件
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