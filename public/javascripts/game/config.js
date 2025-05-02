import Menu from './scenes/Menu.js';
import EndGame from './scenes/EndGame.js';
import Game1 from './scenes/game1.js';
import Game2 from './scenes/game2.js';
import Game3 from './scenes/game3.js';
import Game4 from './scenes/game4.js';
import Game5 from './scenes/game5.js';
import Game6 from './scenes/game6.js';
const config = {
  // 渲染方式
  type: Phaser.CANVAS,
  // 掛載容器
  parent: 'app',
  // 畫面尺寸
  width: WIDTH,
  height: HEIGHT,
  // 背景顏色
  backgroundColor: '#fff',
  // 縮放模式
  scale: { mode: Phaser.Scale.FIT },
  // 場景
  scene: [
    Menu,
    EndGame,
    Game1,
    Game2,
    Game3,
    Game4,
    Game5,
    Game6,
  ]
}
const game = new Phaser.Game(config);

// 檢查頁面是否被遮擋
document.addEventListener('visibilitychange', function () {
  // 當頁面被遮擋時暫停遊戲
  if (document.hidden) game.paused = true;
  // 當頁面恢復可見時繼續遊戲
  else game.paused = false;
});