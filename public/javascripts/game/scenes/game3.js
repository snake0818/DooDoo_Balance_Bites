import BaseScene from './BaseScene.js';
export default class Game3 extends BaseScene {
  constructor() {
    super({ key: 'Game3' });
    this.rhymeImage = null;
    this.foodImage = null;
  }
  preload() { this.initializeLoad(); }
  create() {
    this.setSceneShow();
    this.setBackground(`bg_${this.scene.key}`);
    this.setGuideAudio();
    this.setBackMenuButton();
    this.allocationFoods({ count: 10 });
    this.setRhymeList();
  }
  // ********** 方法 ********** //
  setRhymeList() {
    const { cX, cY, W, H } = this.view;
    // 唸謠表
    const Rhymes = this.add.image(cX, cY, 'RHYME_LISTS', 'rhyme_list');
    this.fitImageElement(Rhymes, W * .45, H * .5);

    const btn_W = W * .158;
    const btn_H = H * .19;
    const rhymeTimeline = [
      { time: 63, frame: 1 },
      { time: 110, frame: 2 },
      { time: 157, frame: 3 },
      { time: 203, frame: 4 },
      { time: 248, frame: 5 },
      { time: 292, frame: 6 },
      { time: 337 },
    ];
    let isRhymePlaying = false;

    // 建立唸謠表導讀播放按鈕
    const btn_play_rhyme = this.add.image(cX * .82, cY * 1.63, 'BTNS', 'play_rhyme');
    this.fitImageElement(btn_play_rhyme, btn_W, btn_H);
    btn_play_rhyme.setInteractive(pixelExactConfig).on('pointerdown', () => {
      if (isRhymePlaying) return;
      isRhymePlaying = true;
      this.interruptCurrentAudio();

      let currentIndex = 0;
      let lastFrame = 0;
      let lastUpdateTime = 0;
      const updateInterval = 100;

      const rhymePlay = () => {
        // 限制刷新週期
        if (this.time.now - lastUpdateTime < updateInterval) return;
        lastUpdateTime = this.time.now;
        // 依播放進度更換唸謠表
        const currentTime = Math.floor(this.audio.seek * 10);
        const nextCue = rhymeTimeline[currentIndex];
        if (nextCue && currentTime >= nextCue.time && nextCue.frame !== lastFrame) {
          Rhymes.setTexture('RHYME_LISTS', `rhyme_list${nextCue.frame}`);
          lastFrame = nextCue.frame;
          if (nextCue.frame) currentIndex++;
        }
      }
      this.setAudio('rhyme_list', {
        concurrent: () => this.events.on('update', rhymePlay),
        subsequent: () => this.events.off('update', rhymePlay)
      });
    });
    this.setDevTest(btn_play_rhyme, { isRelationship: true });
    // 建立開始遊玩按鈕
    const btn_play = this.add.image(cX * 1.18, cY * 1.63, 'BTNS', 'game_play');
    this.fitImageElement(btn_play, btn_W, btn_H);
    btn_play.setInteractive(pixelExactConfig).once('pointerdown', () => {
      this.interruptCurrentAudio();
      this.setBackground(`bg_${this.scene.key}_1`);
      Rhymes.destroy();
      btn_play_rhyme.destroy();
      btn_play.destroy();
      this.setPlaying();
    });
    this.setDevTest(btn_play, { isRelationship: true });
  }
  setPlaying() {
    const { cX, cY, W, H } = this.view;

    const setStage = () => { // 關卡內容設置
      this.rhymeImage.setVisible(false);
      const type = this.getCategory(this.foodList[currentStageNum]);
      this.rhymeImage.audioKey = `rhyme_${type}`;
      this.rhymeImage.setTexture('RHYMES', `rhyme_${type}`);
      this.foodImage.setTexture(type.toUpperCase(), this.foodList[currentStageNum++]);
    };

    const btn_W = W * .158;
    const btn_H = H * .19;
    var currentStageNum = 0; // 當前關卡變數
    this.rhymeImage = this.add.image(cX, cY * 1.19);
    this.fitImageElement(this.rhymeImage, W * .35, H * .045);
    this.foodImage = this.add.image(cX, cY * .7);
    this.fitImageElement(this.foodImage, H * .02, H * .02);
    setStage(); // 初次執行

    // 建立顯示解答按鈕
    const answer = this.add.image(cX * .82, cY * 1.5, 'BTNS', 'answer');
    this.fitImageElement(answer, btn_W, btn_H);
    answer.setInteractive(pixelExactConfig).on('pointerdown', () => {
      this.rhymeImage.setVisible(true);
      this.setAudio(this.rhymeImage.audioKey);
    });
    this.setDevTest(answer, { isRelationship: true });

    // 建立進入下一關按鈕
    const next = this.add.image(cX * 1.18, cY * 1.5, 'BTNS', 'next');
    this.fitImageElement(next, btn_W, btn_H);
    next.setInteractive(pixelExactConfig).on('pointerdown', () => {
      // 檢測是否完成所有關卡
      if (currentStageNum >= this.foodList.length) {
        answer.destroy();
        next.destroy();
        this.rhymeImage.destroy();
        this.foodImage.destroy();
        this.setEndGameView();
        return;
      }
      setStage();
    });
    this.setDevTest(next, { isRelationship: true });
  }
}