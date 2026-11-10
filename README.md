<div align="center">

# 🎨 frontend-architecture

**"이게 굳이 필요할까?", "하면 더 좋을까?"**

</div>

---

## 💭 왜 시작했나

현업에서 성능을 측정하고 개선하고, 아키텍처를 개선해 오면서 자주 고민했습니다.

> "이게 굳이 필요할까?", "하면 더 좋을까?"

예를 들어 로직과 훅, API, 타입을 전부 분리해 왔는데, 이 방식이 정말 효율적인지 확신이 서지 않았습니다.

제 경험으로는 프로젝트 규모와 도메인, 팀원이 일하는 방식에 따라 달라지는 것 같습니다. 그중 가장 크게 작용하는 것은 팀원들의 일하는 방식이라고 생각합니다.

그래서 이런 질문에서 출발했습니다.

> 기존 팀원들이 일하는 방향에서, 프로젝트 환경을 어떻게 구성하면 좋을까?

**이전 프로젝트에서 사용한 방식**

- 서비스 3개: 비슷한 UI와 API를 반복해서 사용
  - 여러 서비스가 함께 사용하는 코드 → 공용 패키지
  - 한 서비스에서만 사용하는 코드 → 해당 서비스 안
- 앱 1개: 공통 코드를 앱 안에 배치
  - 공통 UI를 수정한 뒤 다른 화면이 다시 깨지는 일이 반복됐습니다.

**그래서 비교해 보고 있는 것**

- 두 방식 모두 당시 상황에 맞춰 정했지만, 더 나은 방법이 있었는지는 확인해 보지 못했습니다.
- 현업에서 사용하던 아키텍처를 약식으로 구현했습니다.
- 디자인 시스템 · 공통 모듈 · 공용 패키지를 어떻게 나눌지, 공식 문서와 공개된 실제 사례를 근거로 하나씩 비교해 보고 있습니다.

---

## 🤝 작업 방식

- **제가 한 것**
  - 라이브러리 선택과 활용 방식 결정
  - 아키텍처 설계
  - 디자인 시스템 · 공통 모듈의 개선 방향과 피드백
  - 자료 찾기와 분석
  - 측정 스크립트 실행
  - 근거 스크린샷 촬영
- **에이전트의 도움을 받은 것**
  - 코드 작성
  - 측정 스크립트 작성
  - 영문 번역
  - 이슈 · 댓글 다듬기

---

## 🏘️ 서비스 3개를 터보레포로 구성해 보기

현업에서는 세 서비스가 함께 쓰는 코드를 공용 패키지로 분리해서 사용했습니다. 이 방식을 도서 대출 도메인으로 약식 구현하고, 단계마다 개선해 보려고 합니다.

- **앱 3개:** 도서 검색(search) · 대출(loans) · 통계(stats)
- **공용 패키지:** 디자인 토큰(design-tokens) · 공통 컴포넌트(ui) · API(api)
- **진행 방식:** 단계마다 폴더를 따로 두고, 이전 단계 코드는 지우지 않고 남겨 두려고 합니다.

| 단계 | 내용 | 상태 |
|---|---|---|
| 1단계 | 현업 방식 그대로 | 완료 |
| 2단계 | 개선 1 | 논의 예정 |
| 3단계 | 개선 2 | 논의 예정 |

### 1단계: 현업 방식 그대로

#### 왜 apps/와 packages/로 나눌까

**고민:** 현업에서는 문서가 추천하는 구조를 그대로 적용했는데, 왜 이렇게 나누라고 할까?

**생각:** 앱은 배포되는 끝 지점이라 다른 곳에서 가져다 쓰지 않고, 공유 코드는 패키지로 분리해야 빌드 순서와 다시 빌드할 범위를 터보레포가 판단할 수 있다고 봤습니다.

<details>
<summary>자세히 보기</summary>

- 공식 문서 근거와 번역 스크린샷: [#42](https://github.com/kyungchan3007/frontend-architecture/issues/42) · [#43](https://github.com/kyungchan3007/frontend-architecture/issues/43) · [#44](https://github.com/kyungchan3007/frontend-architecture/issues/44)

</details>

#### 디자인 토큰: Tailwind v3에서 v4로

**고민:** 현업에서는 Tailwind v3를 사용했는데, v4에서는 토큰을 어떻게 연결할까?

**생각:** 토큰 이름과 Tailwind 색 이름을 같게 두면 자기 자신을 참조하는 문제가 생겨서, 공개된 사례(shadcn/ui)처럼 토큰 이름과 색 이름을 분리했습니다.

<details>
<summary>자세히 보기</summary>

- 색 토큰 20개: 실제 값 10개 + 쓰임새 이름 10개
- 앱 3개 제목에 같은 토큰 색 적용 확인
- 근거: [#47](https://github.com/kyungchan3007/frontend-architecture/issues/47)

</details>

#### 공통 컴포넌트 패키지: 소스로 사용하기

**고민:** 공용 패키지는 빌드해서 사용해야 할까, 소스로 바로 사용해도 될까?

**생각:** 저장소 안 앱에서만 사용한다면 소스로 바로 사용해도 사용법은 같았습니다. 다만 연결해 보니 예상하지 못한 점이 네 가지 있었습니다.

| 확인한 것 | 결과 |
|---|---|
| Tailwind 클래스 | ui 폴더를 직접 등록해야 적용 |
| Button 하나 수정 | 앱 3개 모두 다시 빌드 |
| 수정 반영(HMR) | 새로고침 없이 약 0.16초 |
| 결과물 크기 | JS는 쓰는 것만, CSS는 전부 포함 |

<details>
<summary>자세히 보기</summary>

- Button을 쓰지 않는 통계 앱도 다시 빌드됐습니다. 터보레포가 패키지 단위로 변경을 판단하기 때문이라고 봤습니다.
- CSS에는 앱이 쓰지 않는 컴포넌트의 스타일까지 들어갔습니다.
- Button에 새 크기를 추가하고 대출 앱만 쓰게 해 봤는데, 결과는 Button을 고쳤을 때와 같았습니다. 새 크기를 쓰지 않는 검색 앱도 Button 파일이 바뀌어 JS가 함께 바뀌었습니다.
- 수정 전후 스크린샷과 공식 문서 근거: [#49](https://github.com/kyungchan3007/frontend-architecture/issues/49)

</details>

#### API 패키지: 범용 명세와 앱 전용 명세

**고민:** 여러 앱이 함께 쓰는 API는 범용으로 두고 나머지는 앱마다 두면, 생성 코드는 어떻게 나뉠까?

**생각:** 앱 명세가 범용 타입을 가리키기만 해도 그 타입과 호출 기반 코드가 앱 쪽에 다시 생성됐고, 생성기 설정으로도 막지 못했습니다. 다만 범용 API 호출과 서비스 함수는 다시 생기지 않았고 영향도 작아서, 범용으로 둘 이유는 여전하다고 봤습니다.

<details>
<summary>자세히 보기</summary>

- 명세에서 타입 · 호출 코드 · zod 스키마를 생성하고, 응답은 zod로 자동 검사합니다.
- TypeScript 7에는 컴파일러 API가 없어서, 코드 생성기에는 TypeScript 6을 함께 사용했습니다.
- 근거: [#55](https://github.com/kyungchan3007/frontend-architecture/issues/55) · [#57](https://github.com/kyungchan3007/frontend-architecture/issues/57)

</details>

#### 앱 화면: FSD 기반 구조

**고민:** 앱 안의 코드는 어떤 기준으로 나눌까?

**생각:** FSD를 기준으로 계층을 나누고 앱마다 메뉴 2개를 만들었습니다. 계층마다 가져다 쓸 수 있는 방향이 정해져 있어서, 공통 컴포넌트가 도메인 코드를 가져다 쓰던 부분을 고쳤습니다.

<details>
<summary>자세히 보기</summary>

- 근거: [#59](https://github.com/kyungchan3007/frontend-architecture/issues/59)

</details>

#### barrel(index.ts): 있을 때와 없을 때

**고민:** 현업에서는 관리가 편하다고 판단해 index.ts로 모아 내보냈는데, 문서는 barrel을 피하라고 권장합니다. 실제로 차이가 있을까?

**생각:** 같은 코드로 barrel 유무만 다르게 만들어 비교해 봤습니다. 개발 서버에서는 차이가 보였고, 배포 결과물은 대부분 거의 같았습니다.

| 확인한 곳 | barrel 쪽 결과 |
|---|---|
| 개발 서버 첫 화면 | 파일을 앱마다 11~14개 더 읽음 |
| 배포 결과물 (일반 컴포넌트) | 10~35바이트 차이로 거의 같음 |
| 배포 결과물 (등록 코드가 있는 차트) | 약 25.8KB 더 큼, `sideEffects` 표시로 거의 같아짐 |

<details>
<summary>자세히 보기</summary>

- barrel 있음: [step-1-barrel](experiments/monorepo/step-1-barrel) · barrel 없음: [step-1-current](experiments/monorepo/step-1-current)
- 근거: [#61](https://github.com/kyungchan3007/frontend-architecture/issues/61)

</details>

#### 결과 정리: 도트 게임

1단계에서 확인한 내용을 건물 한 층을 걸어 다니며 볼 수 있는 도트 게임으로 만들어 봤습니다. [게임 열기](https://kyungchan3007.github.io/frontend-architecture/)

- 디자인실에서 색을, 부품실에서 고칠 부품을, 캐시 보관실에서 빌드를 직접 골라 보며 왜 다시 빌드되는지 확인할 수 있습니다.
- PC 웹에서 방향키로 걷고 Space로 살펴볼 수 있습니다.
- 근거: [#65](https://github.com/kyungchan3007/frontend-architecture/issues/65) · [#68](https://github.com/kyungchan3007/frontend-architecture/issues/68)

#### 1단계를 돌아보니

- 문서 권장을 그대로 적용했던 부분은, 다시 살펴보니 이유가 있는 구조였다고 봤습니다.
- barrel은 틀린 판단이었다기보다, 비용을 깊게 생각해 보지 못하고 쓴 선택이었던 것 같습니다.
- 정리 댓글: [#34](https://github.com/kyungchan3007/frontend-architecture/issues/34)

### 🌱 다음에 할 일

- **2단계 후보**
  - Next.js(App Router)로 옮기기: 1단계 결과가 어떻게 달라지는지
  - 공통 컴포넌트를 목적별 패키지로 분리하기: 다시 빌드하는 범위가 줄어드는지
  - 컴포넌트별로 CSS 등록하기: 쓰지 않는 스타일이 빠지는지
  - 서비스별 대표 색상 · 서비스 추가: 1단계 방식과 비교하기

---

## ⚠️ 한계

실제 리뷰 대기 시간이나 팀원이 느끼는 답답함은 이 실험으로 볼 수 없었습니다. 또 에이전트는 사람 팀처럼 일하지 않아서, 일하는 방식을 글로 제공해도 흉내에 가깝다고 봤습니다. 그래서 이 실험에서는 "이 방식에 맞춘 환경이 코드에 어떤 차이를 남기는가"까지 살펴볼 수 있었던 것 같습니다.

**전체 결과:** [공통화 기준](experiments/frontend/results/2026-11-04-rule.md) · [환경 개선](experiments/frontend/results/2026-11-03-design.md) · [역할 분담](experiments/frontend/results/2026-11-03-role.md) · [코드 위치](experiments/frontend/results/2026-11-03-pkg.md) · [공통 모듈](experiments/frontend/results/2026-11-03-module.md) · [디자인 시스템](experiments/frontend/results/2026-11-03-ds.md) · [시안 전달](experiments/frontend/results/2026-11-02-small.md)

---

## 🧪 이 프로젝트에서 사용한 에이전트 디자인

앞선 실험에서 본 결과를 가져와 에이전트 구성을 정했습니다.

<details>
<summary>앞선 실험에서 가져온 것</summary>

- 📚 **[온톨로지](https://github.com/kyungchan3007/ontology-coding-bench)**
  - 지식 없는 코딩은 44~47%, 문서를 제공하면 100%였습니다
  - 그래서 시안과 함께 설명 패널 · SDD · 엔티티를 전달했습니다
- 🧑‍⚖️ **[감독관](https://github.com/kyungchan3007/advisor-bench)**
  - 감독관을 붙이면 쉬운 과제 비용이 6~8배였습니다
  - 그래서 감독관 없이 Sonnet 하나로 구현했습니다
- 🚦 **[하네스](https://github.com/kyungchan3007/Harness)**
  - 규칙을 검사로 전환하면 93.7% → 99.1%여서, 완료 전에 게이트를 강제했습니다
  - 읽기를 안내한 링크는 26번 중 0번 읽혀서, 안내에 "먼저 읽는다"를 직접 지시했습니다
  - 요구를 원문으로 전달하면 46% → 100%여서, 요청 원문을 `request.md`에 고정했습니다

</details>

<details>
<summary>에이전트 역할</summary>

- 🧭 **진행 (Opus 5.5):** 실험 설계, 실행기 작성, 결과 정리, PR
- 🧑‍💻 **화면 구현 (Sonnet 5.5):** 단계별 화면 구현과 변경 요청 처리. 단계마다 새 세션
- 🧩 **컴포넌트 제작 (Sonnet 5.5):** 시안의 카드를 보고 `src/ui` 작성. 1번
- 🧰 **공통 모듈 제작 (Sonnet 5.5):** 계약 문서를 보고 `src/shared` 작성. 1번
- 📦 **패키지 세팅 (Sonnet 5.5):** `packages/` 구조로 분리. 1번

</details>

<details>
<summary>하네스 형식</summary>

작업마다 사용한 하네스와, 에이전트 실행에 사용한 하네스를 구분했습니다.

**저장소에서**

- `AGENTS.md`: 에이전트의 단일 진입점과 절대 규칙
- `request.md`: 요청 원문 고정
- `plan.md`: 할 일, 애매한 곳, 파일 계획, 허점
- `checks.sh`: 작업 기록 · 보호 파일 · 작업 범위 검사
- `.claude/settings.json`: 작업 폴더 밖 쓰기를 제한하고, 완료 시 게이트 실행

**실험 실행에서**

- `TASK.md` · `sdd.md` · `entities.md` · `design-map.md`: 단계마다 바꿔 넣는 과제 문서
- `tools/check.mjs`: 빌드 · 기본 동작 테스트, 린트 조건은 린트까지
- `tools/stop-gate.mjs`: 완료 전에 게이트를 실행하고, 실패하면 세 번까지 재시도
- 허용 도구: Read · Write · Edit · Glob · Grep, `node` · `npx` · `npm` · `ls`
- 숨은 테스트: 작업 폴더 밖에 두어 에이전트가 볼 수 없음

실제 내용: [실험 안내](experiments/frontend/bench/conditions-ds.mjs) · [실행기](experiments/frontend/bench/workdir-ds.mjs) · [과제 문서](experiments/frontend/task/ds) · [컴포넌트 계약](experiments/frontend/task/ds/ui-contract.md)

</details>

---

<div align="center">

MIT License

</div>
