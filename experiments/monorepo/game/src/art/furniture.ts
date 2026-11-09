import type { Color } from "./palette";
import type { Painter } from "./painter";

type Bin = [Color, Color];

export function window(p: Painter, x: number, y: number) {
  p.box(x, y, 44, 24, "sc", "wt", "m3");
  p.rect(x + 21, y + 1, 2, 22, "wt");
  for (let j = y + 3; j < y + 22; j += 3) p.rect(x + 1, j, 42, 1, "b1");
  p.rect(x + 3, y + 2, 8, 18, "rgba(255,255,255,.25)");
  p.rect(x - 2, y + 23, 48, 2, "wt");
  p.rect(x - 2, y + 25, 48, 1, "m2");
}

export function sign(p: Painter, cx: number, y: number, label: string) {
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.font = "9px Galmuri9";
  const w = Math.ceil(probe.measureText(label).width) + 14;
  const x = Math.round(cx - w / 2);
  p.box(x, y, w, 16, "tr", "tb2", "o");
  p.rect(x + 2, y + 2, w - 4, 12, "#3a2c2a");
  p.text(label, x + 7, y + 3, "y1");
}

export function shelf(p: Painter, x: number, y: number, bins: Bin[]) {
  p.shadow(x + 1, y + 46, 30, 4);
  p.rect(x, y, 2, 48, "m3");
  p.rect(x + 30, y, 2, 48, "m3");
  p.box(x + 1, y, 30, 4, "m1", "wt", "m2");
  [16, 32, 44].forEach((d, k) => {
    p.box(x + 1, y + d, 30, 3, "m1", "wt", "m2");
    if (k < 2)
      [0, 1].forEach((i) => {
        const [c, dark] = bins[(k * 2 + i) % bins.length];
        p.box(x + 3 + i * 14, y + d - 9, 12, 9, c, "wt", dark);
        p.rect(x + 6 + i * 14, y + d - 6, 6, 3, "wt");
      });
  });
}

export function bookshelf(p: Painter, x: number, y: number) {
  p.shadow(x + 1, y + 44, 38, 4);
  p.box(x, y, 40, 46, "tb2", "tb1", "tbK");
  const cols: Color[] = ["b1", "r1", "g1", "y1", "pu", "wt", "b2", "r2"];
  [3, 18, 33].forEach((d, row) => {
    p.rect(x + 2, y + d, 36, 12, "tbK");
    p.rect(x + 2, y + d + 11, 36, 2, "tb1");
    for (let i = 0; i < 9; i++) {
      const h = 9 - ((i * 7 + row * 3) % 3);
      const c = cols[(i * 3 + row * 5) % cols.length];
      p.rect(x + 3 + i * 4, y + d + 11 - h, 3, h, c);
    }
  });
}

export function desk(p: Painter, x: number, y: number, w = 60) {
  p.shadow(x + 2, y + 22, w, 5);
  p.box(x, y, w, 8, "tb1", "y1", "tb2");
  p.box(x + 1, y + 8, w - 2, 12, "tb2", "tbK", "tbK");
  p.box(x + 4, y + 20, 5, 6, "m3", "m2");
  p.box(x + w - 9, y + 20, 5, 6, "m3", "m2");
}

export function workbench(p: Painter, x: number, y: number, w: number) {
  p.shadow(x + 2, y + 30, w, 6);
  p.box(x, y, w, 8, "tb1", "y1", "tb2");
  p.box(x + 1, y + 8, w - 2, 16, "tb2", "tbK", "tbK");
  const step = Math.floor((w - 16) / 3);
  for (let i = 8; i + 22 < w - 4; i += step) {
    p.box(x + i, y + 11, 22, 10, "wd2", "wd1", "tbK");
    p.rect(x + i + 9, y + 15, 4, 2, "y2");
  }
  p.box(x + 4, y + 24, 5, 8, "m3", "m2");
  p.box(x + w - 9, y + 24, 5, 8, "m3", "m2");
}

export function monitor(p: Painter, x: number, y: number) {
  p.box(x, y, 26, 18, "m3", "m2", "o");
  p.rect(x + 2, y + 2, 22, 13, "sc2");
  p.rect(x + 3, y + 3, 12, 1, "sc");
  p.rect(x + 3, y + 6, 18, 1, "sc");
  p.rect(x + 3, y + 9, 9, 1, "y1");
  p.rect(x + 3, y + 12, 15, 1, "sc");
  p.rect(x + 11, y + 18, 4, 3, "m2");
  p.box(x + 6, y + 20, 14, 3, "m2", "m1");
}

export function part(p: Painter, x: number, y: number, c: Color, d: Color) {
  p.box(x, y, 8, 6, c, "wt", d);
  p.rect(x + 3, y + 2, 2, 2, d);
}

export function crate(p: Painter, x: number, y: number) {
  p.shadow(x + 2, y + 24, 32, 5);
  p.box(x, y + 6, 32, 22, "wd2", "wd1", "tbK");
  for (let j = y + 11; j < y + 26; j += 5) p.rect(x + 1, j, 30, 1, "tbK");
  p.rect(x + 4, y + 6, 2, 22, "tbK");
  p.rect(x + 26, y + 6, 2, 22, "tbK");
  p.box(x + 2, y + 1, 8, 8, "b1", "wt", "b2");
  p.box(x + 11, y - 3, 8, 10, "g1", "wt", "g2");
  p.box(x + 21, y + 1, 8, 8, "r1", "wt", "r2");
  p.box(x + 8, y + 13, 16, 9, "wt", undefined, "m1");
  p.rect(x + 11, y + 16, 10, 1, "m3");
  p.rect(x + 11, y + 18, 7, 1, "m3");
}

export function plant(p: Painter, x: number, y: number) {
  p.shadow(x + 1, y + 23, 16, 3);
  p.box(x + 4, y + 15, 10, 9, "r2", "r1", "o");
  p.rect(x + 3, y + 14, 12, 2, "o");
  p.rect(x + 4, y + 15, 10, 1, "r1");
  const L = [[7, 0, 4, 3], [4, 2, 4, 3], [10, 2, 4, 3], [2, 5, 4, 3], [12, 5, 4, 3], [5, 6, 8, 4], [3, 9, 12, 3], [6, 11, 6, 3]];
  L.forEach((a) => p.rect(x + a[0] - 1, y + a[1] - 1, a[2] + 2, a[3] + 2, "o"));
  L.forEach((a) => p.rect(x + a[0], y + a[1], a[2], a[3], "g2"));
  [[8, 1], [5, 3], [11, 3], [3, 6], [13, 6], [7, 7], [10, 8], [5, 10], [12, 10]].forEach((a) => p.rect(x + a[0], y + a[1], 2, 1, "g1"));
  p.rect(x + 8, y + 11, 2, 3, "g3");
}

export function rug(p: Painter, x: number, y: number, w: number, h: number) {
  p.rect(x, y, w, h, "rg2");
  p.rect(x + 2, y + 2, w - 4, h - 4, "rg1");
  for (let i = 4; i < w - 4; i += 4) p.rect(x + i, y + 1, 2, 1, "rg3");
  p.rect(x + 6, y + 6, w - 12, 1, "rg3");
  p.rect(x + 6, y + h - 7, w - 12, 1, "rg3");
}

export function cabinet(p: Painter, x: number, y: number) {
  p.shadow(x + 1, y + 32, 24, 4);
  p.box(x, y, 24, 34, "m1", "wt", "m2");
  [3, 13, 23].forEach((d) => {
    p.box(x + 3, y + d, 18, 8, "m2", "m1", "m3");
    p.rect(x + 9, y + d + 3, 6, 2, "wt");
  });
}

export function cart(p: Painter, x: number, y: number) {
  p.shadow(x + 1, y + 22, 28, 4);
  p.box(x, y + 4, 28, 14, "b2", "b1", "o");
  p.rect(x + 2, y + 8, 24, 1, "b1");
  p.box(x + 3, y - 2, 10, 8, "y1", "wt", "y2");
  p.box(x + 14, y, 10, 6, "g1", "wt", "g2");
  p.rect(x + 3, y + 18, 5, 5, "o");
  p.rect(x + 20, y + 18, 5, 5, "o");
  p.rect(x + 4, y + 19, 3, 3, "m1");
  p.rect(x + 21, y + 19, 3, 3, "m1");
  p.rect(x + 26, y - 6, 2, 12, "m3");
}

export function whiteboard(p: Painter, x: number, y: number) {
  p.box(x, y, 56, 32, "wt", undefined, "m1");
  [[8, 14], [18, 8], [28, 18], [38, 11]].forEach(([dx, h]) => {
    p.rect(x + dx, y + 26 - h, 7, h, "b1");
    p.rect(x + dx, y + 26 - h, 7, 1, "b2");
  });
  p.rect(x + 5, y + 26, 46, 1, "m3");
  p.rect(x + 20, y + 32, 16, 2, "m2");
}

export function paintShelf(p: Painter, x: number, y: number) {
  p.shadow(x + 1, y + 44, 46, 4);
  p.box(x, y, 48, 46, "tb2", "tb1", "tbK");
  const can: Color[][] = [["r1", "r2"], ["y1", "y2"], ["g1", "g2"], ["b1", "b2"], ["pu", "pu2"], ["wt", "m1"]];
  [4, 25].forEach((d, row) => {
    p.rect(x + 2, y + d, 44, 18, "tbK");
    p.rect(x + 2, y + d + 18, 44, 2, "tb1");
    for (let i = 0; i < 3; i++) {
      const [c, k] = can[(i + row * 3) % can.length];
      p.box(x + 4 + i * 14, y + d + 5, 12, 13, "m1", "wt", "m2");
      p.rect(x + 5 + i * 14, y + d + 9, 10, 6, c);
      p.rect(x + 5 + i * 14, y + d + 14, 10, 1, k);
    }
  });
}

export function easel(p: Painter, x: number, y: number) {
  p.shadow(x + 2, y + 44, 34, 4);
  p.rect(x + 6, y + 30, 3, 16, "tbK");
  p.rect(x + 29, y + 30, 3, 16, "tbK");
  p.box(x, y, 38, 32, "wt", undefined, "m1");
  const sw: Color[] = ["b1", "g1", "y1", "r1"];
  sw.forEach((c, i) => p.box(x + 4 + i * 8, y + 6, 7, 18, c));
}

export function serverRack(p: Painter, x: number, y: number, lit: boolean[]) {
  p.shadow(x + 1, y + 44, 30, 4);
  p.box(x, y, 32, 46, "m3", "m2", "o");
  [4, 14, 24, 34].forEach((d, i) => {
    p.box(x + 3, y + d, 26, 8, "m2", "m1", "m3");
    p.rect(x + 6, y + d + 3, 12, 2, "m3");
    p.rect(x + 22, y + d + 3, 3, 3, lit[i] ? "g1" : "r2");
  });
}

export function storageBox(p: Painter, x: number, y: number, c: Color, d: Color) {
  p.shadow(x + 1, y + 20, 26, 4);
  p.box(x, y, 26, 22, c, "wt", d);
  p.rect(x + 8, y + 8, 10, 5, "wt");
  p.rect(x + 10, y + 10, 6, 1, d);
}

export function counter(p: Painter, x: number, y: number, w: number) {
  p.shadow(x + 2, y + 26, w, 5);
  p.box(x, y, w, 8, "wt", undefined, "m1");
  p.box(x + 1, y + 8, w - 2, 18, "b2", "b1", "o");
  for (let i = 10; i < w - 6; i += 18) p.rect(x + i, y + 12, 8, 10, "b1");
}

export function books(p: Painter, x: number, y: number) {
  p.box(x, y + 6, 18, 4, "r1", "wt", "r2");
  p.box(x + 1, y + 3, 16, 4, "b1", "wt", "b2");
  p.box(x + 2, y, 14, 4, "g1", "wt", "g2");
}
