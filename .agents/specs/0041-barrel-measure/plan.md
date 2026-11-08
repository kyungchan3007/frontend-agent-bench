# 계획

## 무엇을 · 왜
- barrel 유무만 다른 두 폴더를 만들어 차이를 측정한다 (#61)
  - step-1-barrel(현업, barrel 있음)에 측정용 사용자 카드 추가
  - step-1-current(문서 권장, barrel 없음)를 step-1-barrel과 같은 코드로 채우고 barrel만 뺀다

## 애매한 곳
- 측정용 카드 변형 추가: search 앱 shared/ui/card에 user-card, 화면에서는 쓰지 않음 (확인됨)
- 비교본 폴더를 새로 만들지 않고 step-1-current를 채운다 (확인됨)
- 측정 결과는 #61 댓글로 하나씩 (확인됨)
- 메뉴별 코드 측정을 위한 라우터 lazy 여부는 측정 ③ 전에 정한다

## 파일 계획
- experiments/monorepo/step-1-barrel/**
- experiments/monorepo/step-1-current/**
- .agents/specs/0041-barrel-measure/**

## 계획 밖 변경 이유

## 완료 기준
- [ ] bash .agents/checks.sh PASS
- [ ] 두 폴더 빌드
- [ ] 측정 ① 결과

## 허점
- barrel을 자동으로 걷어낼 때 index가 다른 index를 다시 내보내는 경우(shared/api → mocks)를 따라가지 못해 import가 사라진 폴더를 가리켰다 → 빌드 전에 직접 수정
- step-1-current api 패키지는 타입 묶음 진입점이 없어 `@repo/api/types`(생성 타입 파일 직접 연결)를 추가했다
