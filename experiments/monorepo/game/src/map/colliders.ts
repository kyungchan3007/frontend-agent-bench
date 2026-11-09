// 지나갈 수 없는 영역. [x, y, 너비, 높이], 월드 좌표
export type Rect = readonly [number, number, number, number];

const DOOR_CENTERS = [106, 320, 534];
const DOOR_HALF = 16;

// 복도와 방 사이 벽은 문 자리만 비워 둔다
function wallWithDoors(y: number, h: number): Rect[] {
  const rects: Rect[] = [];
  let x = 0;
  for (const c of DOOR_CENTERS) {
    rects.push([x, y, c - DOOR_HALF - x, h]);
    x = c + DOOR_HALF;
  }
  rects.push([x, y, 640 - x, h]);
  return rects;
}

const WALLS: Rect[] = [
  [0, 0, 4, 416],
  [636, 0, 4, 416],
  [0, 410, 640, 6],
  [0, 0, 640, 50],
  [210, 0, 6, 176],
  [424, 0, 6, 176],
  [210, 240, 6, 176],
  [424, 240, 6, 176],
  ...wallWithDoors(171, 5),
  ...wallWithDoors(240, 48),
];

const FURNITURE: Rect[] = [
  [12, 12, 40, 48], [14, 116, 42, 50], [40, 74, 60, 46], [130, 74, 62, 46], [188, 44, 18, 28],
  [370, 12, 40, 48], [244, 74, 130, 46], [240, 126, 30, 34], [222, 44, 18, 28],
  [610, 22, 24, 38], [450, 74, 60, 46], [540, 74, 62, 46], [432, 130, 18, 28],
  [12, 300, 48, 50], [150, 252, 48, 50], [110, 318, 38, 50], [14, 380, 18, 28],
  [344, 254, 32, 52], [384, 254, 32, 52], [262, 306, 96, 50], [372, 345, 34, 34],
  [556, 252, 32, 50], [596, 252, 32, 50], [450, 340, 26, 24], [484, 340, 26, 24], [466, 364, 26, 24], [560, 352, 26, 24], [610, 370, 18, 28],
  [596, 176, 44, 64],
];

export const COLLIDERS: readonly Rect[] = [...WALLS, ...FURNITURE];

// 캐릭터 발밑 상자가 벽이나 가구와 겹치는지 본다
export function hitsCollider(x: number, y: number, w: number, h: number): boolean {
  return COLLIDERS.some(([rx, ry, rw, rh]) => x < rx + rw && x + w > rx && y < ry + rh && y + h > ry);
}
