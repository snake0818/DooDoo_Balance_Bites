const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('bg6', `${PATH_UI}/bg/bg_game6.png`);
    this.load.image('plate', `${PATH_UI}/plate_full.png`);
  },
  create: function () {
    // 背景設置
    this.add.image(GCX, GCY, 'bg6').setDisplaySize(WIDTH, HEIGHT);
    // 互動區域設置
    const interactive = this.add.rectangle(GCX, 1.07 * GCY, .88 * WIDTH, .7 * HEIGHT, '0xaa0000', BGV).setDepth(-1);
    const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = getInteractiveAreaMetrics(interactive);

    // /************************************************ 物件設置部分 ************************************************/
    // 食物分類區域
    const [pw, ph] = [.7 * IA_W, IA_H];
    const plate = this.add.image(IA_x + .5 * pw, IA_cy, 'plate').setDisplaySize(pw, ph);
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
          sizeMulti: .65
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

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'class', topic, typeRegions, userClassAnswer, positionMapping); // 添加拖動事件
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