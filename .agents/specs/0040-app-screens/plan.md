# 계획

## 무엇을 · 왜
- 앱 3개를 현업 구조의 의미대로 FSD 기반으로 나누고, 앱마다 메뉴 2개와 React Router 메뉴 이동을 만든다 (#59)

## 애매한 곳
- 파일을 현업과 똑같이 맞추지 않고, 층의 의미 · 목적 · 용도가 드러나게 만든다 (확인됨)
- generated/api: 자동 생성 전용 / entities: 생성 코드를 감싸는 서비스 함수 · 모델(메뉴별) / features: 메뉴 화면 / widgets: 메뉴 이동 바 / shared: 앱 공통 (확인됨)
- barrel은 메뉴 묶음(features · entities)과 shared 종류별(shared/ui/card 등)에만, app · pages에는 두지 않는다. widgets도 묶음마다 폴더 + index.ts (확인됨)
- 메뉴: search 도서 검색 · 도서 상세, loans 대출 현황 · 연체 관리, stats 인기 도서 · 월별 대출 (확인됨)
- import는 @/ 별칭 (확인됨: 사주 저장소 방식)
- 커밋은 앱별 3개 (가정: 이슈 진행 중 안내)

## 파일 계획
- experiments/monorepo/step-1-barrel/**
- .agents/specs/0040-app-screens/**

## 계획 밖 변경 이유

## 완료 기준
- [ ] bash .agents/checks.sh PASS
- [ ] 빌드
- [ ] 메뉴 이동
- [ ] 응답 표시

## 허점
-
