import type { Choice, Page } from "./rooms";

type StaleReason = "repair" | "clear";

// 층 전체의 빌드 상태. 실제 빌드를 돌리지 않고 터보레포의 판단 방식만 따라 한다
class BuildState {
  stale: StaleReason | null = null;
  lastHit = true;

  markStale(reason: StaleReason) {
    this.stale = reason;
  }

  // 빌드하고 나면 결과가 상자에 들어가므로 다음 빌드는 HIT가 된다
  build() {
    const reason = this.stale;
    this.lastHit = reason === null;
    this.stale = null;
    return reason;
  }
}

export const buildState = new BuildState();

const NOT_MEASURED = "직접 측정하지 않고 동작 방식으로 판단";

const buildResult = (): Page => {
  const reason = buildState.build();
  if (reason === null) {
    return {
      text: "세 팀 모두 HIT입니다. 다시 짓지 않고 전에 만든 결과를 바로 꺼내 썼습니다.",
      why: "지난번 빌드 뒤로 바뀐 것이 없어서, 같은 결과가 나올 것으로 판단합니다.",
      term: "터보레포 캐시 HIT · 앱 3개",
    };
  }
  if (reason === "repair") {
    return {
      text: "세 팀 모두 MISS입니다. 상자의 결과를 쓰지 못하고 새로 만들어 넣었습니다.",
      why: "부품실이 바뀌어서 전에 빌드할 때와 입력이 달라졌기 때문입니다. 한 번 더 빌드하면 HIT가 나옵니다.",
      term: "터보레포 캐시 MISS · 앱 3개",
      evidence: { label: "#49", url: "https://github.com/kyungchan3007/frontend-architecture/issues/49" },
    };
  }
  return {
    text: "세 팀 모두 MISS입니다. 상자가 비어 있어서 처음부터 새로 만들어 넣었습니다.",
    why: "꺼내 쓸 결과가 없기 때문입니다. 한 번 더 빌드하면 HIT가 나옵니다.",
    term: `터보레포 캐시 MISS · ${NOT_MEASURED}`,
  };
};

const clearResult = (): Page => {
  buildState.markStale("clear");
  return {
    text: "상자를 비웠습니다. 이제 꺼내 쓸 결과가 없습니다.",
    why: "빌드 결과는 .turbo/cache 폴더에 저장됩니다. 이 폴더를 지우면 다음 빌드는 처음부터 다시 합니다.",
    term: `.turbo/cache 삭제 · ${NOT_MEASURED}`,
  };
};

export const cacheChoices: Choice[] = [
  { id: "build", label: "다시 빌드", result: buildResult },
  { id: "clear", label: "캐시 비우기", result: clearResult },
];

// 부품실을 고친 뒤 캐시 보관실에 들어오면 먼저 보여 준다
export function cacheNote(roomId: string): Page[] {
  if (roomId !== "cache" || buildState.stale !== "repair") return [];
  return [
    {
      text: "부품실이 바뀌어서, 상자에 있는 결과는 지금 코드와 맞지 않게 되었습니다.",
      why: "터보레포는 입력이 달라지면 전에 만든 결과를 쓰지 않습니다.",
      term: "패키지 변경 → 다음 빌드 MISS",
    },
  ];
}
