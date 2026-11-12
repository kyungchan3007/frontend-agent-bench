# 계획

## 무엇을 · 왜
- #81 첫 단계: 검색 앱의 설정만 정적 내보내기에서 서버 모드로 바꿔, 상세 주소로 바로 들어갈 때의 500이 사라지는지 확인한다

## 애매한 곳
- 이번 단계에서 바꾸는 것은 next.config의 output: 'export' 한 줄 제거와, 서버로 띄우기 위한 start 실행 명령 추가뿐이다 (확인됨: 단계별로 하나씩)
- distDir(dist) · turbo.json · 화면 코드 · App Router 이전은 이번에 바꾸지 않는다 (확인됨)
- 서버 모드 빌드 결과에 Next.js 캐시(dist/cache)가 섞여 터보레포 캐시가 커지는 것은 기록만 하고, 다음 단계 후보로 둔다 (가정)

## 파일 계획
- experiments/monorepo/step-2/apps/search/next.config.mjs
- experiments/monorepo/step-2/apps/search/package.json
- .agents/specs/0055-search-server-mode/**

## 계획 밖 변경 이유

## 완료 기준
- [ ] bash .agents/checks.sh PASS
- [ ] next start · next dev에서 상세 주소로 바로 들어가기
- [ ] 첫 화면이 1단계와 같음
- [ ] Vite 앱 2개 영향 없음

## 허점
-
