import { http, HttpResponse } from "msw";
import { BOOKS } from "@repo/api/mocks";
import type { SearchResult } from "@/generated/api/types.gen";

// 검색 앱 가짜 응답
// origin: 브라우저는 상대 경로("")로 충분하지만, 서버(Node.js)는 기준 주소가 없어 상대 경로가 어떤 요청과도 맞지 않는다.
// 그래서 서버용은 백엔드 주소를 붙여 만든다 (#81 2-2)
export function createAppHandlers(origin = "") {
  return [
    http.get(`${origin}/api/search`, ({ request }) => {
      const url = new URL(request.url);
      const q = url.searchParams.get("q") ?? "";
      const category = url.searchParams.get("category");
      const items = BOOKS.filter((b) => b.title.includes(q) && (!category || b.category === category));
      const result: SearchResult = { total: items.length, items };
      return HttpResponse.json(result);
    }),
  ];
}
