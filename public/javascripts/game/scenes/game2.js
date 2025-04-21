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
    this.setGuideAudio();
    this.setBackMenuButton();
    this.setInteractiveArea(1, 1.1, .9, .72);
    const { x, y, width: w, height: h } = this.interactiveArea;
    this.plate = this.add.image(x * .75, y, 'plateType');
    this.fitImageElement(this.plate, w * .7, h);
    this.allocationFoods();
    this.setRegion();
    this.setFoodCabinet(x * 1.6, y, w * .3, h, this.foodTypeRegions);
  }
  // ********** 方法 ********** //
  setRegion() { // 建立分類區域
    const { x, y, width: w, height: h } = this.interactiveArea;
    const baseX = x - w / 2;
    const regionConfigs = [
      { xRatio: .434, yRatio: 0.640, wRatio: .13, hRatio: .20 },
      { xRatio: .274, yRatio: 1.068, wRatio: .12, hRatio: .85 },
      { xRatio: .574, yRatio: 0.640, wRatio: .08, hRatio: .20 },
      { xRatio: .498, yRatio: 1.446, wRatio: .25, hRatio: .28 },
      { xRatio: .498, yRatio: 1.020, wRatio: .25, hRatio: .24 },
      { xRatio: .118, yRatio: 1.068, wRatio: .12, hRatio: .85 },
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