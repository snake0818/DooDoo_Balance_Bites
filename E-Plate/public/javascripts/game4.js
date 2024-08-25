const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('bg4', `${PATH_UI}/bg/bg_game4.png`)
    this.load.image('red', `${PATH_UI}/colors/red.png`);
    this.load.image('gre', `${PATH_UI}/colors/green.png`);
    this.load.image('whi', `${PATH_UI}/colors/white.png`);
    this.load.image('o_y', `${PATH_UI}/colors/orange_and_yellow.png`);
    this.load.image('i_d', `${PATH_UI}/colors/blue_and_purple.png`);
  },
  create: function () {
    // 背景設置
    this.add.image(GCX, GCY, 'bg4').setDisplaySize(WIDTH, HEIGHT);
    // 互動區域設置
    const interactive = this.add.rectangle(GCX, 1.05 * GCY, .72 * WIDTH, .7 * HEIGHT, '0xaa0000', BGV).setDepth(-1);
    const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = getInteractiveAreaMetrics(interactive);

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