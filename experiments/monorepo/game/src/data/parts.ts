import type { Choice, Page } from "./rooms";

export type TeamId = "search" | "loans" | "stats";

export type Part = {
  id: string;
  label: string;
  object: string; // 조사를 붙인 이름
  component: string; // 실제 컴포넌트
  users: TeamId[]; // 1단계 앱 코드에서 실제로 가져다 쓰는 팀
};

export const TEAMS: Record<TeamId, string> = { search: "도서 검색팀", loans: "대출팀", stats: "통계팀" };

export const PARTS: Part[] = [
  { id: "switch", label: "스위치", object: "스위치를", component: "Button", users: ["search", "loans"] },
  { id: "board", label: "게시판", object: "게시판을", component: "Card", users: ["search", "stats"] },
  { id: "sign", label: "표지판", object: "표지판을", component: "StatusBadge", users: ["search", "loans", "stats"] },
  { id: "gauge", label: "계기판", object: "계기판을", component: "Chart", users: ["stats"] },
];

// 실제로 고쳐 보며 측정한 부품은 Button이다
const measured = (part: Part) =>
  part.component === "Button" ? "Button을 고쳐 측정" : "Button 측정 결과와 같다고 봄";

const usersText = (part: Part) =>
  part.users.length === 3 ? "세 팀 모두 쓰는 부품이라 모두 새 부품으로 바뀌었습니다." : `쓰는 팀(${part.users.map((id) => TEAMS[id]).join(" · ")})만 새 부품으로 바뀌었습니다.`;

export const partChoices: Choice[] = PARTS.map((part) => ({
  id: part.id,
  label: part.label,
  result: {
    text: `${part.object} 고쳤더니 세 팀 모두 공사를 시작했습니다. ${usersText(part)}`,
    why: "터보레포는 부품 하나가 아니라 부품실(패키지) 전체가 바뀌었는지를 봅니다. 세 팀 모두 이 부품실을 쓰고 있어서 다시 빌드합니다.",
    term: `실제로는 ${part.component} · packages/ui 수정 · ${measured(part)}`,
  },
}));

// 공사 뒤 각 팀 방에서 먼저 보여 줄 설명
export function repairNote(partId: string | null, team: string): Page[] {
  const part = PARTS.find(({ id }) => id === partId);
  if (!part || !(team in TEAMS)) return [];
  if (part.users.includes(team as TeamId)) {
    return [
      {
        text: `이 팀은 ${part.object} 써서 공사 뒤 새 부품으로 바뀌었습니다.`,
        why: "고친 코드를 실제로 쓰고 있어서 JS와 CSS가 모두 달라집니다.",
        term: `${part.component} 사용 · ${measured(part)}`,
      },
    ];
  }
  return [
    {
      text: `이 팀은 ${part.object} 쓰지 않아서 화면은 그대로입니다. 그런데 공사는 했습니다.`,
      why: "쓰지 않는 코드라 JS는 그대로지만, Tailwind가 부품실 폴더 전체를 훑어서 CSS는 달라집니다.",
      term: `@source "../../../packages/ui/src" · ${measured(part)}`,
    },
  ];
}
