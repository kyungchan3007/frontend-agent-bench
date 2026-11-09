import { OverdueView } from "@/features/overdue/ui/overdue-view";
import { AppNav } from "@/widgets/app-nav/app-nav";

export function OverduePage() {
  return (
    <>
      <AppNav />
      <h1 className="text-primary">연체 관리</h1>
      <OverdueView />
    </>
  );
}
