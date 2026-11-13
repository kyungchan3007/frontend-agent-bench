# 계획

## 무엇을 · 왜
- #81 2-2: 도서 검색 화면의 첫 결과를 서버가 가짜 백엔드에서 가져와 HTML에 넣는다
- 현업처럼 Next.js 서버가 백엔드를 불러 데이터로 HTML을 만드는 구조를 재현한다 (React Query 없이)

## 방향 바꿈 (커밋 ① 뒤)
- 서버에서도 가짜 응답(MSW)을 쓰려고 했으나, 서버 주소 맞추기 · Provider가 화면을 막는 문제 등 가짜 응답을 돌리는 일로 계속 흘러가 초점이 흐려졌다
- 그래서 가짜 응답 대신 실제 Node.js 백엔드 앱(apps/backend)을 두고, 공통(UI · API)이 아키텍처를 바꿀 때 어떤 변화가 일어나는지에 다시 초점을 둔다 (확인됨)
- 커밋 ①(msw/node)은 지우지 않고 두고, 백엔드로 바꾸는 커밋에서 정리한다 (확인됨: 나)
- 검색 앱의 가짜 응답(MSW) 코드는 모두 지운다. 가짜 응답은 앱 이전이 다 끝난 뒤 현업 방식으로 다시 다룬다 (확인됨)
- 브라우저의 /api 요청은 Route Handler(BFF)가 받아 백엔드로 넘긴다. rewrites는 쓰지 않는다 (확인됨)
- 공통 @repo/api/mocks는 Vite 앱(대출 · 통계)이 쓰고 있어 그대로 둔다 (확인됨)
- 3번을 시작하며 기존 호출 코드를 그대로 서버에서 불러 봤다. 앱 전용 · 공통 모두 서버에서 주소 설정이 적용되지 않았다 (#81 댓글). 확인용 코드는 되돌리고, 서버 주소 설정 방법을 정한 뒤 다시 한다 (확인됨)
- 서버 주소는 Hey API createClientConfig(runtimeConfigPath)로 서버 · 브라우저 주소를 나눈다. 앱 전용 호출 코드에만 적용하고 공통(@repo/api)은 그대로 둔다 (확인됨: B)
- 순서: 1) 백엔드 앱 추가 2) 검색 앱이 MSW 대신 백엔드를 봄 3) 검색 페이지가 서버에서 첫 결과를 가져옴 4) 공통 모듈별로 정리

## 애매한 곳 (방향 바꾸기 전)
- 서버용 가짜 백엔드는 instrumentation.ts에서 msw/node로 켠다. Route Handler를 가짜 백엔드로 두지 않는다 (확인됨: 1번)
- 커밋 ①: 서버용 가짜 백엔드만 켠다. 화면은 바꾸지 않는다 (확인됨)
- 커밋 ②: 검색 페이지가 서버에서 첫 결과를 가져와 화면에 props로 넘긴다. 검색어 입력은 지금처럼 브라우저에서 한다 (확인됨)
- 서버에는 현재 주소가 없어 상대 주소(/api)로는 요청이 안 될 수 있다. 공통 패키지(@repo/api)는 바꾸지 않고 검색 앱 안에서 서버용 주소를 설정한다 (확인됨)
- 공통 가짜 응답(@repo/api/mocks)은 상대 경로라 서버(msw/node)에서 맞는 요청이 없다. 공통은 그대로 두고, 검색 앱 안에서 서버용 응답을 백엔드 주소로 따로 등록한다 (확인됨: B)
- 서버 캐시 · 무효화는 2-3에서 다룬다 (확인됨)
- next dev · next build가 tsconfig에 넣는 줄은 이번 변경이 아니라 되돌린다 (가정)

## 파일 계획
- experiments/monorepo/step-2/apps/backend/**
- experiments/monorepo/step-2/pnpm-lock.yaml
- experiments/monorepo/step-2/apps/search/openapi-ts.config.ts
- experiments/monorepo/step-2/apps/search/src/generated/api/**
- experiments/monorepo/step-2/apps/search/instrumentation.ts
- experiments/monorepo/step-2/apps/search/app/**
- experiments/monorepo/step-2/apps/search/src/_app/**
- experiments/monorepo/step-2/apps/search/src/_pages/**
- experiments/monorepo/step-2/apps/search/src/shared/api/**
- experiments/monorepo/step-2/apps/search/src/features/book-search/**
- .agents/specs/0057-search-server-fetch/**

## 계획 밖 변경 이유
- apps/search/tsconfig.json: 앱 폴더 바로 아래에 둔 instrumentation.ts를 타입 검사에 넣으려고 include에 한 줄 더했다

## 완료 기준
- [ ] bash .agents/checks.sh PASS
- [ ] 서버가 보내는 / 의 HTML에 첫 검색 결과가 들어 있음
- [ ] 1단계와 같은 화면
- [ ] Vite 앱 2개 영향 없음

## 허점
-
