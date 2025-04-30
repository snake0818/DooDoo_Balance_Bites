import BaseScene from './BaseScene.js';
export default class Game6 extends BaseScene {
  constructor() {
    super({ key: 'Game6' });
    this.foodTypeRegions = [];
    this.positionMapping = [];
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
    this.plate = this.add.image(x * .75, y, 'plateFull');
    this.fitImageElement(this.plate, { maxWidth: w * .7, maxHeight: h });
    this.allocationFoods({ usePlateRestriction: true });
    this.setRegion();
    this.setPositionMap();
    this.setFoodCabinet(x * 1.6, y, w * .3, h, this.foodTypeRegions, this.positionMapping, .13);
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
  setPositionMap() { // 定義特定放置位置
    const positionOffsets = {
      nut: [{ x: -0.075, y: -0.18, sizeMulti: 0.3 }],
      vegetable: [
        { y: -0.03 },
        { y: 0.17 },
        { y: 0.37 }
      ],
      dairy: [
        { x: 0.12, y: 0.16, sizeMulti: 0.3 },
        { x: -0.2, y: -0.2, sizeMulti: 0.3 }
      ],
      fruit: [
        { x: -0.22, y: 0.18 },
        { x: 0.23, y: 0.18 }
      ],
      meat: [
        { y: 0.2, x: -0.333 },
        { y: 0.2 },
        { y: 0.2, x: 0.333 }
      ],
      grain: [
        { y: -0.03 },
        { y: 0.17 },
        { y: 0.37 }
      ],
    };
    this.positionMapping = [];
    foodTypes.forEach((type, index) => {
      const { x, y, width: w, height: h } = this.foodTypeRegions[index];
      const positions = positionOffsets[type].map(
        ({ x: ox = 0, y: oy = 0, sizeMulti }) => {
          const px = x + ox * w;
          const py = y + oy * h;
          if (DEV_MODE) { // Debug: 用小方塊可視化這個位置
            const fakeElement = this.add.rectangle(px, py, 100, 100);
            this.setDevTest(fakeElement, { color: 0xaa00aa });
          }
          return { x: px, y: py, ...(sizeMulti && { sizeMulti }) };
        }
      );
      this.positionMapping[type] = positions;
    });
  }
}