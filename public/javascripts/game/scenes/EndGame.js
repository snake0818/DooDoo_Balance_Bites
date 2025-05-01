import BaseScene from './BaseScene.js';
export default class EndGame extends BaseScene {
  constructor() {
    super({ key: 'EndGame' });
  }
  preload() { this.initializeLoad(); }
  init({ CurrentGamingID = 'Menu' }) {
    this.CurrentGamingID = CurrentGamingID;
  }
  create() {
    const { cX, cY, W, H } = this.view;
    this.setBackground('bg_End');
    // 延遲出現按鈕
    this.time.delayedCall(500, () => {
      const backWeb = this.add.image(cX * .8, cY * 1.5, 'BTNS', 'home_page');
      const playAgain = this.add.image(cX * 1.2, cY * 1.5, 'BTNS', 'play_again');
      const btn_W = W * .158;
      const btn_H = H * .19;
      this.fitImageElement(backWeb, { maxWidth: btn_W, maxHeight: btn_H });
      this.fitImageElement(playAgain, { maxWidth: btn_W, maxHeight: btn_H });
      backWeb.setInteractive(pixelExactConfig)
        .once('pointerdown', () => this.scene.start('Menu'));
      playAgain.setInteractive(pixelExactConfig)
        .once('pointerdown', () => { this.scene.start(this.CurrentGamingID) });
    });
  }
}