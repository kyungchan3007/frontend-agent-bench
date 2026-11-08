import { searchBooks as searchBooksApi } from "./generated/sdk.gen";
import type { SearchResult } from "./generated/types.gen";

// 서비스 함수: 검색어 · 분류는 인자로 받고, 응답 검사는 생성 코드(validator)가 한다
export async function searchBooks(q: string, category?: string): Promise<SearchResult> {
  const { data } = await searchBooksApi({ query: { q, category }, throwOnError: true });
  return data;
}
