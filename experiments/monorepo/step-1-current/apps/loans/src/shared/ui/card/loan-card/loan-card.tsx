import type { ReactNode } from "react";
import { StatusBadge } from "@repo/ui/status-badge";

// shared는 가장 아래 층이라 entities를 가져오지 않는다. 화면에 필요한 값만 받는다
type LoanCardProps = {
  title: string;
  userName: string;
  dueDate: string;
  status: "available" | "loaned" | "overdue";
  children?: ReactNode;
};

// 대출 현황 · 연체 관리가 함께 쓰는 앱 공통 카드
export function LoanCard({ title, userName, dueDate, status, children }: LoanCardProps) {
  return (
    <li data-testid="loan">
      {title} · {userName} · {dueDate} <StatusBadge status={status} />
      {children}
    </li>
  );
}
