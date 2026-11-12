import type { Loan as LoanApi, LoanStatus as LoanStatusApi } from "@/generated/api/types.gen";

// 생성 타입을 대출 묶음의 모델로 다시 내보낸다 (화면은 generated를 직접 보지 않는다)
export type Loan = LoanApi;
export type LoanStatus = LoanStatusApi;
