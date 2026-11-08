// 대출 앱 공통 API를 모아 내보내는 barrel
export { setupAppApi } from "./setup";
export { fetchLoans, returnLoan } from "./loans";
export type { Loan, LoanStatus } from "./generated/types.gen";
