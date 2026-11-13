import { BACKEND_URL } from "@/shared/api/backend";

// 브라우저의 도서 한 권 요청(상세 화면)을 받아 백엔드로 넘기는 BFF (Next.js 문서 "Route Handlers")
// 주소 안의 값(bookId)은 Promise인 params에서 꺼낸다 (문서 "route.js › context")
export async function GET(_request: Request, { params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  const res = await fetch(`${BACKEND_URL}/api/books/${encodeURIComponent(bookId)}`);
  return new Response(res.body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}
