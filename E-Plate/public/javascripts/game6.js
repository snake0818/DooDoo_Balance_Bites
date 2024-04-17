let userAnswer = { nut: [], milk: [], meat: [], vegetable: [], fruit: [], grain: [] };

const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('plate', '../public/images/ui/plate.png');
    this.load.image('CFAB6F', '../public/images/ui/colors/CFAB6F.png');
  },
  create: function () {

    // /************************************************ 物件設置部分 ************************************************/
    const foodlist = getRandomFoods(numOfFood);
    const foodArr = [];
    
    // 食物分類區域
    const pw = w / 1.4;
    const ph = h / 1.1;
    const plate = this.add.image(cx / 1.35, cy * 1.1, 'plate').setDisplaySize(pw, ph);
    const Regions = [
      { name: 'nut', text: '堅果類', bounds: this.add.image(1.01 * plate.x, plate.y - ph / 2.5, 'CFAB6F').setDisplaySize(0.33 * pw, 0.24 * ph).setDepth(-1) },
      { name: 'milk', text: '乳品類', bounds: this.add.rectangle(plate.x - pw / 2.8, plate.y - ph / 3.5, 0.25 * pw, 0.3 * ph) },
      { name: 'meat', text: '豆魚蛋肉類', bounds: this.add.rectangle(plate.x + pw / 5.5, plate.y - ph / 11.5, 0.33 * pw, 0.25 * ph) },
      { name: 'fruit', text: '水果類', bounds: this.add.rectangle(plate.x - pw / 3.6, plate.y + ph / 6.5, 0.16 * pw, 0.57 * ph) },
      { name: 'grain', text: '全榖雜糧類', bounds: this.add.rectangle(plate.x + pw / 5.5, plate.y + ph / 4.1, 0.33 * pw, 0.38 * ph) },
      { name: 'vegetable', text: '蔬果類', bounds: this.add.rectangle(plate.x - pw / 11, plate.y + ph / 9, 0.19 * pw, 0.65 * ph) },
    ];

    // 食物區域
    foodArea(this, foodArr, foodlist, 0.85 * w, cy, 0.27 * w, 0.95 * h, 0, 0);

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'game6', Regions, userAnswer); // 添加拖動事件
  },
  update: function () {
    // 遊戲狀態更新
  }
}
