import type { MonthlyLoan as MonthlyLoanApi, PopularBook as PopularBookApi } from "@/generated/api/types.gen";

// 생성 타입을 통계 묶음의 모델로 다시 내보낸다 (화면은 generated를 직접 보지 않는다)
export type PopularBook = PopularBookApi;
export type MonthlyLoan = MonthlyLoanApi;
