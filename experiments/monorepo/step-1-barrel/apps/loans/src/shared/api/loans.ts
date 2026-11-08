import { getLoans, returnLoan as returnLoanApi } from "./generated/sdk.gen";
import type { Loan, LoanStatus } from "./generated/types.gen";

// 서비스 함수: 상태(연체 등)와 대출 ID는 인자로 받는다
export async function fetchLoans(status?: LoanStatus): Promise<Loan[]> {
  const { data } = await getLoans({ query: { status }, throwOnError: true });
  return data;
}

export async function returnLoan(loanId: string): Promise<Loan> {
  const { data } = await returnLoanApi({ path: { loanId }, throwOnError: true });
  return data;
}
