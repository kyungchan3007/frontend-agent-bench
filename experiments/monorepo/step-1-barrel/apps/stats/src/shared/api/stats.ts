import { getMonthlyLoans, getPopularBooks } from "./generated/sdk.gen";
import type { MonthlyLoan, PopularBook } from "./generated/types.gen";

export async function fetchPopularBooks(): Promise<PopularBook[]> {
  const { data } = await getPopularBooks({ throwOnError: true });
  return data;
}

export async function fetchMonthlyLoans(): Promise<MonthlyLoan[]> {
  const { data } = await getMonthlyLoans({ throwOnError: true });
  return data;
}
