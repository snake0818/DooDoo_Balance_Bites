const colorset = {
  red: ['vegetable12', 'fruit2', 'fruit4', 'fruit5', 'fruit6', 'fruit8', 'fruit12',],
  gre: ['vegetable0', 'vegetable2', 'vegetable3', 'vegetable5', 'vegetable6', 'vegetable11', 'fruit1',],
  whi: ['vegetable7', 'vegetable8',],
  o_y: ['vegetable1', 'vegetable9', 'fruit0', 'fruit3', 'fruit7', 'fruit9', 'fruit11',],
  i_d: ['vegetable4', 'vegetable10', 'fruit10',],
};
let userAnswer = { red: [], gre: [], whi: [], o_y: [], i_d: [] };
const restriction = ['vegetable', 'fruit'];

const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('body', '../public/images/ui/body.png');
    this.load.image('red', '../public/images/ui/colors/red2.png');
    this.load.image('gre', '../public/images/ui/colors/green2.png');
    this.load.image('whi', '../public/images/ui/colors/white2.png');
    this.load.image('o_y', '../public/images/ui/colors/orange2.png');
    this.load.image('i_d', '../public/images/ui/colors/indigo2.png');

    this.load.audio('red', '../public/audios/colors/red_effect.m4a');
    this.load.audio('gre', '../public/audios/colors/green_effect.m4a');
    this.load.audio('whi', '../public/audios/colors/white_effect.m4a');
    this.load.audio('o_y', '../public/audios/colors/orange_effect.m4a');
    this.load.audio('i_d', '../public/audios/colors/indigo_effect.m4a');
  },
  create: function () {

    // /************************************************ 物件設置部分 ************************************************/
    const foodlist = getRandomFoods(numOfFood, colorset, restriction);
    const foodArr = [];
    let EffectCompleted = true;

    // 食物分類區域
    const humanBody = this.add.image(cx / 1.4, cy * 1.1, 'body');
    const pw = humanBody.width;
    const ph = humanBody.height;
    const Regions = [
      { name: 'red', bounds: this.add.image(humanBody.x + pw / 1.2, humanBody.y - ph / 2.2, 'red').setDisplaySize(0.25 * w, 0.25 * h) },
      { name: 'o_y', bounds: this.add.image(humanBody.x - pw / 1.2, humanBody.y - ph / 2.4, 'o_y').setDisplaySize(0.25 * w, 0.25 * h) },
      { name: 'gre', bounds: this.add.image(humanBody.x + pw / 1.2, humanBody.y - ph / 8, 'gre').setDisplaySize(0.25 * w, 0.25 * h) },
      { name: 'whi', bounds: this.add.image(humanBody.x - pw / 1.2, humanBody.y - ph / 12, 'whi').setDisplaySize(0.25 * w, 0.25 * h) },
      { name: 'i_d', bounds: this.add.image(humanBody.x - pw / 1.2, humanBody.y + ph / 4, 'i_d').setDisplaySize(0.25 * w, 0.25 * h) },
    ];
    //  器官部位與判定區域連接線
    {
      const lineGraphic = this.add.graphics({ lineStyle: { width: 0.001 * w, color: 0x000000 } });
      //  眼睛
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x - pw / 25, humanBody.y - ph / 2.4, Regions[1].bounds.x + Regions[1].bounds.width / 2.7, Regions[1].bounds.y));
      //  心臟
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x + pw / 30, humanBody.y - ph / 4.5, Regions[3].bounds.x + Regions[3].bounds.width / 2.7, Regions[3].bounds.y));
      //  膀胱
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x, humanBody.y - ph / 15, Regions[4].bounds.x + Regions[4].bounds.width / 2.7, Regions[4].bounds.y));
      //  頭腦
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x, humanBody.y - ph / 2.2, 1.075 * Regions[0].bounds.x - Regions[0].bounds.width / 2, Regions[0].bounds.y));
      //  牙骨
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x, humanBody.y - ph / 8, 1.075 * Regions[2].bounds.x - Regions[2].bounds.width / 2, Regions[2].bounds.y));
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x, humanBody.y - ph / 2.65, 1.075 * Regions[2].bounds.x - Regions[2].bounds.width / 2, Regions[2].bounds.y));
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x + pw / 13, humanBody.y + ph / 5, 1.075 * Regions[2].bounds.x - Regions[2].bounds.width / 2, Regions[2].bounds.y));
    }
    // 每個區域添加互動
    Regions.forEach(region => {
      region.bounds.setInteractive(); // 設置區域為可交互  
      // 添加點擊事件
      region.bounds.on('pointerdown', (pointer) => {
        if (EffectCompleted) {
          const soundEffect = this.sound.add(region.name)
          EffectCompleted = false;
          soundEffect.play();
          soundEffect.on('complete', () => { EffectCompleted = true; })
        }
      });
    });

    // 食物區域
    foodArea(this, foodArr, foodlist, 0.85 * w, cy, 0.27 * w, 0.95 * h, 0, 0);

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'game5', Regions, userAnswer, colorset); // 添加拖動事件
  },
  update: function () {
    // 遊戲狀態更新
  }
}
