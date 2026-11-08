import { getLoans, returnLoan as returnLoanApi } from "@/generated/api/sdk.gen";
import type { Loan, LoanStatus } from "../model/types";

// 서비스 함수: 대출 현황 · 연체 관리 두 메뉴가 함께 사용한다. 상태와 대출 ID는 인자로 받는다
export async function fetchLoans(status?: LoanStatus): Promise<Loan[]> {
  const { data } = await getLoans({ query: { status }, throwOnError: true });
  return data;
}

export async function returnLoan(loanId: string): Promise<Loan> {
  const { data } = await returnLoanApi({ path: { loanId }, throwOnError: true });
  return data;
}
