let userAnswer = { nut: [], milk: [], meat: [], vegetable: [], fruit: [], grain: [] };

const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('nut', `${ResourcePATH}/images/ui/types/nut.png`);
    this.load.image('milk', `${ResourcePATH}/images/ui/types/milk.png`);
    this.load.image('meat', `${ResourcePATH}/images/ui/types/meat.png`);
    this.load.image('vegetable', `${ResourcePATH}/images/ui/types/vegetable.png`);
    this.load.image('fruit', `${ResourcePATH}/images/ui/types/fruit.png`);
    this.load.image('grain', `${ResourcePATH}/images/ui/types/grain.png`);
  },
  create: function () {

    // /************************************************ 物件設置部分 ************************************************/
    const foodlist = getRandomFoods(numOfFood);
    const foodArr = [];

    // 食物分類區域
    const typeRegions = [
      { bounds: null, color: 0xCFAB6F, name: 'nut', },
      { bounds: null, color: 0x83CDEA, name: 'milk', },
      { bounds: null, color: 0xDB5878, name: 'meat', },
      { bounds: null, color: 0x87BA43, name: 'vegetable', },
      { bounds: null, color: 0xE56B28, name: 'fruit', },
      { bounds: null, color: 0xEFAA35, name: 'grain', },
    ];
    for (let i = 0; i < typeRegions.length; i++) {
      const cx = (i < 3) ? 0.16 * w : w - 0.16 * w;
      const cy = (i < 3) ? 0.333 * h * i : 0.333 * h * (i - 3);
      typeRegions[i].bounds = this.add.image(cx, cy + 0.165 * h, typeRegions[i].name).setDisplaySize(0.3 * w, 0.3 * h).setOrigin(0.5);
      // 測試用點擊事件
      // typeRegions[i].bounds.setInteractive().on('pointerdown', () => { console.log(`${typeRegions[i].name}`); })
    }

    // 食物區域
    foodArea(this, foodArr, foodlist, cx, cy, 0.35 * w, 0.95 * h, 0.05 * w, 0);
    
    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'game1', typeRegions, userAnswer); // 添加拖動事件
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