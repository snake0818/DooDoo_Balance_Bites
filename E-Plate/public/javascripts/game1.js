const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('bg1', `${PATH_UI}/bg/bg_game1.png`)
    this.load.image('nut', `${PATH_UI}/types/nuts.png`);
    this.load.image('dairy', `${PATH_UI}/types/dairy.png`);
    this.load.image('meat', `${PATH_UI}/types/meats.png`);
    this.load.image('vegetable', `${PATH_UI}/types/vegetables.png`);
    this.load.image('fruit', `${PATH_UI}/types/fruits.png`);
    this.load.image('grain', `${PATH_UI}/types/grains.png`);
  },
  create: function () {
    // 背景設置
    this.add.image(GCX, GCY, 'bg1').setDisplaySize(WIDTH, HEIGHT);
    // 互動區域設置
    const interactive = this.add.rectangle(GCX, 1.05 * GCY, .72 * WIDTH, .7 * HEIGHT, '0xaa0000', BGV).setDepth(-1);
    const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = getInteractiveAreaMetrics(interactive);

    // /************************************************ 物件設置部分 ************************************************/
    const foodlist = getRandomFoods();
    const foodArr = [];

    // 食物分類區域
    const [region_W, region_H] = [.3 * IA_W, .3 * IA_H];
    const typeRegions = [
      { bounds: null, color: 0xCFAB6F, name: 'nut', },
      { bounds: null, color: 0x83CDEA, name: 'dairy', },
      { bounds: null, color: 0xDB5878, name: 'meat', },
      { bounds: null, color: 0x87BA43, name: 'vegetable', },
      { bounds: null, color: 0xE56B28, name: 'fruit', },
      { bounds: null, color: 0xEFAA35, name: 'grain', },
    ];
    for (let i = 0; i < typeRegions.length; i++) {
      const dx = (i < 3) ? IA_x + .5 * region_W : IA_X - .5 * region_W;
      const dy = .35 * IA_H * (i % 3);
      typeRegions[i].bounds = this.add.image(dx, IA_y + .5 * region_H + dy, typeRegions[i].name).setDisplaySize(region_W, region_H).setOrigin(.5);
      // 測試用點擊事件
      // typeRegions[i].bounds.setInteractive().on('pointerdown', () => { console.log(`${typeRegions[i].name}`); });
    }

    // 食物區域
    const LConfig = {
      x: IA_cx,
      y: IA_cy,
      width: .35 * IA_W,
      heigh: IA_H
    };
    foodArea(this, foodArr, foodlist, LConfig);

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'class', typeRegions, userClassAnswer, null); // 添加拖動事件
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