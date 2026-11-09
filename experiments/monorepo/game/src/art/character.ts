import { Painter } from "./painter";

// 캐릭터 시트: 16x24 칸. 세로줄은 방향(아래 · 왼쪽 · 오른쪽 · 위), 가로줄은 걸음 3프레임
export const FRAME = { w: 16, h: 24 };
export const DIRS = ["down", "left", "right", "up"] as const;
export type Dir = (typeof DIRS)[number];

function drawFrame(p: Painter, x: number, y: number, dir: Dir, step: number) {
  const left = step === 1 ? -1 : 0;
  const right = step === 2 ? -1 : 0;
  p.box(x + 4, y + 17 + left, 4, 7 - left, "pants", "pants2");
  p.box(x + 8, y + 17 + right, 4, 7 - right, "pants", "pants2");
  p.box(x + 2, y + 9, 12, 10, "r1", "wt", "r2");
  if (dir === "down") p.rect(x + 7, y + 10, 2, 8, "wt");
  p.box(x + 1, y + 10 + right, 3, 8, "sk", undefined, "sk2");
  p.box(x + 12, y + 10 + left, 3, 8, "sk", undefined, "sk2");
  p.box(x + 3, y + 1, 10, 10, "sk", undefined, "sk2");
  p.rect(x + 3, y, 10, 4, "hr");
  p.rect(x + 3, y, 10, 1, "o");
  p.rect(x + 2, y + 2, 2, 5, "hr");
  p.rect(x + 12, y + 2, 2, 5, "hr");
  if (dir === "up") p.rect(x + 3, y + 3, 10, 6, "hr");
  if (dir === "down") {
    p.rect(x + 5, y + 6, 1, 2, "o");
    p.rect(x + 10, y + 6, 1, 2, "o");
  }
  if (dir === "left") p.rect(x + 4, y + 6, 1, 2, "o");
  if (dir === "right") p.rect(x + 11, y + 6, 1, 2, "o");
}

export function drawCharacterSheet(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = FRAME.w * 3;
  canvas.height = FRAME.h * DIRS.length;
  const p = new Painter(canvas);
  DIRS.forEach((dir, row) => {
    for (let step = 0; step < 3; step++) drawFrame(p, step * FRAME.w, row * FRAME.h, dir, step);
  });
  return canvas;
}
