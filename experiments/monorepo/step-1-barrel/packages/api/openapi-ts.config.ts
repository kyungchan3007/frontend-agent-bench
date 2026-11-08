import { defineConfig } from "@hey-api/openapi-ts";

// 공통 명세에서 타입과 호출 코드를 생성한다. 생성 코드는 저장소에 커밋한다 (현업 방식)
export default defineConfig({
  input: "./openapi/common.yaml",
  output: "src/generated",
});
