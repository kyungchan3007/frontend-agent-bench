import Phaser from "phaser";
import { DIRS, drawCharacterSheet, FRAME, type Dir } from "../art/character";
import { drawFloor, WORLD } from "../art/floor-art";
import { roomAt } from "../data/rooms";
import { hitsCollider } from "../map/colliders";
import { Dialog } from "../ui/dialog";
import { RoomEffects } from "./effects";

const SPEED = 90;
const FEET = { w: 10, h: 6 };
const START = { x: 320, y: 214 };
const DIALOG_ROOM = 52;

type Keys = Record<"up" | "down" | "left" | "right", Phaser.Input.Keyboard.Key>;

// 건물 한 층 장면. 방향키로 걷고, 벽과 가구에 막힌다
export class FloorScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private keys!: Keys;
  private facing: Dir = "down";
  private actionPressed = false;
  private dialog!: Dialog;
  private effects!: RoomEffects;

  constructor() {
    super("floor");
  }

  create() {
    this.textures.addCanvas("floor", drawFloor());
    // 캔버스로 만든 캐릭터 시트를 칸마다 잘라 프레임으로 등록한다
    const sheet = this.textures.addCanvas("player", drawCharacterSheet())!;
    for (let row = 0; row < DIRS.length; row++)
      for (let col = 0; col < 3; col++) sheet.add(row * 3 + col, 0, col * FRAME.w, row * FRAME.h, FRAME.w, FRAME.h);
    DIRS.forEach((dir, row) => {
      const first = row * 3;
      this.anims.create({
        key: `walk-${dir}`,
        frames: [first, first + 1, first, first + 2].map((frame) => ({ key: "player", frame })),
        frameRate: 8,
        repeat: -1,
      });
    });

    this.add.image(0, 0, "floor").setOrigin(0);
    // 기준점을 발밑으로 두어 충돌 계산과 맞춘다
    this.player = this.add.sprite(START.x, START.y, "player", 0).setOrigin(0.5, 1);
    // 맵 아래쪽에 여백을 두어, 대화창이 캐릭터를 가리지 않게 한다
    this.cameras.main.setBounds(0, 0, WORLD.w, WORLD.h + DIALOG_ROOM);
    this.cameras.main.startFollow(this.player, true);

    const kb = this.input.keyboard!;
    const code = Phaser.Input.Keyboard.KeyCodes;
    this.keys = kb.addKeys({ up: code.UP, down: code.DOWN, left: code.LEFT, right: code.RIGHT }) as Keys;
    // 아주 짧게 눌러도 놓치지 않도록 키를 누른 순간을 기록해 둔다
    kb.addKey(code.SPACE).on("down", () => {
      this.actionPressed = true;
    });
    this.dialog = new Dialog(document.getElementById("game")!);
    this.effects = new RoomEffects(this, this.player);
  }

  update(_time: number, delta: number) {
    const pressed = this.actionPressed;
    this.actionPressed = false;
    if (this.dialog.isOpen) {
      this.standStill();
      if (pressed) {
        this.dialog.next();
        this.syncEffects();
      }
      return;
    }

    const room = roomAt(this.player.x, this.player.y);
    this.dialog.showHint(room?.title ?? null);
    if (pressed && room) {
      this.dialog.open(room);
      this.syncEffects();
      return;
    }

    const dx = Number(this.keys.right.isDown) - Number(this.keys.left.isDown);
    const dy = Number(this.keys.down.isDown) - Number(this.keys.up.isDown);
    if (dx === 0 && dy === 0) {
      this.standStill();
      return;
    }

    // 대각선이 더 빨라지지 않게 길이를 맞춘다
    const length = Math.hypot(dx, dy);
    const step = (SPEED * delta) / 1000 / length;
    this.moveAxis(dx * step, 0);
    this.moveAxis(0, dy * step);

    this.facing = dy > 0 ? "down" : dy < 0 ? "up" : dx < 0 ? "left" : "right";
    this.player.anims.play(`walk-${this.facing}`, true);
  }

  private syncEffects() {
    const now = this.dialog.current;
    if (now) this.effects.play(now.id, now.page);
    else this.effects.stop();
  }

  private standStill() {
    this.player.anims.stop();
    this.player.setFrame(DIRS.indexOf(this.facing) * 3);
  }

  // 축을 나눠 움직여서, 벽을 따라 미끄러지듯 걸을 수 있게 한다
  private moveAxis(dx: number, dy: number) {
    const x = this.player.x + dx;
    const y = this.player.y + dy;
    if (!hitsCollider(x - FEET.w / 2, y - FEET.h, FEET.w, FEET.h)) this.player.setPosition(x, y);
  }
}
