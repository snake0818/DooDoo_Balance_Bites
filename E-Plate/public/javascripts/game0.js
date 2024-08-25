const MainMenu = {
  key: 'MainMenu',
  preload: function () {
    GeneralPreload(this);
    this.load.image('btn_gameStart', `${PATH_UI}/buttons/btn_game_start.png`);
    this.load.image('btn_games', `${PATH_UI}/buttons/btns_game.png`);
  },
  create: function () {
    const Size_BTN = 1.5 * imageSize; // 按鈕圖片大小
    // 設置背景
    const bg = this.add.image(GCX, GCY, 'start').setDisplaySize(WIDTH, HEIGHT);
    // 設置'開始遊戲'按鈕
    this.time.delayedCall(100, () => {
      const btn_game_start = this.add.image(GCX, 1.45 * GCY, 'btn_gameStart').setDisplaySize(2 * Size_BTN, Size_BTN);
      // '開始遊戲'按鈕點擊事件
      btn_game_start.setInteractive().on('pointerup', () => {
        // 清除背景及按鈕
        bg.destroy();
        btn_game_start.destroy();
        // 選擇遊戲
        selectGame();
      });
    });

    const selectGame = () => {
      // 互動區域設置
      const interactive = this.add.rectangle(GCX, GCY, .88 * WIDTH, .5 * HEIGHT, '0xaa0000', SHOW).setDepth(-1);
      const [IA_x, IA_cx, IA_X, IA_y, IA_cy, IA_Y, IA_W, IA_H] = [
        interactive.x - .5 * interactive.width,
        interactive.x,
        interactive.x + .5 * interactive.width,
        interactive.y - .5 * interactive.height,
        interactive.y,
        interactive.y + .5 * interactive.height,
        interactive.width,
        interactive.height
      ];
      // 選擇遊戲按鈕設置
      const games = this.add.image(GCX, GCY, 'btn_games').setDisplaySize(WIDTH, .5 * HEIGHT);
      const [btn_w, btn_h] = [.25 * IA_W, .4 * IA_H];
      const typeRegions = [
        { bounds: null, name: 'game1', value: 1 },
        { bounds: null, name: 'game2', value: 2 },
        { bounds: null, name: 'game3', value: 3 },
        { bounds: null, name: 'game4', value: 4 },
        { bounds: null, name: 'game5', value: 5 },
        { bounds: null, name: 'game6', value: 6 },
      ];
      for (let i = 0; i < typeRegions.length; i++) {
        const dx = IA_x + .375 * IA_W * (i % 3) + .5 * btn_w;
        const dy = (i < 3) ? IA_y + .6 * btn_h : IA_Y - .6 * btn_h;
        typeRegions[i].bounds = this.add.rectangle(dx, dy, btn_w, btn_h, '0x055765').setDepth(-1);
        // 點擊事件
        typeRegions[i].bounds.setInteractive().on('pointerdown', () => {
          // 清除當前情境之元件
          interactive.destroy();
          games.destroy();
          typeRegions.forEach(element => { element.bounds.destroy(); });
          GamingName = typeRegions[i].name;
          // 啟用指定遊戲場景
          this.scene.start(GamingName);
        });
      }
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: 'app',
  scene: [MainMenu, game1, game2, game3, game4, game5, game6]
}
const game = new Phaser.Game(config);