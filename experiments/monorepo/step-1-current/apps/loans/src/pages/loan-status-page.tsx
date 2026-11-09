import { LoanStatusView } from "@/features/loan-status/ui/loan-status-view";
import { AppNav } from "@/widgets/app-nav/app-nav";

export function LoanStatusPage() {
  return (
    <>
      <AppNav />
      <h1 className="text-primary">대출 현황</h1>
      <LoanStatusView />
    </>
  );
}
