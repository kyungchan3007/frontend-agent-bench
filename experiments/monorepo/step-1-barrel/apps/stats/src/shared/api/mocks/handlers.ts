import { http, HttpResponse } from "msw";
import { BOOKS } from "@repo/api/mocks";
import type { MonthlyLoan, PopularBook } from "../generated/types.gen";

// 통계 앱 가짜 응답
const POPULAR: PopularBook[] = [
  { book: BOOKS[0], loanCount: 42 },
  { book: BOOKS[2], loanCount: 31 },
];
const MONTHLY: MonthlyLoan[] = [
  { month: "2026-09", count: 120 },
  { month: "2026-10", count: 135 },
];

export const appHandlers = [
  http.get("/api/stats/popular-books", () => HttpResponse.json(POPULAR)),
  http.get("/api/stats/monthly-loans", () => HttpResponse.json(MONTHLY)),
];
