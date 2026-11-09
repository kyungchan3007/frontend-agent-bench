import { useEffect, useState } from "react";
import { BarChart } from "@repo/ui/bar-chart";
import { fetchMonthlyLoans } from "@/entities/stats/api/stats";
import type { MonthlyLoan } from "@/entities/stats/model/types";
import { StatCard } from "@/shared/ui/card/stat-card/stat-card";

// 월별 대출 메뉴의 화면 기능
export function MonthlyLoansView() {
  const [items, setItems] = useState<MonthlyLoan[]>([]);
  useEffect(() => {
    fetchMonthlyLoans().then(setItems);
  }, []);

  return (
    <>
      <BarChart labels={items.map((m) => m.month)} values={items.map((m) => m.count)} />
      <StatCard title="월별 대출 수" rows={items.map((m) => ({ key: m.month, label: m.month, value: `${m.count}건` }))} />
    </>
  );
}
