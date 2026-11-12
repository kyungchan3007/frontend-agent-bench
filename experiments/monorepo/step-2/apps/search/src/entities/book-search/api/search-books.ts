import { searchBooks as searchBooksApi } from "@/generated/api/sdk.gen";
import type { BookSearchResult } from "../model/types";

// 서비스 함수: 검색어 · 분류는 인자로 받고, 응답 검사는 생성 코드(validator)가 한다
export async function searchBooks(q: string, category?: string): Promise<BookSearchResult> {
  const { data } = await searchBooksApi({ query: { q, category }, throwOnError: true });
  return data;
}
