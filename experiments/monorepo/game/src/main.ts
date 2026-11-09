import "galmuri/dist/galmuri.css";
import Phaser from "phaser";
import { FloorScene } from "./scenes/floor-scene";
import "./style.css";

// 그림 안의 간판 글자에 글꼴이 필요해서, 글꼴을 먼저 불러온 뒤 게임을 시작한다
await document.fonts.load("9px Galmuri9");

// 게임 내부 해상도는 320x208(16x16 타일 20x13칸)이고, 3배로 키워 보여 준다
const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  width: 320,
  height: 208,
  zoom: 3,
  pixelArt: true,
  scene: [FloorScene],
});

if (import.meta.env.DEV) Object.assign(window, { __game: game });
