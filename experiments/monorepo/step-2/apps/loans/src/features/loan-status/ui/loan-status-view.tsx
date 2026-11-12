import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { fetchLoans, returnLoan, toCardProps, type Loan } from "@/entities/loans";
import { LoanCard } from "@/shared/ui/card";

// 대출 현황 메뉴의 화면 기능: 전체 대출과 반납 처리
export function LoanStatusView() {
  const [loans, setLoans] = useState<Loan[]>([]);
  useEffect(() => {
    fetchLoans().then(setLoans);
  }, []);

  const onReturn = async (loanId: string) => {
    const returned = await returnLoan(loanId);
    setLoans((prev) => prev.map((l) => (l.id === returned.id ? returned : l)));
  };

  return (
    <ul>
      {loans.map((loan) => (
        <LoanCard key={loan.id} {...toCardProps(loan)}>
          {loan.status !== "returned" && <Button onClick={() => onReturn(loan.id)}>반납 처리</Button>}
        </LoanCard>
      ))}
    </ul>
  );
}
