<div align="center">

# 🎨 frontend-architecture

**"이게 굳이 필요할까?", "하면 더 좋을까?"**

개인 프로젝트 · 설계 · 측정 · 분석 담당 (코드 작성은 AI 에이전트) · 2026.11 ~ · 1단계 완료

[🎮 1단계 결과 게임](https://kyungchan3007.github.io/frontend-architecture/) · [📋 1단계 정리](https://github.com/kyungchan3007/frontend-architecture/issues/34)

<br>

![turborepo](https://img.shields.io/badge/Turborepo-2-EF4444?logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-workspaces-F69220?logo=pnpm&logoColor=white)
![vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![react](https://img.shields.io/badge/React_19-Router_8-61DAFB?logo=react&logoColor=black)
![tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)
![agents](https://img.shields.io/badge/Claude_Code-agents-8A2BE2)

<br><br>

현업에서 서비스 3개가 공용 패키지를 함께 사용하던 구조를 도서 대출 도메인으로 약식 재현했습니다.<br>
공용 UI 수정 · barrel · API 코드 생성 같은 상황을 직접 만들어, 다시 빌드되는 범위와 결과물 변화를 측정하고 공식 문서와 비교했습니다.<br>
측정 결과는 건물 한 층을 걸어 다니며 직접 조작해 보는 도트 게임으로도 정리했습니다.

</div>

---

## 학습 주제

### 1단계 · 현업 방식 재현 (완료)

**🧱 공용 패키지 경계** — 공용 UI 컴포넌트 하나를 수정했을 때 다시 빌드되는 범위와 앱별 결과물 변화를 측정했습니다.

**📦 barrel(index.ts)** — 모아 내보내기가 개발 서버와 배포 결과물에 주는 영향을 같은 코드로 비교했습니다.

**🔗 API 코드 생성** — 범용 · 앱 전용 명세로 코드를 생성할 때 생기는 중복을 확인하고, 설정을 통한 중복 생성 방지 가능성을 검증했습니다.

**🎨 디자인 토큰** — 두 단계 토큰을 패키지로 공유하고 Tailwind v4로 연결하는 방식을 검토했습니다.

**🎮 결과 정리 게임** — 측정 결과를 직접 조작하며 이해할 수 있는 도트 게임으로 만들었습니다.

### 2단계 · 개선 1 (준비 중)

Next.js 전환과 공용 UI 분리 등 개선안을 정하고 있습니다. → [다음 단계](#-다음-단계)

### 3단계 · 개선 2 (예정)

아래 세부 내용은 위 단계 · 주제와 같은 순서로 구성했습니다.

---

## 세부 내용

### 1단계 · 현업 방식 재현

<details>
<summary><b>펼쳐 보기</b> — 공용 패키지 경계 · barrel · API 코드 생성 · 디자인 토큰 · 결과 정리 게임</summary>

<br>

현업에서 서비스 3개가 공용 패키지를 함께 사용하던 방식을 그대로 재현하고, 측정했습니다. ([#34](https://github.com/kyungchan3007/frontend-architecture/issues/34))

<details>
<summary><b>🧱 공용 패키지 경계</b> — Button 하나 수정에 앱 3개 모두 다시 빌드, 쓰지 않는 앱은 CSS만 변경</summary>

<br>

**배경** — 현업에서 서비스 3개가 공용 UI 패키지를 함께 사용했지만, 공용 UI를 고칠 때 영향이 어디까지 가는지는 확인해 보지 못했습니다.

**과정**
- 앱 3개(검색 · 대출 · 통계)와 공용 패키지 3개(토큰 · UI · API)를 터보레포로 구성했습니다.
- 공식 문서 권장대로 앱은 `apps/`, 공유 코드는 `packages/`에 두고, 패키지는 이름과 진입점으로 가져왔습니다.
- 공용 UI는 빌드하지 않고 소스로 사용하도록 연결했습니다.
- Button 여백을 바꾸고, 터보레포 캐시 결과와 앱별 JS · CSS 변화를 비교했습니다.
- Button에 새 크기를 추가해 대출 앱만 사용하게 하고 같은 비교를 반복했습니다.

**학습 내용**
- 앱은 배포되는 끝 지점이라 다른 곳에서 가져다 쓰지 않고, 공유 코드를 패키지로 분리해야 터보레포가 빌드 순서와 다시 빌드할 범위를 판단할 수 있다고 봤습니다.
- 터보레포는 파일이 아니라 패키지 단위로 변경을 판단해, Button을 쓰지 않는 앱도 다시 빌드됐습니다.
- Button을 쓰지 않는 앱은 JS는 그대로였지만, Tailwind가 공용 UI 폴더 전체를 읽어 CSS는 바뀌었습니다.
- 새 크기를 쓰지 않는 앱도 Button 파일이 바뀌어 JS가 함께 바뀌었습니다.
- 소스로 사용하니 공용 UI 수정이 새로고침 없이 약 0.16초 만에 반영됐지만, 다시 빌드 범위가 넓어지는 비용이 있었습니다.

<sub>자세히 → [#49](https://github.com/kyungchan3007/frontend-architecture/issues/49) · 문서 근거 [#42](https://github.com/kyungchan3007/frontend-architecture/issues/42) · [#43](https://github.com/kyungchan3007/frontend-architecture/issues/43) · [#44](https://github.com/kyungchan3007/frontend-architecture/issues/44)</sub>

</details>

<details>
<summary><b>📦 barrel(index.ts)</b> — 개발 서버 요청은 앱마다 11~14개 증가, 배포 결과물은 10~35바이트 차이</summary>

<br>

**배경** — 현업에서는 관리가 편하다고 판단해 index.ts로 모아 내보냈지만, 공식 문서에서는 barrel 사용을 지양하도록 권장합니다.

**과정**
- 같은 코드로 barrel 있음 · 없음 두 폴더를 만들었습니다.
- 개발 서버는 첫 화면에서 브라우저가 요청한 JS 파일 수를, 배포 결과물은 빌드된 파일 크기를 비교했습니다.
- 메뉴별로 나눠 불러오는 경우와, 불러오는 순간 실행되는 등록 코드가 있는 차트도 비교했습니다.

**학습 내용**
- 개발 서버는 파일을 하나씩 보내서, index.ts와 같은 묶음의 쓰지 않는 파일까지 요청이 늘었습니다.
- 배포할 때는 사용하지 않는 코드가 제거되어, 일반 컴포넌트는 거의 차이가 없었습니다.
- 등록 코드가 있는 차트는 쓰지 않아도 배포까지 남아 약 25.8KB 커졌고, `sideEffects` 표시로 거의 같아졌습니다.

<sub>자세히 → [#61](https://github.com/kyungchan3007/frontend-architecture/issues/61) · barrel 있음 [step-1-barrel](experiments/monorepo/step-1-barrel) · barrel 없음 [step-1-current](experiments/monorepo/step-1-current)</sub>

</details>

<details>
<summary><b>🔗 API 코드 생성</b> — 앱이 참조한 범용 타입 · 호출 코드는 앱에 다시 생성, 생성기 설정으로는 막지 못함</summary>

<br>

**배경** — 현업에서 도서 · 사용자 같은 범용 API는 공용 패키지에, 앱 전용 API는 각 앱에 두고 범용 타입을 가져다 사용했습니다.

**과정**
- OpenAPI 명세에서 타입 · 호출 코드 · zod 스키마를 생성하고, 응답은 zod로 자동 검사하도록 했습니다.
- 범용과 앱 3개의 생성 결과를 비교해, 앱 쪽에 다시 생성되는 항목을 확인했습니다.
- 공식 문서에서 찾은 스키마 제외 설정과 호출 코드 복사 끄기를 직접 적용해 봤습니다.

**학습 내용**
- 앱 명세가 범용 타입을 가리키기만 해도, 그 타입과 호출 기반 코드가 앱 쪽에 다시 생성됐습니다.
- 스키마 제외는 생성 오류가 났고, 복사 끄기는 지원이 끝난 패키지가 필요해 사용하기 어려웠습니다.
- 범용 API 호출과 서비스 함수는 다시 생기지 않고 영향도 작아, 공통 API를 범용으로 두는 이유는 여전하다고 봤습니다.
- TypeScript 7에는 컴파일러 API가 없어, 코드 생성기에는 TypeScript 6을 함께 사용해야 했습니다.

<sub>자세히 → [#55](https://github.com/kyungchan3007/frontend-architecture/issues/55) · [#57](https://github.com/kyungchan3007/frontend-architecture/issues/57)</sub>

</details>

<details>
<summary><b>🎨 디자인 토큰</b> — 실제 값 · 쓰임새 이름 두 단계 토큰을 패키지로 공유하고 Tailwind v4로 연결</summary>

<br>

**배경** — 현업에서는 Tailwind v3 설정 파일로 토큰을 연결했는데, v4는 설정 파일 없이 CSS에서 연결합니다.

**과정**
- 색 토큰 20개를 실제 값 10개와 쓰임새 이름 10개, 두 단계로 나눴습니다.
- 토큰을 별도 패키지로 두고, 앱에서는 CSS import 한 줄로 연결했습니다.
- 토큰 이름과 Tailwind 색 이름을 같게 두었다가, 자기 자신을 참조하는 문제를 확인했습니다.

**학습 내용**
- 공개 사례(shadcn/ui)처럼 토큰 이름과 Tailwind 색 이름을 분리해 해결했습니다.
- 토큰과 Tailwind 설정이 같은 CSS로 모여, 관리 지점을 일원화할 수 있었습니다.

<sub>자세히 → [#47](https://github.com/kyungchan3007/frontend-architecture/issues/47)</sub>

</details>

<details>
<summary><b>🎮 결과 정리 게임</b> — 건물 한 층을 걸으며 색 · 부품 · 캐시를 직접 바꿔 보는 정리용 게임</summary>

<br>

**배경** — 측정 결과가 이슈 댓글에 흩어져 있어, 처음 보는 사람이 한 번에 이해하기 어려웠습니다.

**과정**
- 모노레포를 건물 한 층으로, 앱을 팀 방으로, 공용 패키지를 디자인실 · 부품실로 표현했습니다.
- 디자인실에서 색을, 부품실에서 고칠 부품을, 캐시 보관실에서 빌드를 고르면 결과와 이유를 보여 줍니다.
- 그림은 외부 에셋 없이 코드로 직접 그렸고, GitHub Pages로 배포했습니다.

**학습 내용**
- 설명을 읽기만 할 때보다, 직접 고르고 결과를 보는 방식이 다시 빌드되는 이유를 보여 주기에 좋았습니다.
- 측정하지 않은 내용은 작은 글씨로 구분해, 측정 결과와 섞이지 않게 했습니다.

<sub>자세히 → [#65](https://github.com/kyungchan3007/frontend-architecture/issues/65) · [#68](https://github.com/kyungchan3007/frontend-architecture/issues/68)</sub>

</details>

</details>

### 2단계 · 개선 1

준비 중입니다. 1단계와 같은 상황을 다시 만들어 결과를 비교할 예정입니다.

### 3단계 · 개선 2

예정입니다.

---

## 💭 프로젝트를 시작한 배경

- 현업에서 성능과 아키텍처를 개선하며 **"기존 구조가 실제로 필요한가?", "하면 더 좋을까?"**를 자주 고민했습니다.
- 로직 · 훅 · API · 타입을 전부 분리해 왔지만, 이 방식이 정말 효율적인지 확신이 서지 않았습니다.
- 프로젝트 규모 · 도메인 · 팀원이 일하는 방식에 따라 답이 달라지고, 그중 팀원의 일하는 방식이 가장 크게 작용한다고 생각했습니다.
- 그래서 먼저 현업 구조가 개발할 때 어떤 비용을 만드는지부터 측정해 보기로 했습니다.

| 이전 프로젝트 | 구조 | 이 저장소에서 |
| --- | --- | --- |
| 서비스 3개 | 공통 코드는 공용 패키지, 전용 코드는 서비스 안 | 1단계에서 재현 · 측정 |
| 앱 1개 | 공통 코드를 앱 안에 배치 (공통 UI 수정 후 다른 화면이 깨지는 일 반복) | 앞선 실험에서 비교 |

---

## 🗂️ 모노레포 구조

**Turborepo + pnpm workspaces** — 단계마다 폴더를 따로 두고, 이전 단계 코드는 지우지 않고 남깁니다.

```
experiments/monorepo/
├─ step-1-barrel/       # 1단계 · 현업 방식 (index.ts로 모아 내보내기)
│  ├─ apps/
│  │  ├─ search/        # 📚 도서 검색 · 도서 상세
│  │  ├─ loans/         # 📦 대출 현황 · 연체 관리
│  │  └─ stats/         # 📊 인기 도서 · 월별 대출
│  └─ packages/
│     ├─ design-tokens/ # 🎨 두 단계 디자인 토큰
│     ├─ ui/            # 🧩 공용 UI (소스로 사용)
│     └─ api/           # 🔗 범용 명세 · 생성 코드 · 가짜 응답
├─ step-1-current/      # 1단계 비교용 · 문서 권장 방식 (barrel 없음)
└─ game/                # 🎮 결과 정리 게임 (Vite · Phaser)
```

---

## ⚖️ 기술 선택과 비용 검토

| 결정 | 비교 | 선택 |
| --- | --- | --- |
| 1단계 프레임워크 | Next.js(현업) vs Vite + React Router | Vite + React Router · 2단계에서 Next.js |
| 공용 UI 사용 방식 | 빌드해서 사용 vs 소스로 사용 | 소스로 사용 |
| 공용 코드 내보내기 | index.ts로 모으기 vs 진입점 나누기 | 두 방식 모두 두고 비교 |
| API 코드 | 직접 작성 vs 명세에서 생성 + zod 검사 | 명세에서 생성 |
| 토큰 연결 | Tailwind v3 설정 파일 vs v4 CSS | v4 CSS |

> **프레임워크** — 현업에서는 Next.js를 사용했습니다. 1단계는 서비스와 공용 패키지를 어떻게 나누는지가 목적이라, 서버 렌더링 같은 프레임워크 기능이 결과에 섞이지 않도록 Vite + React Router로 단순하게 구성했습니다.

> **공용 UI를 소스로 사용** — 저장소 안 앱에서만 사용하면 빌드 없이도 사용법이 같았고 수정이 바로 반영됐습니다. 대신 Tailwind가 공용 UI 폴더를 직접 읽도록 등록해야 했고, 그 결과 앱이 쓰지 않는 스타일까지 CSS에 포함됐습니다.

---

## 🌱 다음 단계

- **Next.js(App Router) 전환** — 1단계 결과가 어떻게 달라지는지
- **공용 UI를 목적별 패키지로 분리** — 다시 빌드되는 범위가 줄어드는지
- **컴포넌트별 CSS 등록** — 쓰지 않는 스타일이 빠지는지
- **서비스별 대표 색상 · 서비스 추가** — 1단계 방식과 비교

---

## ⚠️ 한계

- 현업 구조는 기억을 바탕으로 약식 재현해서, 실제 프로젝트와 세부 구성이 다를 수 있습니다.
- 실험 앱의 규모가 작아, 큰 프로젝트의 개발 서버 속도는 확인하지 못했습니다.

---

## 🧩 함께 다룬 주제

- **앱 내부 구조(FSD)** — 앱마다 메뉴 2개를 만들고, 계층별로 가져다 쓸 수 있는 방향을 정하고, 공통 컴포넌트의 도메인 코드 의존성을 제거했습니다. → [#59](https://github.com/kyungchan3007/frontend-architecture/issues/59)
- **앞선 실험: 에이전트가 화면을 구현할 때** — 시안 전달 방식 · 공통 모듈 · 디자인 시스템을 바꿔 가며 결과를 비교했습니다. → [공통화 기준](experiments/frontend/results/2026-11-04-rule.md) · [환경 개선](experiments/frontend/results/2026-11-03-design.md) · [역할 분담](experiments/frontend/results/2026-11-03-role.md) · [코드 위치](experiments/frontend/results/2026-11-03-pkg.md) · [공통 모듈](experiments/frontend/results/2026-11-03-module.md) · [디자인 시스템](experiments/frontend/results/2026-11-03-ds.md) · [시안 전달](experiments/frontend/results/2026-11-02-small.md)

---

## 🤝 작업 방식

| 개발자의 역할 | 에이전트의 역할 |
| --- | --- |
| 라이브러리 선택과 활용 방식 결정 | 코드 작성 |
| 아키텍처 설계 | 측정 스크립트 작성 |
| 디자인 시스템 · 공통 모듈 개선 방향과 피드백 | 영문 번역 |
| 자료 찾기와 분석 · 측정 스크립트 실행 · 근거 스크린샷 촬영 | 이슈 · 댓글 다듬기 |

<details>
<summary><b>🧪 이 프로젝트에서 사용한 에이전트 디자인</b></summary>

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

</details>

---

## 🧰 기술 스택

| 영역 | 기술 |
| --- | --- |
| 모노레포 | Turborepo 2 · pnpm workspaces |
| 앱 | React 19 · React Router 8 · Vite 8 · TypeScript 7 |
| 스타일 | Tailwind CSS v4 · 디자인 토큰 패키지 |
| API | OpenAPI · Hey API(openapi-ts) · zod · MSW |
| 게임 | Phaser 4 · Galmuri · GitHub Pages |
| AI 에이전트 | Claude Code |

<div align="center">

MIT License

</div>
