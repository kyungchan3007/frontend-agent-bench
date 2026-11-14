# 계획

## 무엇을 · 왜
- #81 2-3a: 도서 검색을 공식 문서 방식(검색어를 주소 searchParams에, 결과는 서버가 가져옴, debounce)으로 바꾸고, 문서가 왜 그렇게 요구하는지 하나씩 확인한다
- 서사(안 1): SPA에서는 검색어를 브라우저 상태에 두고 브라우저가 데이터를 가져왔는데, 서버 중심 구조로 옮기면 검색어가 주소로, 데이터를 가져오는 쪽이 서버로 바뀐다. 현업에서는 공식 문서대로 했지만 이유까지 확인하지는 않았다 (확인됨)

## 애매한 곳
- 순서: 1) 검색어를 주소로 옮기고 서버가 가져옴 (debounce 없이, 요청 수 세기) 2) debounce 추가 3) Suspense 빼 보고 빌드 확인 후 감싸기 (확인됨)
- 캐시(2-3b) · 웹훅(2-3c) · 상세 화면 · 공통 패키지는 바꾸지 않는다 (확인됨)
- next dev · next build가 tsconfig에 넣는 줄은 이번 변경이 아니라 되돌린다 (가정)

## 파일 계획
- experiments/monorepo/step-2/apps/search/app/**
- experiments/monorepo/step-2/apps/search/src/_pages/**
- experiments/monorepo/step-2/apps/search/src/features/book-search/**
- experiments/monorepo/step-2/apps/search/package.json
- experiments/monorepo/step-2/pnpm-lock.yaml
- .agents/specs/0058-search-url-params/**

## 계획 밖 변경 이유
- apps/search/src/_app/router.tsx: React Router의 예전 / 경로가 검색 페이지를 props 없이 불러서 빌드 타입 검사가 실패했다. 2-1 뒤로 쓰이지 않던 경로라 지웠다 (원래 상세를 옮길 때 지우려던 것)

## 완료 기준
- [ ] bash .agents/checks.sh PASS
- [ ] 검색어가 주소에 남고, 새로고침 · 새 탭에서 같은 결과
- [ ] 서버가 보내는 HTML에 검색 결과
- [ ] debounce 전후 요청 수 비교
- [ ] Vite 앱 2개 영향 없음

## 허점
-
