import { MonthlyLoansView } from "@/features/monthly-loans";
import { AppNav } from "@/widgets/app-nav";

export function MonthlyLoansPage() {
  return (
    <>
      <AppNav />
      <h1 className="text-primary">월별 대출</h1>
      <MonthlyLoansView />
    </>
  );
}
