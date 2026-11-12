import { getMonthlyLoans, getPopularBooks } from "@/generated/api/sdk.gen";
import type { MonthlyLoan, PopularBook } from "../model/types";

// 서비스 함수: 인기 도서 · 월별 대출 메뉴가 사용하는 통계 API
export async function fetchPopularBooks(): Promise<PopularBook[]> {
  const { data } = await getPopularBooks({ throwOnError: true });
  return data;
}

export async function fetchMonthlyLoans(): Promise<MonthlyLoan[]> {
  const { data } = await getMonthlyLoans({ throwOnError: true });
  return data;
}
