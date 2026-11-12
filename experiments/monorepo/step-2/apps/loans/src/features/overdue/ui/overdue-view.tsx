import { useEffect, useState } from "react";
import { fetchLoans, toCardProps, type Loan } from "@/entities/loans";
import { LoanCard } from "@/shared/ui/card";

// 연체 관리 메뉴의 화면 기능: 연체된 대출만 조회
export function OverdueView() {
  const [loans, setLoans] = useState<Loan[]>([]);
  useEffect(() => {
    fetchLoans("overdue").then(setLoans);
  }, []);

  return (
    <ul>
      <p data-testid="overdue-count">연체 {loans.length}건</p>
      {loans.map((loan) => (
        <LoanCard key={loan.id} {...toCardProps(loan)} />
      ))}
    </ul>
  );
}
