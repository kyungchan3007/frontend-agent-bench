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
