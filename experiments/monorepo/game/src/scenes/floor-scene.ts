import Phaser from "phaser";

// 건물 한 층 장면. 맵 · 이동 · 충돌은 다음 커밋에서 이 장면에 추가한다
export class FloorScene extends Phaser.Scene {
  constructor() {
    super("floor");
  }

  create() {
    this.cameras.main.setBackgroundColor("#b67f4d");
  }
}
