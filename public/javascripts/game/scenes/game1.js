import BaseScene from './BaseScene.js';
export default class Game1 extends BaseScene {
  constructor() {
    super({ key: 'Game1' });
    this.foodTypeRegions = [];
  }
  preload() { this.initializeLoad(); }
  create() {
    this.setSceneShow();
    this.setBackground(`bg_${this.scene.key}`);
    this.setGuideAudio();
    this.setBackMenuButton();
    this.setInteractiveArea(1, 1.1, .73, .75);
    const { x, y, width: w, height: h } = this.interactiveArea;
    this.allocationFoods();
    this.setRegion();
    this.setFoodCabinet(x, y, w * .5, h, this.foodTypeRegions);
  }
  // ********** 方法 ********** //
  setRegion() { // 建立分類區域
    const { x, y, width: w, height: h } = this.interactiveArea;
    const [regionW, regionH] = [w * .32, h * .33];
    const [dW, dH] = [.5 * (w - regionW), regionH + h * .005];
    this.foodTypeRegions = foodTypes.map((type, index) => {
      const rx = x + (index % 2 ? dW : -dW);
      const ry = y + (Math.floor(index / 2) - 1) * dH;
      const region = this.add.image(rx, ry, 'REGIONS', type);
      region.setData('type', type);
      this.fitImageElement(region, regionW, regionH);
      this.setDevTest(region);
      return region;
    });
  }
}