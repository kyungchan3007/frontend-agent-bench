// 통계 앱 공통 API를 모아 내보내는 barrel
export { setupAppApi } from "./setup";
export { fetchMonthlyLoans, fetchPopularBooks } from "./stats";
export type { MonthlyLoan, PopularBook } from "./generated/types.gen";
