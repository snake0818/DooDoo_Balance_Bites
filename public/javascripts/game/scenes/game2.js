import BaseScene from './BaseScene.js';
export default class Game2 extends BaseScene {
  constructor() {
    super({ key: 'Game2' });
    this.foodTypeRegions = [];
    this.plate = null;
  }
  preload() { this.initializeLoad(); }
  create() {
    this.setSceneShow();
    this.setBackground(`bg_${this.scene.key}`);
    if (!this.firstGuidePlayed) this.setGuideAudio();
    this.firstGuidePlayed = true;
    this.setBackMenuButton();
    this.setInteractiveArea(1, 1.1, .8, .72);
    const { x, y, width: w, height: h } = this.interactiveArea;
    // 建立食物餐盤
    this.plate = this.add.image(x * .75, y, 'plateType');
    this.fitImageElement(this.plate, { maxWidth: w * .7, maxHeight: h });
    this.allocationFoods();
    this.setRegion();
    this.setFoodCabinet(x * 1.57, y, w * .3, h, this.foodTypeRegions);
  }
  // ********** 方法 ********** //
  setRegion() { // 建立分類區域
    const { width: w, height: h } = this.interactiveArea;
    const { x, y } = this.plate;
    const baseX = x - w / 2;
    const regionConfigs = [
      { xRatio: .610, yRatio: 0.590, wRatio: .15, hRatio: .20 },
      { xRatio: .424, yRatio: 1.045, wRatio: .15, hRatio: .90 },
      { xRatio: .782, yRatio: 0.590, wRatio: .10, hRatio: .20 },
      { xRatio: .685, yRatio: 1.452, wRatio: .30, hRatio: .27 },
      { xRatio: .685, yRatio: 1.005, wRatio: .30, hRatio: .27 },
      { xRatio: .238, yRatio: 1.045, wRatio: .15, hRatio: .90 },
    ];
    this.foodTypeRegions = regionConfigs.map(
      ({ xRatio, yRatio, wRatio, hRatio }, index) => {
        const region = this.add.rectangle(
          w * xRatio + baseX,
          y * yRatio,
          w * wRatio,
          h * hRatio
        );
        region.setData('type', foodTypes[index]);
        this.setDevTest(region, { alpha: .5 });
        return region;
      }
    );
  }
}