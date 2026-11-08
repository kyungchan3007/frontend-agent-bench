import { LoanStatusView } from "@/features/loan-status";
import { AppNav } from "@/widgets/app-nav";

export function LoanStatusPage() {
  return (
    <>
      <AppNav />
      <h1 className="text-primary">대출 현황</h1>
      <LoanStatusView />
    </>
  );
}
