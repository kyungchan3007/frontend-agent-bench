import Phaser from "phaser";
import { drawBadge, drawCart, drawConstructionSign, drawPart, drawRoomPart, drawScaffold } from "../art/effect-art";
import { WORLD } from "../art/floor-art";
import { buildState } from "../data/build-state";
import { PARTS, type TeamId } from "../data/parts";
import type { Choice } from "../data/rooms";

const TEAMS: Record<TeamId, number> = { search: 106, loans: 320, stats: 534 };
const TEAM_IDS = Object.keys(TEAMS) as TeamId[];
const PART_ROW: Record<TeamId, number> = { search: 106, loans: 320, stats: 527 };
const PART_GAP = 26;
const PART_Y = 40;
const BUILD_MS = 2400;
const CACHE_NAMES: Record<TeamId, string> = { search: "검색", loans: "대출", stats: "통계" };
const CACHE_X: Record<TeamId, number> = { search: 465, loans: 520, stats: 575 };
const CACHE_Y = 322;
const MONITORS = [56, 146, 262, 466, 556];

// 대화창 내용에 맞춰 층 위에 보여 주는 연출. 실제 측정 결과를 그림으로 표현한다
export class RoomEffects {
  private items: Phaser.GameObjects.GameObject[] = [];
  private timers: Phaser.Time.TimerEvent[] = [];
  private zoomed = false;
  private playing: string | null = null;
  private finishRepair: (() => void) | null = null;
  private readonly screens: Phaser.GameObjects.Rectangle[];
  private readonly roomParts = new Map<string, Phaser.GameObjects.Image>();
  repairedPart: string | null = null;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly player: Phaser.GameObjects.Sprite,
  ) {
    const add = (key: string, c: HTMLCanvasElement) => scene.textures.addCanvas(key, c);
    add("fx-scaffold", drawScaffold());
    add("fx-sign", drawConstructionSign());
    add("fx-cart", drawCart());
    for (const [team, name] of Object.entries(CACHE_NAMES)) {
      add(`cache-${team}-hit`, drawBadge(`${name} HIT`, "g2", "wt"));
      add(`cache-${team}-miss`, drawBadge(`${name} MISS`, "r2", "wt"));
      add(`cache-${team}-empty`, drawBadge(`${name} 비움`, "m3", "wt"));
    }
    add("fx-unused", drawBadge("안 쓰는 Button 스타일", "r2", "wt"));
    add("fx-files", drawBadge("파일 +11~14개", "y1", "o"));
    add("fx-kb", drawBadge("+25.8KB", "r2", "wt"));
    add("fx-same", drawBadge("10~35바이트 차이", "g2", "wt"));
    add("fx-part-b", drawPart("b1", "b2"));
    add("fx-part-g", drawPart("g1", "g2"));
    add("fx-part-r", drawPart("r1", "r2"));
    add("fx-applied", drawBadge("새 부품 적용", "g2", "wt"));
    add("fx-css-only", drawBadge("CSS만 변경", "y1", "o"));
    for (const part of PARTS) {
      add(`part-${part.id}-old`, drawRoomPart(part.id, "m2"));
      add(`part-${part.id}-new`, drawRoomPart(part.id, "g1"));
    }
    // 어느 팀이 무엇을 쓰는지 벽에 보이도록, 쓰는 부품만 방에 달아 둔다
    for (const team of TEAM_IDS) {
      const used = PARTS.filter((part) => part.users.includes(team));
      used.forEach((part, i) => {
        const x = PART_ROW[team] + (i - (used.length - 1) / 2) * PART_GAP;
        this.roomParts.set(`${team}-${part.id}`, scene.add.image(x, PART_Y, `part-${part.id}-old`));
      });
    }
    // 고른 색은 대화창을 닫아도 남도록 모니터 위에 따로 둔다
    this.screens = MONITORS.map((x) => scene.add.rectangle(x + 13, 84.5, 22, 13).setAlpha(0.75).setVisible(false));
  }

  play(id: string, page: number) {
    // 고른 직후에도 불리므로, 같은 쪽이면 진행 중인 연출을 지우지 않는다
    const key = `${id}:${page}`;
    if (key === this.playing) return;
    this.playing = key;
    this.clear();
    if (id === "design" || (id === "parts" && page === 1)) this.zoomOut();
    else if (id === "stats" && page === 0) this.bounce("fx-unused", 533, 64);
    else if (id === "crate") this.crate(page);
  }

  // 대화창에서 고른 결과를 층에 반영한다
  choose(roomId: string, choice: Choice) {
    if (roomId === "parts") this.repair(choice.id);
    if (roomId === "cache") this.showCache(choice.id);
    if (roomId !== "design" || !choice.swatch) return;
    const color = Number.parseInt(choice.swatch.slice(1), 16);
    this.screens.forEach((screen) => screen.setFillStyle(color).setVisible(true));
  }

  stop() {
    this.playing = null;
    this.clear();
    this.zoomIn();
  }

  private clear() {
    this.finishRepair?.();
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

  // 세 팀 모두 공사한 뒤, 쓰는 방의 부품만 새것으로 바꾼다
  private repair(partId: string) {
    const part = PARTS.find(({ id }) => id === partId)!;
    this.repairedPart = partId;
    buildState.markStale("repair");
    const site: Phaser.GameObjects.Image[] = [];
    TEAM_IDS.forEach((team, n) => {
      const x = TEAMS[team];
      const scaffold = this.scene.add.image(x, 96, "fx-scaffold").setAlpha(0);
      // 화면이 절반으로 줄어드니, 글자는 두 배로 그려 읽을 수 있게 한다
      const sign = this.scene.add.image(x, 96, "fx-sign").setScale(2).setAlpha(0);
      site.push(scaffold, sign);
      this.items.push(scaffold, sign);
      this.scene.tweens.add({ targets: [scaffold, sign], alpha: 1, delay: 300 + n * 350, duration: 200 });
    });
    const cart = this.scene.add.image(320, 212, "fx-cart");
    this.items.push(cart);
    this.scene.tweens.chain({
      targets: cart,
      tweens: [
        { x: 106, duration: 800 },
        { x: 534, duration: 1300 },
        { x: 320, duration: 800 },
      ],
      loop: -1,
    });

    const install = () => {
      this.finishRepair = null;
      for (const team of part.users) this.roomParts.get(`${team}-${part.id}`)?.setTexture(`part-${part.id}-new`);
    };
    this.finishRepair = install;
    this.timers.push(
      this.scene.time.delayedCall(BUILD_MS, () => {
        install();
        site.forEach((o) => o.destroy());
        this.scene.tweens.killTweensOf(cart);
        cart.destroy();
        for (const team of TEAM_IDS) {
          const key = part.users.includes(team) ? "fx-applied" : "fx-css-only";
          const badge = this.scene.add.image(TEAMS[team], 96, key).setScale(2);
          this.items.push(badge);
        }
      }),
    );
  }

  // 세 팀의 빌드 결과를 캐시 상자 위에 표시한다
  private showCache(action: string) {
    const state = action === "clear" ? "empty" : buildState.lastHit ? "hit" : "miss";
    for (const team of TEAM_IDS) this.bounce(`cache-${team}-${state}`, CACHE_X[team], CACHE_Y);
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
