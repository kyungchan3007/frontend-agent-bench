import type { CreateClientConfig } from "@/generated/api/client.gen";
import { BACKEND_URL } from "./backend";

// 검색 앱 전용 호출 코드의 주소 (Hey API 문서 "Runtime API": createClientConfig)
// 호출 코드가 만들어질 때 불려서, 서버와 브라우저가 각자 맞는 주소를 갖는다
// - 서버(Next.js 서버 = BFF): 백엔드를 바로 부른다. 서버에는 기준 주소가 없어 절대 주소가 필요하다
// - 브라우저: /api로 부르면 Route Handler가 받아 백엔드로 넘긴다
export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: typeof window === "undefined" ? `${BACKEND_URL}/api` : "/api",
});
