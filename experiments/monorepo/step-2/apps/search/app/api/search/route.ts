import { BACKEND_URL } from "@/shared/api/backend";

// 브라우저의 검색 요청을 받아 백엔드로 넘기는 BFF (Next.js 문서 "Route Handlers")
// 현업에서도 브라우저는 Next.js 서버(BFF)를 거쳐 백엔드를 불렀다
export async function GET(request: Request) {
  const { search } = new URL(request.url);
  const res = await fetch(`${BACKEND_URL}/api/search${search}`);
  return new Response(res.body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}
