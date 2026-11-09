import type { Rect } from "../map/colliders";

const ISSUE = "https://github.com/kyungchan3007/frontend-architecture/issues";

export type Page = {
  text: string; // 쉬운 설명
  term: string; // 실제 용어와 수치
  why?: string; // 결과가 그렇게 나온 이유
  choices?: Choice[]; // 있으면 이 쪽에서 직접 고른다
};

export type Choice = {
  id: string;
  label: string;
  swatch: string; // 선택지에 보여 줄 색
  result: Page; // 고른 뒤 보여 줄 내용
};

export type Room = {
  id: string;
  title: string;
  // 캐릭터 발이 이 영역에 있으면 살펴볼 수 있다. 앞에 있는 방이 먼저 선택된다
  zone: Rect;
  pages: Page[];
  evidence: { label: string; url: string };
};

// 1단계 packages/design-tokens의 실제 색 값
const primaryColor = (id: string, label: string, swatch: string): Choice => ({
  id,
  label,
  swatch,
  result: {
    text: `대표 색을 ${label}으로 바꾸었더니 세 팀의 화면이 함께 바뀌었습니다.`,
    why: "세 팀 모두 색 값을 직접 적지 않고, 디자인실에 있는 같은 이름(primary)을 가져다 쓰기 때문입니다.",
    term: `--primary: var(--palette-${id})`,
  },
});

export const ROOMS: Room[] = [
  {
    id: "search",
    title: "도서 검색팀",
    zone: [60, 120, 150, 50],
    pages: [
      { text: "이 층의 위쪽 방 세 곳은 서비스 앱입니다. 각 팀은 공용 부품을 가져다 자기 화면을 만듭니다.", term: "apps/search · 메뉴 2개 (도서 검색 · 도서 상세)" },
    ],
    evidence: { label: "#59", url: `${ISSUE}/59` },
  },
  {
    id: "loans",
    title: "대출팀",
    zone: [216, 120, 208, 50],
    pages: [
      { text: "대출팀도 같은 구조입니다. 앱 안에서 쓰는 공통 코드는 이 방 안에 두고, 앱끼리 나눠 쓰는 코드만 복도 건너 작업실에 둡니다.", term: "apps/loans · 메뉴 2개 (대출 현황 · 연체 관리)" },
    ],
    evidence: { label: "#59", url: `${ISSUE}/59` },
  },
  {
    id: "stats",
    title: "통계팀",
    zone: [430, 120, 206, 50],
    pages: [
      { text: "통계팀은 Button을 쓰지 않습니다. 그런데 스타일 파일에는 쓰지 않는 Button 스타일까지 들어 있었습니다.", term: "apps/stats · CSS에 공용 UI 클래스 전체 포함" },
      { text: "JS는 쓰는 컴포넌트만 들어왔지만, CSS는 앱마다 달라지지 않았습니다.", term: "JS tree-shaking 동작 · Tailwind는 등록한 소스의 클래스를 모두 생성" },
    ],
    evidence: { label: "#49", url: `${ISSUE}/49` },
  },
  {
    id: "design",
    title: "디자인실",
    zone: [4, 288, 206, 122],
    pages: [
      {
        text: "색을 한 곳에서 관리합니다. 대표 색을 골라 보세요.",
        term: "packages/design-tokens · 색 토큰 20개 (Palette 10 + Semantic 10)",
        choices: [
          primaryColor("blue-600", "파랑", "#2563eb"),
          primaryColor("green-600", "초록", "#16a34a"),
          primaryColor("amber-600", "주황", "#d97706"),
          primaryColor("red-600", "빨강", "#dc2626"),
        ],
      },
    ],
    evidence: { label: "#47", url: `${ISSUE}/47` },
  },
  {
    id: "crate",
    title: "부품 상자",
    zone: [360, 330, 64, 80],
    pages: [
      { text: "상자(index.ts)에서 부품 하나만 꺼내도, 개발 중에는 상자에 든 파일을 모두 읽었습니다.", term: "barrel · 개발 서버 첫 화면 요청 앱마다 11~14개 증가" },
      { text: "배포할 때는 쓰지 않는 코드가 지워져서, 일반 컴포넌트는 크기 차이가 거의 없었습니다.", term: "빌드 결과물 차이 10~35바이트" },
      { text: "다만 불러오는 순간 실행되는 코드가 있으면, 쓰지 않는 파일도 배포까지 남았습니다.", term: "Chart.js 등록 코드 · 약 25.8KB 증가 · sideEffects 표시로 거의 같아짐" },
    ],
    evidence: { label: "#61", url: `${ISSUE}/61#issuecomment-6737472383` },
  },
  {
    id: "parts",
    title: "부품실",
    zone: [216, 288, 208, 122],
    pages: [
      { text: "여러 팀이 함께 쓰는 부품을 만드는 곳입니다. 공용 부품은 목적별로 나눠 둡니다.", term: "packages/ui · packages/api" },
      { text: "Button 하나를 고쳤더니 세 팀이 모두 다시 빌드되었습니다. 통계팀은 Button을 쓰지 않는데도요.", term: "터보레포는 패키지 단위로 변경을 판단" },
    ],
    evidence: { label: "#49", url: `${ISSUE}/49` },
  },
  {
    id: "cache",
    title: "캐시 보관실",
    zone: [430, 288, 206, 122],
    pages: [
      { text: "바뀐 것이 없으면 다시 짓지 않고, 전에 만든 결과를 여기서 바로 꺼내 씁니다.", term: "터보레포 캐시 HIT" },
    ],
    evidence: { label: "#45", url: `${ISSUE}/45` },
  },
  {
    id: "stairs",
    title: "계단",
    zone: [556, 176, 40, 64],
    pages: [
      { text: "여기까지가 1단계 층입니다. 다음 층에서는 Next.js로 옮기고, 공용 부품을 목적별로 나누어 다시 비교해 보려고 합니다.", term: "2단계 후보 · 목적별 패키지 분리 · Next.js 전환" },
    ],
    evidence: { label: "#34", url: `${ISSUE}/34` },
  },
];

// 캐릭터 발 위치에 해당하는 방을 찾는다
export function roomAt(x: number, y: number): Room | undefined {
  return ROOMS.find(({ zone: [rx, ry, rw, rh] }) => x >= rx && x < rx + rw && y >= ry && y < ry + rh);
}
