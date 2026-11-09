// 게임 전체에서 쓰는 색. 색을 제한해서 그림의 통일감을 맞춘다
export const C = {
  o: "#2a2334", tr: "#5e4236", w1: "#dccbaa", w2: "#c9b392", w3: "#ab9173",
  wd1: "#b67f4d", wd2: "#b07a49", wd3: "#bb8452", wdL: "#9a6a3f", wdK: "#a97345",
  tb1: "#b98450", tb2: "#946338", tbK: "#6e4529",
  gy1: "#8f96a3", gy2: "#858c99", gyL: "#747b88",
  m1: "#b8c0cc", m2: "#858fa1", m3: "#596375",
  b1: "#62a3dc", b2: "#3b70aa", g1: "#79c47a", g2: "#3f8a55", g3: "#2b6340",
  r1: "#dc6660", r2: "#a43f46", y1: "#f4c653", y2: "#c98f2e", pu: "#8a6bc0", pu2: "#62489a",
  wt: "#f5f0e4", sk: "#f1c49c", sk2: "#d09873", hr: "#4a3327",
  sc: "#86dbe8", sc2: "#3f8fa6", pants: "#3a4a78", pants2: "#50639c",
  rg1: "#5b6f96", rg2: "#4a5b80", rg3: "#7385ad", sh: "rgba(42,35,52,.30)",
} as const;
export type Color = keyof typeof C;
