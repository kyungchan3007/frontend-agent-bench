# 계획

## 무엇을 · 왜
- research/01-architecture README의 barrel 문장이 사실과 달라서 수정한다 (현업은 범용 UI 종류별 · 앱 공통 · 메뉴별 index.ts 사용)

## 애매한 곳
- 근거 표현은 #37 보충 댓글과 같게 "적용 전 테스트 파일과 공부한 내역" (확인됨)

## 파일 계획
- experiments/monorepo/research/01-architecture/README.md
- .agents/specs/0042-research-barrel-note/**

## 계획 밖 변경 이유

## 완료 기준
- [x] bash .agents/checks.sh PASS

## 허점
- 현업 방식을 확인 없이 "도메인별 exports"로 기록했다가, 나중에 barrel을 사용한 것으로 정정했다
