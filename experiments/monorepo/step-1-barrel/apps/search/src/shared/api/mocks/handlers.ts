import { http, HttpResponse } from "msw";
import { BOOKS } from "@repo/api/mocks";
import type { SearchResult } from "../generated/types.gen";

// 검색 앱 가짜 응답
export const appHandlers = [
  http.get("/api/search", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") ?? "";
    const category = url.searchParams.get("category");
    const items = BOOKS.filter((b) => b.title.includes(q) && (!category || b.category === category));
    const result: SearchResult = { total: items.length, items };
    return HttpResponse.json(result);
  }),
];
