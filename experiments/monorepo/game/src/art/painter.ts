import { C, type Color } from "./palette";

// 캔버스에 픽셀 단위로 그리는 도구. 글자는 글꼴의 반투명 경계를 없애 도트로 찍는다
export class Painter {
  readonly ctx: CanvasRenderingContext2D;
  constructor(readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
    this.ctx.imageSmoothingEnabled = false;
  }
  rect(x: number, y: number, w: number, h: number, c: Color | string) {
    this.ctx.fillStyle = C[c as Color] ?? c;
    this.ctx.fillRect(x, y, w, h);
  }
  // 외곽선이 있는 상자. light는 윗면 밝은 줄, dark는 아랫면 어두운 줄
  box(x: number, y: number, w: number, h: number, fill: Color, light?: Color, dark?: Color) {
    this.rect(x, y, w, h, "o");
    this.rect(x + 1, y + 1, w - 2, h - 2, fill);
    if (light) this.rect(x + 1, y + 1, w - 2, 1, light);
    if (dark) this.rect(x + 1, y + h - 2, w - 2, 1, dark);
  }
  shadow(x: number, y: number, w: number, h: number) {
    this.rect(x, y, w, h, "sh");
  }
  text(s: string, x: number, y: number, c: Color, size = 9): number {
    const t = document.createElement("canvas");
    t.width = 240;
    t.height = 20;
    const k = t.getContext("2d", { willReadFrequently: true })!;
    k.font = `${size}px Galmuri9`;
    k.textBaseline = "top";
    k.fillStyle = "#000";
    k.fillText(s, 0, 0);
    const d = k.getImageData(0, 0, 240, 20).data;
    this.ctx.fillStyle = C[c];
    let right = 0;
    for (let j = 0; j < 20; j++)
      for (let i = 0; i < 240; i++)
        if (d[(j * 240 + i) * 4 + 3] > 100) {
          this.ctx.fillRect(x + i, y + j, 1, 1);
          right = Math.max(right, i + 1);
        }
    return right;
  }
}

export const hash = (a: number, b: number) => ((a * 73856093) ^ (b * 19349663)) >>> 0;
