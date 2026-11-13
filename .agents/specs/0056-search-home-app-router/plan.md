# 계획

## 무엇을 · 왜
- #81 2-1: 도서 검색 화면(/)을 App Router 페이지로 옮긴다. 데이터는 지금처럼 브라우저에서 가져온다

## 애매한 곳
- 2번을 2-1(화면 위치만 옮기기)과 2-2(데이터를 서버에서 가져오기)로 나눈다 (확인됨)
- 커밋 ①: 앱 시작 준비(API 주소 · 가짜 응답)를 Provider로 옮겨 루트 레이아웃에서 감싼다. 동작은 바꾸지 않는다 (확인됨)
- msw/browser가 Node.js에서 막혀 있어(exports "node": null) 서버 빌드가 실패해서, 시작 준비를 서버 렌더링 없이(ssr: false) 불러온다 (확인됨: B)
- 커밋 ②: 모든 주소 페이지를 [...slug]로 바꾸고 /에 도서 검색 페이지를 둔다. 링크는 Next.js Link로 (확인됨)
- 상세 화면의 React Router 링크는 3번에서 고치고, 2-1에서는 기록만 한다 (가정)
- next dev · next build가 tsconfig에 ./dist/dev/types 줄을 자동으로 넣는 것은 이번 변경이 아니라 되돌린다 (가정)

## 파일 계획
- experiments/monorepo/step-2/apps/search/app/**
- experiments/monorepo/step-2/apps/search/src/_app/**
- experiments/monorepo/step-2/apps/search/src/features/book-search/**
- experiments/monorepo/step-2/apps/search/src/widgets/app-nav/**
- .agents/specs/0056-search-home-app-router/**

## 계획 밖 변경 이유

## 완료 기준
- [ ] bash .agents/checks.sh PASS
- [ ] / 가 App Router 페이지로 동작
- [ ] 1단계와 같은 화면
- [ ] Vite 앱 2개 영향 없음

## 허점
-
