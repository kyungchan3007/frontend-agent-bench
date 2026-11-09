import Phaser from "phaser";
import { drawBadge, drawCart, drawConstructionSign, drawPart, drawScaffold } from "../art/effect-art";
import { WORLD } from "../art/floor-art";

const TEAMS = [106, 320, 534];
const MONITORS = [56, 146, 262, 466, 556];
const SCREEN_COLORS = [0xdc6660, 0xf4c653, 0x79c47a, 0x8a6bc0];

// 대화창 내용에 맞춰 층 위에 보여 주는 연출. 실제 측정 결과를 그림으로 표현한다
export class RoomEffects {
  private items: Phaser.GameObjects.GameObject[] = [];
  private timers: Phaser.Time.TimerEvent[] = [];
  private zoomed = false;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly player: Phaser.GameObjects.Sprite,
  ) {
    const add = (key: string, c: HTMLCanvasElement) => scene.textures.addCanvas(key, c);
    add("fx-scaffold", drawScaffold());
    add("fx-sign", drawConstructionSign());
    add("fx-cart", drawCart());
    add("fx-hit", drawBadge("캐시 HIT", "g2", "wt"));
    add("fx-unused", drawBadge("안 쓰는 Button 스타일", "r2", "wt"));
    add("fx-files", drawBadge("파일 +11~14개", "y1", "o"));
    add("fx-kb", drawBadge("+25.8KB", "r2", "wt"));
    add("fx-same", drawBadge("10~35바이트 차이", "g2", "wt"));
    add("fx-part-b", drawPart("b1", "b2"));
    add("fx-part-g", drawPart("g1", "g2"));
    add("fx-part-r", drawPart("r1", "r2"));
  }

  play(id: string, page: number) {
    this.clear();
    if (id === "design") this.screenColors();
    else if (id === "parts" && page === 1) this.rebuildAll();
    else if (id === "cache") this.bounce("fx-hit", 500, 322);
    else if (id === "stats" && page === 0) this.bounce("fx-unused", 533, 64);
    else if (id === "crate") this.crate(page);
  }

  stop() {
    this.clear();
    this.zoomIn();
  }

  private clear() {
    this.items.forEach((o) => o.destroy());
    this.items = [];
    this.timers.forEach((t) => t.remove());
    this.timers = [];
  }

  // 방 여러 곳의 변화를 함께 보여 주려고 층 전체가 보이게 물러난다
  private zoomOut() {
    if (this.zoomed) return;
    this.zoomed = true;
    const cam = this.scene.cameras.main;
    cam.stopFollow();
    cam.pan(WORLD.w / 2, WORLD.h / 2 + 26, 350, "Sine.easeInOut");
    cam.zoomTo(0.5, 350, "Sine.easeInOut");
  }

  private zoomIn() {
    if (!this.zoomed) return;
    this.zoomed = false;
    const cam = this.scene.cameras.main;
    cam.zoomTo(1, 250, "Sine.easeInOut");
    cam.startFollow(this.player, true);
  }

  // 세 팀의 모니터 화면이 함께 바뀐다
  private screenColors() {
    this.zoomOut();
    const screens = MONITORS.map((x) => {
      const r = this.scene.add.rectangle(x + 13, 84.5, 22, 13, SCREEN_COLORS[0]);
      this.items.push(r);
      return r;
    });
    let i = 0;
    this.timers.push(
      this.scene.time.addEvent({
        delay: 650,
        loop: true,
        callback: () => {
          i = (i + 1) % SCREEN_COLORS.length;
          screens.forEach((b) => b.setFillStyle(SCREEN_COLORS[i]));
        },
      }),
    );
  }

  private rebuildAll() {
    this.zoomOut();
    TEAMS.forEach((x, n) => {
      const scaffold = this.scene.add.image(x, 96, "fx-scaffold").setAlpha(0);
      // 화면이 절반으로 줄어드니, 글자는 두 배로 그려 읽을 수 있게 한다
      const sign = this.scene.add.image(x, 96, "fx-sign").setScale(2).setAlpha(0);
      this.items.push(scaffold, sign);
      this.scene.tweens.add({ targets: [scaffold, sign], alpha: 1, delay: 500 + n * 450, duration: 200 });
    });
    const cart = this.scene.add.image(320, 212, "fx-cart");
    this.items.push(cart);
    this.scene.tweens.chain({
      targets: cart,
      tweens: [
        { x: 106, duration: 900 },
        { x: 534, duration: 1500 },
        { x: 320, duration: 900 },
      ],
      loop: -1,
    });
  }

  private bounce(key: string, x: number, y: number) {
    const b = this.scene.add.image(x, y, key);
    this.items.push(b);
    this.scene.tweens.add({ targets: b, y: y - 3, duration: 350, yoyo: true, repeat: -1 });
  }

  private crate(page: number) {
    ["fx-part-b", "fx-part-g", "fx-part-r"].map((key, i) => {
      const o = this.scene.add.image(380 + i * 10, 342, key);
      this.items.push(o);
      this.scene.tweens.add({ targets: o, y: 328 - (i % 2) * 6, duration: 420, delay: i * 90, yoyo: true, repeat: -1 });
      return o;
    });
    this.bounce(["fx-files", "fx-same", "fx-kb"][page], 388, 306);
  }
}
