let userAnswer = { nut: [], milk: [], meat: [], vegetable: [], fruit: [], grain: [] };

const gameStart = {
  key: 'gameStart',
  preload: function () { GeneralPreload(this); },
  create: function () {

    // /************************************************ 物件設置部分 ************************************************/
    const towerWidth = 0.7 * w; // 金字塔寬
    const towerHeight = 0.98 * h;  // 金字塔高
    const foodlist = getRandomFoods(numOfFood);
    const foodArr = [];
    
    // 食物分類金字塔物件
    const foodTower = this.add.triangle(cx/1.4, cy, 0, towerHeight, 0.5 * towerWidth, 0, towerWidth, towerHeight, 0xffffff).setInteractive();
    // 劃分區域
    const regions = [
      {
        name: 'nut',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x - foodTower.width / 6.65, foodTower.y - foodTower.height / 5,
          foodTower.x + foodTower.width / 6.65, foodTower.y - foodTower.height / 5,
          foodTower.x, foodTower.y - foodTower.height / 2,]),
        color: 0xCFAB6F,
        text: '堅果類',
        textSeat: [foodTower.x, foodTower.y - foodTower.height / 5],
      },
      {
        name: 'milk',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x - foodTower.width / 3.75, foodTower.y + foodTower.height / 30,
          foodTower.x - foodTower.width / 300, foodTower.y + foodTower.height / 30,
          foodTower.x - foodTower.width / 300, foodTower.y - foodTower.height / 5.25,
          foodTower.x - foodTower.width / 6.5, foodTower.y - foodTower.height / 5.25,]),
        color: 0x83CDEA,
        text: '乳品類',
        textSeat: [((foodTower.x - foodTower.width / 3.75) + (foodTower.x - foodTower.width / 300)) / 2, foodTower.y + foodTower.height / 30],
      },
      {
        name: 'meat',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x + foodTower.width / 300, foodTower.y + foodTower.height / 30,
          foodTower.x + foodTower.width / 3.75, foodTower.y + foodTower.height / 30,
          foodTower.x + foodTower.width / 6.5, foodTower.y - foodTower.height / 5.25,
          foodTower.x + foodTower.width / 300, foodTower.y - foodTower.height / 5.25]),
        color: 0xee8800,
        text: '豆魚蛋肉類',
        textSeat: [((foodTower.x + foodTower.width / 3.75) + (foodTower.x + foodTower.width / 300)) / 2, foodTower.y + foodTower.height / 30],
      },
      {
        name: 'vegetable',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x - foodTower.width / 2.6, foodTower.y + foodTower.height / 3.7,
          foodTower.x - foodTower.width / 300, foodTower.y + foodTower.height / 3.7,
          foodTower.x - foodTower.width / 300, foodTower.y + foodTower.height / 22.5,
          foodTower.x - foodTower.width / 3.7, foodTower.y + foodTower.height / 22.5,]),
        color: 0xDB5878,
        text: '蔬果類',
        textSeat: [((foodTower.x - foodTower.width / 2.6) + (foodTower.x - foodTower.width / 300)) / 2, foodTower.y + foodTower.height / 3.7],
      },
      {
        name: 'fruit',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x + foodTower.width / 300, foodTower.y + foodTower.height / 3.7,
          foodTower.x + foodTower.width / 2.6, foodTower.y + foodTower.height / 3.7,
          foodTower.x + foodTower.width / 3.7, foodTower.y + foodTower.height / 22.5,
          foodTower.x + foodTower.width / 300, foodTower.y + foodTower.height / 22.5,]),
        color: 0x87BA43,
        text: '水果類',
        textSeat: [((foodTower.x + foodTower.width / 2.6) + (foodTower.x + foodTower.width / 300)) / 2, foodTower.y + foodTower.height / 3.7],
      },
      {
        name: 'grain',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x - foodTower.width / 2, foodTower.y + foodTower.height / 2,
          foodTower.x + foodTower.width / 2, foodTower.y + foodTower.height / 2,
          foodTower.x + foodTower.width / 2.55, foodTower.y + foodTower.height / 3.55,
          foodTower.x - foodTower.width / 2.55, foodTower.y + foodTower.height / 3.55,]),
        color: 0xE56B28,
        text: '全榖雜糧類',
        textSeat: [foodTower.x, foodTower.y + foodTower.height / 2],
      }
    ];
    regions.forEach(region => {
      // 繪製邊界並填充顏色
      this.add.graphics().lineStyle(0.003 * w, 0x0).strokePoints(region.bounds.points, true).fillStyle(region.color).fillPath();
      // 添加文字
      this.add.text(region.textSeat[0], region.textSeat[1] - classFontSize / 2, region.text, { font: `${classFontSize}px 標楷體`, fill: '#000000' }).setOrigin(0.5);
      // 定義點擊互動事件，作為驗證
      // foodTower.on('pointerdown', (pointer) => { if (Phaser.Geom.Polygon.Contains(region.bounds, pointer.x, pointer.y)) console.log(`${region.text}`) })
    });

    // 食物區域
    foodArea(this, foodArr, foodlist, 0.85 * w, cy, 0.27 * w, towerHeight, 0, 0);

    // /************************************************ 互動事件部分 ************************************************/

    dragEvent(this, 'game2', regions, userAnswer); // 添加拖動事件
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