import { defineConfig } from "@hey-api/openapi-ts";

// search 앱 전용 명세에서 타입 · 호출 코드 · zod 스키마를 생성한다 (생성 코드는 커밋, 응답은 zod로 자동 검사)
// runtimeConfigPath: 호출 코드가 만들어질 때 createClientConfig()로 주소를 정한다.
// 앱 시작 때 setConfig()로 한 번 설정하던 방식은 서버에 적용되지 않아서 바꿨다 (#81 2-2, Hey API 문서 "Runtime API")
export default defineConfig({
  input: "./openapi/search.yaml",
  output: "src/generated/api",
  plugins: [
    { name: "@hey-api/client-fetch", runtimeConfigPath: "./src/shared/api/hey-api" },
    "@hey-api/typescript",
    "zod",
    { name: "@hey-api/sdk", validator: true },
  ],
});
