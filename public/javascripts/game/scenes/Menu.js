import BaseScene from './BaseScene.js';
export default class Menu extends BaseScene {
  constructor() { super({ key: 'Menu' }) }
  preload() {
    this.load.image('bg_start', `${PATH.UI}/bg_start.png`);
    this.initializeLoad();
  }
  async create() {
    this.setSceneShow();
    if (!this.firstGuidePlayed) await this.waitForUserToStart();
    this.setBackground('bg_Menu');
    // 建立互動主區塊
    this.setInteractiveArea(1, 1, .75, .5);
    this.setMenuRegion();
    if (!this.firstGuidePlayed) this.setGuideAudio();
    this.firstGuidePlayed = true;
  }
  // ********** 方法 ********** //
  waitForUserToStart() { // 初次進入首頁之引導動作
    const { cX, cY, W, H } = this.view;
    const background = this.add.image(cX, cY, 'bg_start').setDepth(-1);
    this.setGuideAudio('audio_start');
    // 建立'開始遊戲'按鈕
    const btn_game_start = this.add.image(cX, cY * 1.45, 'BTNS', 'game_start');
    this.fitImageElement(btn_game_start, { maxWidth: W * 0.15 });
    const setStartButton = (resolve) => {
      btn_game_start.setInteractive(pixelExactConfig)
        .once('pointerup', () => {
          this.interruptCurrentAudio();
          btn_game_start.destroy();
          background.destroy();
          resolve(); // 通知繼續
        });
      this.setDevTest(btn_game_start, { isRelationship: true });
    };
    // 傳入 resolve，點擊後觸發
    return new Promise(resolve => setStartButton(resolve));
  }
  setMenuRegion() { // 建立各按鈕並設置其滑鼠互動事件
    const { x, y, width: w, height: h } = this.interactiveArea;
    const [btnW, btnH] = [.3 * w, .4 * h];
    const [dW, dH] = [btnW + .05 * w, .5 * (btnH + .1 * h)];
    for (let i = 0; i < 6; i++) {
      const rx = x + (i % 3 - 1) * dW;
      const ry = y + (i < 3 ? -dH : dH);
      const gameNumber = i + 1;
      const region = this.add.image(rx, ry, 'GAME_BTNS', `game${gameNumber}`)
        .setInteractive(pixelExactConfig)
        .on('pointerover', () => this.setAudio(`audio_title${gameNumber}`))
        .on('pointerout', () => this.interruptCurrentAudio())
        .on('pointerup', () => this.interruptCurrentAudio())
        .on('pointerdown', () => {
          this.interruptCurrentAudio();
          this.CurrentGamingID = `Game${gameNumber}`;
          this.scene.start(this.CurrentGamingID);
        });
      this.fitImageElement(region, { maxWidth: btnW, maxHeight: btnH });
      this.setDevTest(region);
    }
  }
}