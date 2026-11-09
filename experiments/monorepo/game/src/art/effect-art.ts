import * as F from "./furniture";
import { Painter } from "./painter";
import type { Color } from "./palette";

// Galmuri9는 10px에서 글자 모양이 도트 격자와 정확히 맞는다
const GLYPH = 10;

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

// 공사 표시: 비계와 안내판
export function drawScaffold() {
  const c = canvas(72, 52);
  const p = new Painter(c);
  for (const x of [2, 24, 46, 66]) p.rect(x, 0, 3, 52, "y2");
  for (const y of [8, 26, 44]) p.rect(0, y, 72, 3, "y1");
  return c;
}

// 층 전체를 보여 줄 때 쓰는 큰 글자 안내판
export function drawConstructionSign() {
  const c = canvas(46, 16);
  const p = new Painter(c);
  p.box(0, 0, 46, 16, "y1");
  p.text("공사 중", 6, 3, "o", GLYPH);
  return c;
}

// 말풍선 모양 수치 표시
export function drawBadge(label: string, fill: Color, ink: Color) {
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.font = `${GLYPH}px Galmuri9`;
  const w = Math.ceil(probe.measureText(label).width) + 12;
  const c = canvas(w, 20);
  const p = new Painter(c);
  p.box(0, 0, w, 16, fill);
  p.rect(w / 2 - 2, 15, 5, 2, "o");
  p.rect(w / 2 - 1, 17, 3, 2, "o");
  p.text(label, 6, 3, ink, GLYPH);
  return c;
}

// 방에 달린 부품. accent 색으로 고치기 전과 후를 구분한다
export function drawRoomPart(kind: string, accent: Color) {
  const c = canvas(24, 20);
  const p = new Painter(c);
  if (kind === "switch") {
    p.box(6, 1, 12, 18, "wt", undefined, "m1");
    p.box(9, 4, 6, 12, "m2");
    p.rect(10, 5, 4, 5, accent);
  } else if (kind === "board") {
    p.box(0, 2, 24, 16, "tb2", "tb1", "tbK");
    p.rect(2, 4, 20, 12, "wd1");
    p.rect(4, 6, 7, 8, accent);
    p.rect(13, 6, 7, 3, "wt");
    p.rect(13, 11, 7, 3, "wt");
  } else if (kind === "sign") {
    p.rect(11, 0, 2, 4, "m3");
    p.box(1, 4, 22, 14, accent);
    p.rect(5, 8, 14, 2, "wt");
    p.rect(5, 12, 9, 2, "wt");
  } else {
    p.box(1, 1, 22, 18, "m3", "m2", "o");
    p.rect(4, 4, 16, 12, "#1d2340");
    p.rect(6, 11, 3, 3, accent);
    p.rect(10, 8, 3, 6, accent);
    p.rect(14, 6, 3, 8, accent);
  }
  return c;
}

export function drawCart() {
  const c = canvas(32, 32);
  F.cart(new Painter(c), 1, 8);
  return c;
}

export function drawPart(fill: Color, dark: Color) {
  const c = canvas(8, 6);
  F.part(new Painter(c), 0, 0, fill, dark);
  return c;
}
