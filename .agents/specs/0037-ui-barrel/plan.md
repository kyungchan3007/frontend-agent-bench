# 계획

## 무엇을 · 왜
- 현업은 범용 UI를 종류별 폴더 + index.ts(barrel)로 내보냈다. step-1-current(컴포넌트별 exports)는 비교용으로 보존하고, step-1-barrel을 복사해 현업 방식으로 구성한다 (#53)

## 애매한 곳
- StatusBadge 폴더 이름: badge (확인됨: 이슈 초안에서 합의)
- 앱의 import 경로(@repo/ui/button 등)는 유지하고 exports가 가리키는 곳만 바꾼다 (확인됨)
- 커밋 3개: 복사 → barrel 구성 → step-1-current 비교용 표시 (확인됨)

## 파일 계획
- experiments/monorepo/step-1-barrel/**
- experiments/monorepo/step-1-current/README.md
- .agents/specs/0037-ui-barrel/**

## 계획 밖 변경 이유

## 완료 기준
- [ ] bash .agents/checks.sh PASS
- [ ] 빌드
- [ ] 화면 표시

## 허점
-
