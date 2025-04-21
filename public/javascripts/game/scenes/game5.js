import BaseScene from './BaseScene.js';
export default class Game5 extends BaseScene {
  constructor() {
    super({ key: 'Game5' });
    this.colorSetRegions = [];
  }
  preload() { this.initializeLoad(); }
  create() {
    this.setSceneShow();
    this.setBackground(`bg_${this.scene.key}`);
    this.setGuideAudio();
    this.setBackMenuButton();
    this.setInteractiveArea(.75, 1.1, .65, .72);
    const { x, y, width: w, height: h } = this.interactiveArea;
    this.allocationFoods({ mode: 'COLOR' });
    this.setRegion();
    this.setFoodCabinet(x * 2.22, y, w * .5, h, this.colorSetRegions);
  }
  // ********** 方法 ********** //
  setRegion() { // 建立分類區域
    const { x, y, width: w, height: h } = this.interactiveArea;
    const [regionW, regionH] = [w * .32, h * .33];
    const [dW, dH] = [.5 * (w - regionW), regionH + .005 * h];
    this.colorSetRegions = colorSets.map((type, index) => {
      const rx = x + (index % 2 ? dW : -dW);
      const ry = y + (Math.floor(index / 2) - 1) * dH;
      const region = this.add.image(rx, ry, 'REGIONS', `${type}2`);
      region.setData('type', type);
      this.setDevTest(region);
      region.setInteractive(pixelExactConfig)
        .on('pointerdown', () => this.setAudio(`color_${type}`));
      return region;
    });
  }
}