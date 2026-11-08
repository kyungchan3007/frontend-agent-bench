# step-1-current: 문서 권장 방식 (비교용)

- 공용 UI와 api 패키지를 package.json의 exports로 내보내고, 앱 안에서도 파일을 직접 가져오는 방식입니다. barrel(index.ts)은 사용하지 않았습니다.
- 터보레포 · Vite · FSD 문서가 권장하는 방식이라, 현업 방식과 비교하기 위해 남겨 두었습니다.
- 처음에는 ui 패키지 단계에서 멈춰 두었는데, barrel 유무만 다른 조건으로 측정해 보려고 [step-1-barrel](../step-1-barrel)과 같은 코드(api · 앱 화면)로 채웠습니다.
- 현업 방식(종류별 폴더 + index.ts)의 1단계는 step-1-barrel에서 진행합니다.
- 관련 이슈: [#53](https://github.com/kyungchan3007/frontend-architecture/issues/53) · [#61](https://github.com/kyungchan3007/frontend-architecture/issues/61)
