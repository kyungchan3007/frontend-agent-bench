# 계획

## 무엇을 · 왜
- 리뷰어와 팀원이 저장소를 받지 않고 볼 수 있게 도트 게임을 GitHub Pages로 배포한다 (#65)

## 애매한 곳
- 배포 방식: GitHub Actions 워크플로 (확인됨, 보호 파일 추가를 사용자가 승인)
- 지원 범위: 웹만, 모바일 조작은 만들지 않음 (확인됨)
- 경로: 저장소 이름이 주소에 붙으므로 빌드 결과물을 상대 경로로 만듦

## 파일 계획
- .github/workflows/deploy-game.yml
- README.md
- .agents/specs/0045-game-pages/**

## 계획 밖 변경 이유

## 완료 기준
- [ ] bash .agents/checks.sh PASS (보호 파일 승인은 PR의 harness-approved 라벨로 사람이 함)
- [ ] 하위 경로에서 게임 실행
- [ ] Pages 주소 접속

## 허점
-
