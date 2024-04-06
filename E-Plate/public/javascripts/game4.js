const colorset = {
  red: ['vegetable12', 'fruit2', 'fruit4', 'fruit5', 'fruit6', 'fruit8', 'fruit12',],
  gre: ['vegetable0', 'vegetable2', 'vegetable3', 'vegetable5', 'vegetable6', 'vegetable11', 'fruit1',],
  whi: ['vegetable7', 'vegetable8',],
  o_y: ['vegetable1', 'vegetable9', 'fruit0', 'fruit3', 'fruit7', 'fruit9', 'fruit11',],
  i_d: ['vegetable4', 'vegetable10', 'fruit10',],
};
let userAnswer = { red: [], gre: [], whi: [], o_y: [], i_d: [] };

const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('red', '../public/images/ui/colors/red.png');
    this.load.image('gre', '../public/images/ui/colors/green.png');
    this.load.image('whi', '../public/images/ui/colors/white.png');
    this.load.image('o_y', '../public/images/ui/colors/orange&yellow.png');
    this.load.image('i_d', '../public/images/ui/colors/indigo&dark.png');
    // 設定背景
    this.add.rectangle(cx, cy, w, h, 0xffffff).setDepth(-1);
  },
  create: function () {

    // /************************************************ 物件設置部分 ************************************************/
    const foodlist = getRandomFoods(numOfFood, colorset);
    const foodArr = [];
    
    // 食物分類區域
    const typeRegions = [
      { bounds: null, name: 'red' },
      { bounds: null, name: 'gre' },
      { bounds: null, name: 'whi' },
      { bounds: null, name: 'o_y' },
      { bounds: null, name: 'i_d' },
    ];
    for (let i = 0; i < typeRegions.length; i++) {
      const cx = (i < 3) ? 0.16 * w : w - 0.16 * w;
      const cy = (i < 3) ? 0.333 * h * i : 0.333 * h * (i - 3);
      typeRegions[i].bounds = this.add.image(cx, cy + 0.168 * h, typeRegions[i].name).setDisplaySize(0.3 * w, 0.3 * h).setOrigin(0.5);
      // typeRegions[i].bounds.setInteractive().on('pointerdown', () => { console.log(`${typeRegions[i].name}`); })
    }

    // 食物區域
    foodArea(this, foodArr, foodlist, cx, cy, 0.35 * w, 0.95 * h, 0.05 * w, 0);

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'game4', typeRegions, userAnswer, colorset); // 添加拖動事件
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