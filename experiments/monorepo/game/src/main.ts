import Phaser from "phaser";
import { FloorScene } from "./scenes/floor-scene";
import "./style.css";

// 게임 내부 해상도는 320x208(16x16 타일 20x13칸)이고, 3배로 키워 보여 준다
new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  width: 320,
  height: 208,
  zoom: 3,
  pixelArt: true,
  scene: [FloorScene],
});
