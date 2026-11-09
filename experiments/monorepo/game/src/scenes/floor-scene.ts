import Phaser from "phaser";
import { drawCharacterSheet, FRAME } from "../art/character";
import { drawFloor, WORLD } from "../art/floor-art";

// 건물 한 층 장면. 그림을 만들어 올린다 (이동과 충돌은 다음 작업에서 추가한다)
export class FloorScene extends Phaser.Scene {
  constructor() {
    super("floor");
  }

  create() {
    this.textures.addCanvas("floor", drawFloor());
    const sheet = drawCharacterSheet();
    const base = this.textures.addCanvas("player-sheet", sheet)!;
    this.textures.addSpriteSheet("player", base as never, { frameWidth: FRAME.w, frameHeight: FRAME.h }, sheet);

    this.add.image(0, 0, "floor").setOrigin(0);
    const player = this.add.sprite(320, 208, "player", 0);
    this.cameras.main.setBounds(0, 0, WORLD.w, WORLD.h);
    this.cameras.main.startFollow(player, true);
  }
}
