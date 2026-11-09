import { useEffect, useState } from "react";
import { fetchLoans } from "@/entities/loans/api/loans";
import { toCardProps } from "@/entities/loans/model/to-card-props";
import type { Loan } from "@/entities/loans/model/types";
import { LoanCard } from "@/shared/ui/card/loan-card/loan-card";

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
