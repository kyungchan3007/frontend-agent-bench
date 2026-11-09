import { MonthlyLoansView } from "@/features/monthly-loans/ui/monthly-loans-view";
import { AppNav } from "@/widgets/app-nav/app-nav";

export function MonthlyLoansPage() {
  return (
    <>
      <AppNav />
      <h1 className="text-primary">월별 대출</h1>
      <MonthlyLoansView />
    </>
  );
}
