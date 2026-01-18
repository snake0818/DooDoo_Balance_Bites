import BaseScene from './BaseScene.js';
export default class Menu extends BaseScene {
  constructor() { super({ key: 'Menu' }) }
  preload() {
    this.load.image('bg_start', `${PATH.UI}/bg_start.webp`);
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
  FirstInteract() {
    const { cX, cY, W, H } = this.view;
    // 半透明黑底遮罩
    const rect = this.add.rectangle(cX, cY, W, H, 0x0, 0.8);
    // 提示文字
    const startTextZh = this.add.text(cX, cY - H * .1, '\n點擊以開始遊戲', {
      fontSize: H * .2, color: '#ffffff', align: 'center'
    }).setOrigin(0.5);
    const startTextEn = this.add.text(cX, cY + H * .1, '\nClick to start', {
      fontSize: H * .1, color: '#ffffff', align: 'center'
    }).setOrigin(0.5);
    return new Promise(resolve => {
      rect.setInteractive()
        .once('pointerup', () => {
          rect.destroy();
          startTextZh.destroy();
          startTextEn.destroy();
          resolve();
        });
    })
  }
  async waitForUserToStart() { // 初次進入首頁之引導動作
    const { cX, cY, W } = this.view;
    const background = this.add.image(cX, cY, 'bg_start').setDepth(-1);
    await this.FirstInteract(); // 首此點擊事件，防止網頁阻擋音效播放
    this.setGuideAudio('audio_start');
    // 建立'開始遊戲'按鈕
    const btn_game_start = this.add.image(cX, cY * 1.45, 'BTNS', 'game_start');
    this.fitImageElement(btn_game_start, { maxWidth: W * 0.15 });
    // 傳入 resolve，點擊後觸發
    return new Promise(resolve => {
      btn_game_start.setInteractive(pixelExactConfig)
        .once('pointerup', () => {
          this.interruptCurrentAudio();
          btn_game_start.destroy();
          background.destroy();
          resolve(); // 通知繼續
        });
      this.setDevTest(btn_game_start, { isRelationship: true });
    });
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