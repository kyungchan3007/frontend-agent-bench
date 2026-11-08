import { defineConfig } from "@hey-api/openapi-ts";

// 공통 명세에서 타입 · 호출 코드 · zod 스키마를 생성한다. 생성 코드는 저장소에 커밋한다 (현업 방식)
// validator: true → 생성된 호출 코드 안에서 응답을 zod로 자동 검사한다 (현업 최종 방식)
export default defineConfig({
  input: "./openapi/common.yaml",
  output: "src/generated",
  plugins: ["@hey-api/typescript", "zod", { name: "@hey-api/sdk", validator: true }],
});
