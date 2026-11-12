# 계획

## 무엇을 · 왜
- 공식 가이드(Vite에서 이전하기)의 마지막 단계대로 검색 앱의 Vite 파일과 패키지를 정리한다 (#78)

## 애매한 곳
- 지울 파일: index.html · vite.config.ts · src/main.tsx · src/_app/bootstrap.tsx (확인됨)
- 지울 패키지: vite · @vitejs/plugin-react · @tailwindcss/vite, tsconfig의 vite/client 타입과 vite.config.ts 항목 (확인됨)
- bootstrap()의 준비는 이미 App 컴포넌트로 옮겨서, 주석만 그 사실에 맞게 고친다 (가정)
- 대출 · 통계 앱의 Vite는 그대로 둔다 (확인됨)
- 정리 결과는 #78에 별도 댓글로 남긴다 (확인됨)

## 파일 계획
- experiments/monorepo/step-2/apps/search/**
- experiments/monorepo/step-2/pnpm-lock.yaml
- .agents/specs/0054-step2-search-cleanup/**

## 계획 밖 변경 이유

## 완료 기준
- [ ] bash .agents/checks.sh PASS
- [ ] 검색 앱에 Vite 파일 · 패키지 없음
- [ ] 정리 후에도 첫 화면 · 이동이 1단계와 같음
- [ ] Vite 앱 2개 영향 없음

## 허점
-
