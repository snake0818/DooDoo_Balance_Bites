const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('bg2', `${PATH_UI}/bg/bg_game2.png`);
    this.load.image('plate', `${PATH_UI}/plate_type.png`);
  },
  create: function () {
    // 背景設置
    this.add.image(GCX, GCY, 'bg2').setDisplaySize(WIDTH, HEIGHT);
    // 互動區域設置
    const interactive = this.add.rectangle(GCX, 1.07 * GCY, .88 * WIDTH, .7 * HEIGHT, '0xaa0000', BGV).setDepth(0);
    const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = getInteractiveAreaMetrics(interactive);

    // /************************************************ 物件設置部分 ************************************************/
    const foodlist = getRandomFoods();
    const foodArr = [];

    // 食物分類區域
    const [pw, ph] = [.7 * IA_W, IA_H];
    const plate = this.add.image(IA_x + .5 * pw, IA_cy, 'plate').setDisplaySize(pw, ph);
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