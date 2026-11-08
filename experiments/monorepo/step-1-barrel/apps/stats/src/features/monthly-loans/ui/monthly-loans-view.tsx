import { useEffect, useState } from "react";
import { fetchMonthlyLoans, type MonthlyLoan } from "@/entities/stats";
import { StatCard } from "@/shared/ui/card";

// 월별 대출 메뉴의 화면 기능
export function MonthlyLoansView() {
  const [items, setItems] = useState<MonthlyLoan[]>([]);
  useEffect(() => {
    fetchMonthlyLoans().then(setItems);
  }, []);

  return <StatCard title="월별 대출 수" rows={items.map((m) => ({ key: m.month, label: m.month, value: `${m.count}건` }))} />;
}
