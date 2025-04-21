import BaseScene from './BaseScene.js';
export default class EndGame extends BaseScene {
  constructor() {
    super({ key: 'EndGame' });
  }
  preload() { this.initializeLoad(); }
  init(data) { this.CurrentGamingID = data.CurrentGamingID || 'Menu'; }
  create() {
    const { cX, cY, W, H } = this.view;
    this.setBackground('bg_End');
    // 延遲出現按鈕
    this.time.delayedCall(500, () => {
      const backWeb = this.add.image(cX * .78, cY * 1.55, 'BTNS', 'home_page');
      const playAgain = this.add.image(cX * 1.22, cY * 1.55, 'BTNS', 'play_again');
      this.fitImageElement(backWeb, W * .35, H * .18);
      this.fitImageElement(playAgain, W * .35, H * .18);
      backWeb.setInteractive(pixelExactConfig)
        .once('pointerdown', () => this.scene.start('Menu'));
      playAgain.setInteractive(pixelExactConfig)
        .once('pointerdown', () => this.scene.start(this.CurrentGamingID));
    });
  }
}