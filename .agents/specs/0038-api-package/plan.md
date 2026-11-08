# 계획

## 무엇을 · 왜
- 현업처럼 OpenAPI 명세에서 @hey-api/openapi-ts로 코드를 생성하고, 공통 명세는 packages/api에 · 앱 전용 명세는 각 앱에 둔다 (#55, step-1-barrel)

## 애매한 곳
- 공통 명세: 도서 · 사용자 (확인됨)
- 앱 전용: search 검색, loans 대출 · 반납 · 연체, stats 인기 도서 · 월별 대출 (확인됨)
- 생성 코드는 커밋한다 (확인됨: 현업 A 방식)
- 가짜 API는 MSW (확인됨)
- 생성기가 TypeScript 7을 지원하지 않아 api 패키지만 TypeScript 6.0.3 사용 (확인됨)
- 앱의 코드 생성기도 TypeScript 6이 필요 → 공식 안내대로 typescript를 @typescript/typescript6 별칭으로, tsc 7은 @typescript/native 별칭으로 함께 설치 (확인됨: 방법 A)
- API 배치: 범용은 packages/api, 앱 공통은 앱 shared/api, 메뉴 전용은 메뉴 묶음(E에서) (확인됨)
- 커밋 5개: 공통 명세 · 생성 → 감싸는 층 · barrel → 앱 전용 명세 · 생성 → MSW → 앱 표시 (확인됨)

## 파일 계획
- experiments/monorepo/step-1-barrel/**
- .agents/specs/0038-api-package/**

## 계획 밖 변경 이유

## 완료 기준
- [ ] bash .agents/checks.sh PASS
- [ ] 코드 생성
- [ ] 빌드
- [ ] 응답 표시

## 허점
- api는 typescript 6.0.3, 앱은 @typescript/typescript6 6.0.2 별칭이라 msw(typescript를 peer로 가짐)가 두 벌 설치되어 HttpHandler 타입이 서로 맞지 않았다 → api도 같은 별칭으로 맞춰 한 벌로 정리
- MSW 3에서 시작 옵션 이름이 onUnhandledRequest → onUnhandledFrame으로 바뀌었다
- @hey-api/openapi-ts 0.99.0은 TypeScript 컴파일러 API를 쓰는데 TypeScript 7(Go 구현)에는 없어서 생성이 실패했다 → api 패키지만 6.0.3으로 고정
