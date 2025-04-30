import BaseScene from './BaseScene.js';
export default class Game4 extends BaseScene {
  constructor() {
    super({ key: 'Game4' });
    this.colorSetRegions = [];
  }
  preload() { this.initializeLoad(); }
  create() {
    this.setSceneShow();
    this.setBackground(`bg_${this.scene.key}`);
    if (!this.firstGuidePlayed) this.setGuideAudio();
    this.firstGuidePlayed = true;
    this.setBackMenuButton();
    this.setInteractiveArea(1, 1.1, .73, .75);
    const { x, y, width: w, height: h } = this.interactiveArea;
    this.allocationFoods({ mode: 'COLOR' });
    this.setRegion();
    this.setFoodCabinet(x, y, w * .5, h, this.colorSetRegions);
  }
  // ********** 方法 ********** //
  setRegion() { // 建立分類區域
    const { x, y, width: w, height: h } = this.interactiveArea;
    const [regionW, regionH] = [w * .30, h * .33];
    const [dW, dH] = [.5 * (w - regionW), regionH + h * .005];
    this.colorSetRegions = colorSets.map((type, index) => {
      const rx = x + (index % 2 ? dW : -dW);
      const ry = y + (index / 2 - 1) * dH;
      const region = this.add.image(rx, ry, 'REGIONS', `${type}1`);
      region.setData('type', type);
      this.fitImageElement(region, { maxWidth: regionW, maxHeight: regionH });
      this.setDevTest(region);
      return region;
    });
  }
}