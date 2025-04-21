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
    this.setGuideAudio();
    this.setBackMenuButton();
    this.setInteractiveArea(1, 1.1, .9, .72);
    const { x, y, width: w, height: h } = this.interactiveArea;
    // 建立食物餐盤
    this.plate = this.add.image(x * .75, y, 'plateFull');
    this.fitImageElement(this.plate, w * .7, h);
    this.allocationFoods({ usePlateRestriction: true });
    this.setRegion();
    this.setPositionMap();
    this.setFoodCabinet(x * 1.6, y, w * .3, h, this.foodTypeRegions, this.positionMapping);
  }
  // ********** 方法 ********** //
  setRegion() { // 建立分類區域
    const { x, y, width: w, height: h } = this.interactiveArea;
    const baseX = x - w / 2;
    const regionConfigs = [
      { xRatio: .435, yRatio: 0.635, wRatio: .12, hRatio: .19 },
      { xRatio: .275, yRatio: 1.068, wRatio: .12, hRatio: .85 },
      { xRatio: .575, yRatio: 0.640, wRatio: .08, hRatio: .20 },
      { xRatio: .500, yRatio: 1.446, wRatio: .25, hRatio: .28 },
      { xRatio: .500, yRatio: 1.020, wRatio: .25, hRatio: .24 },
      { xRatio: .117, yRatio: 1.068, wRatio: .12, hRatio: .85 },
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
      nut: [{ x: -0.075, y: -0.21, sizeMulti: 0.3 }],
      vegetable: [
        { y: -0.03 },
        { y: 0.175 },
        { y: 0.38 }
      ],
      dairy: [
        { y: -0.25, sizeMulti: 0.3 },
        { y: 0.2, sizeMulti: 0.3 }
      ],
      fruit: [
        { x: -0.22, y: 0.1 },
        { x: 0.15, y: 0.1 }
      ],
      meat: [
        { y: 0.2, x: -0.3 },
        { y: 0.2 },
        { y: 0.2, x: 0.3 }
      ],
      grain: [
        { y: -0.03 },
        { y: 0.175 },
        { y: 0.38 }
      ],
    };
    this.positionMapping = [];
    foodTypes.forEach((type, index) => {
      const { x, y, width: w, height: h } = this.foodTypeRegions[index];
      const positions = positionOffsets[type].map(
        ({ x: ox = 0, y: oy = 0, sizeMulti }) => {
          const px = x + ox * w;
          const py = y + oy * h;
          if (this.DEV_MODE) { // Debug: 用小方塊可視化這個位置
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