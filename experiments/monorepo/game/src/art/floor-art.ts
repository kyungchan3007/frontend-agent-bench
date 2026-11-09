import * as F from "./furniture";
import { hash, Painter } from "./painter";
import { C } from "./palette";

// 건물 한 층 전체 그림. 위쪽 방 3개(앱), 복도, 아래쪽 방 3개(패키지 · 캐시)
export const WORLD = { w: 640, h: 416 };
const TOP = { y: 0, h: 176 };
const HALL = { y: 176, h: 64 };
const BOTTOM = { y: 240, h: 176 };
const COLS = [0, 213, 427, 640];
const DOOR_W = 32;

function woodFloor(p: Painter, x: number, y: number, w: number, h: number) {
  p.ctx.save();
  p.ctx.beginPath();
  p.ctx.rect(x, y, w, h);
  p.ctx.clip();
  const c = [C.wd1, C.wd2, C.wd3];
  for (let py = y; py < y + h; py += 12) {
    const off = hash(py, 7) % 48;
    for (let px = x - 64 + off; px < x + w; px += 64) {
      p.rect(px, py, 64, 12, c[hash(px, py) % 3]);
      p.rect(px, py + 11, 64, 1, C.wdL);
      p.rect(px, py, 1, 11, C.wdL);
      const k = hash(px + 3, py) % 5;
      if (k < 3) {
        p.rect(px + 10 + k * 6, py + 4, 9, 1, C.wdK);
        p.rect(px + 34, py + 7, 6, 1, C.wdK);
      }
    }
  }
  p.ctx.restore();
}

function hallFloor(p: Painter) {
  for (let y = HALL.y; y < HALL.y + HALL.h; y += 16)
    for (let x = 0; x < WORLD.w; x += 16) {
      p.rect(x, y, 16, 16, (x + y) % 32 === 0 ? C.gy1 : C.gy2);
      p.rect(x, y + 15, 16, 1, C.gyL);
      p.rect(x + 15, y, 1, 16, C.gyL);
    }
}

// 방의 뒷벽. 문이 있으면 그 부분은 비워 둔다
function backWall(p: Painter, x: number, y: number, w: number, door?: number) {
  p.rect(x, y, w, 6, "tr");
  p.rect(x, y + 6, w, 30, "w1");
  for (let i = x; i < x + w; i += 16) p.rect(i, y + 6, 1, 30, "w2");
  p.rect(x, y + 36, w, 2, "tr");
  p.rect(x, y + 38, w, 8, "w3");
  for (let i = x; i < x + w; i += 8) p.rect(i, y + 38, 1, 8, "w2");
  p.rect(x, y + 46, w, 2, "tr");
  p.rect(x, y + 48, w, 3, "rgba(42,35,52,.28)");
  if (door !== undefined) {
    const dx = door - DOOR_W / 2;
    p.rect(dx - 2, y, DOOR_W + 4, 48, "tr");
    woodFloor(p, dx, y, DOOR_W, 51);
    p.rect(dx, y + 48, DOOR_W, 1, "y2");
  }
}

function walls(p: Painter) {
  COLS.slice(1, -1).forEach((x) => {
    p.rect(x - 3, TOP.y, 6, TOP.h, "tr");
    p.rect(x - 3, BOTTOM.y, 6, BOTTOM.h, "tr");
  });
  p.rect(0, 0, 4, WORLD.h, "tr");
  p.rect(WORLD.w - 4, 0, 4, WORLD.h, "tr");
  p.rect(0, WORLD.h - 6, WORLD.w, 6, "tr");
  for (let i = 0; i < 3; i++) {
    const cx = (COLS[i] + COLS[i + 1]) / 2;
    p.rect(COLS[i], TOP.y + TOP.h - 5, cx - DOOR_W / 2 - COLS[i], 5, "tr");
    p.rect(cx + DOOR_W / 2, TOP.y + TOP.h - 5, COLS[i + 1] - cx - DOOR_W / 2, 5, "tr");
  }
}

function stairs(p: Painter) {
  const x = 592;
  const y = HALL.y;
  p.rect(x, y, 44, HALL.h, "m3");
  for (let i = 0; i < 6; i++) {
    p.rect(x + 2 + i * 7, y + 4, 7, HALL.h - 8, i % 2 ? "m1" : "m2");
    p.rect(x + 2 + i * 7, y + 4, 1, HALL.h - 8, "o");
  }
  F.sign(p, 560, y + 4, "계단");
}

function hallArrows(p: Painter) {
  for (let x = 40; x < 560; x += 48) {
    const y = HALL.y + 30;
    p.rect(x, y, 2, 6, "y1");
    p.rect(x + 2, y + 1, 2, 4, "y1");
    p.rect(x + 4, y + 2, 2, 2, "y1");
  }
}

function searchRoom(p: Painter, cx: number) {
  F.sign(p, cx, 12, "도서 검색팀");
  F.bookshelf(p, 12, 12);
  F.bookshelf(p, 14, 116);
  F.window(p, 156, 10);
  F.desk(p, 40, 92);
  F.monitor(p, 56, 76);
  F.desk(p, 130, 92);
  F.monitor(p, 146, 76);
  F.books(p, 172, 84);
  F.plant(p, 188, 44);
}

function loanRoom(p: Painter, cx: number) {
  F.sign(p, cx, 12, "대출팀");
  F.window(p, 226, 10);
  F.bookshelf(p, 370, 12);
  F.counter(p, 244, 92, 130);
  F.monitor(p, 262, 76);
  F.books(p, 330, 84);
  F.cart(p, 240, 132);
  F.plant(p, 222, 44);
}

function statsRoom(p: Painter, cx: number) {
  F.sign(p, cx, 12, "통계팀");
  F.whiteboard(p, 444, 12);
  F.cabinet(p, 610, 22);
  F.window(p, 564, 10);
  F.desk(p, 450, 92);
  F.monitor(p, 466, 76);
  F.desk(p, 540, 92);
  F.monitor(p, 556, 76);
  F.plant(p, 432, 130);
}

function designRoom(p: Painter, cx: number) {
  const y = BOTTOM.y;
  F.sign(p, cx - 54, y + 14, "디자인실");
  F.paintShelf(p, 12, y + 60);
  F.paintShelf(p, 150, y + 12);
  F.rug(p, 70, y + 96, 120, 58);
  F.easel(p, 110, y + 78);
  F.plant(p, 14, y + 140);
}

function partsRoom(p: Painter, cx: number) {
  const y = BOTTOM.y;
  F.sign(p, cx - 56, y + 14, "부품실");
  F.shelf(p, 344, y + 14, [["b1", "b2"], ["g1", "g2"], ["y1", "y2"], ["r1", "r2"]]);
  F.shelf(p, 384, y + 14, [["pu", "pu2"], ["b1", "b2"], ["r1", "r2"], ["g1", "g2"]]);
  F.rug(p, 262, y + 124, 96, 40);
  F.workbench(p, 262, y + 82, 96);
  F.monitor(p, 270, y + 66);
  F.part(p, 302, y + 76, "b1", "b2");
  F.part(p, 312, y + 76, "g1", "g2");
  F.part(p, 322, y + 78, "r1", "r2");
  F.crate(p, 372, y + 108);
}

function cacheRoom(p: Painter, cx: number) {
  const y = BOTTOM.y;
  F.sign(p, cx - 56, y + 14, "캐시 보관실");
  F.serverRack(p, 556, y + 12, [true, true, false, true]);
  F.serverRack(p, 596, y + 12, [true, false, true, true]);
  F.storageBox(p, 450, y + 100, "y1", "y2");
  F.storageBox(p, 484, y + 100, "b1", "b2");
  F.storageBox(p, 466, y + 124, "g1", "g2");
  F.storageBox(p, 560, y + 112, "r1", "r2");
  F.plant(p, 610, y + 130);
}

export function drawFloor(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = WORLD.w;
  canvas.height = WORLD.h;
  const p = new Painter(canvas);
  for (let i = 0; i < 3; i++) {
    const cx = (COLS[i] + COLS[i + 1]) / 2;
    woodFloor(p, COLS[i], TOP.y, COLS[i + 1] - COLS[i], TOP.h);
    woodFloor(p, COLS[i], BOTTOM.y, COLS[i + 1] - COLS[i], BOTTOM.h);
    backWall(p, COLS[i], TOP.y, COLS[i + 1] - COLS[i]);
    backWall(p, COLS[i], BOTTOM.y, COLS[i + 1] - COLS[i], cx);
  }
  hallFloor(p);
  walls(p);
  hallArrows(p);
  stairs(p);
  const centers = [0, 1, 2].map((i) => (COLS[i] + COLS[i + 1]) / 2);
  searchRoom(p, centers[0]);
  loanRoom(p, centers[1]);
  statsRoom(p, centers[2]);
  designRoom(p, centers[0]);
  partsRoom(p, centers[1]);
  cacheRoom(p, centers[2]);
  return canvas;
}
