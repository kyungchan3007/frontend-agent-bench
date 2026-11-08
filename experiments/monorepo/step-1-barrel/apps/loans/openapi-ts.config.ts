import { defineConfig } from "@hey-api/openapi-ts";

// loans 앱 전용 명세에서 타입 · 호출 코드 · zod 스키마를 생성한다 (생성 코드는 커밋, 응답은 zod로 자동 검사)
export default defineConfig({
  input: "./openapi/loans.yaml",
  output: "src/shared/api/generated",
  plugins: ["@hey-api/typescript", "zod", { name: "@hey-api/sdk", validator: true }],
});
