import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Card } from "@repo/ui/card";
import { StatusBadge } from "@repo/ui/status-badge";
import { setupApi } from "@repo/api/setup";
import { fetchMonthlyLoans, fetchPopularBooks, setupAppApi, type MonthlyLoan, type PopularBook } from "./shared/api";
import { enableMocking } from "./shared/api/mocks";
import "./index.css";

// 범용 · 앱 전용 호출 코드는 클라이언트가 따로라서 두 곳 모두 주소를 설정한다
setupApi("/api");
setupAppApi("/api");

function App() {
  const [popular, setPopular] = useState<PopularBook[]>([]);
  const [monthly, setMonthly] = useState<MonthlyLoan[]>([]);
  useEffect(() => {
    fetchPopularBooks().then(setPopular);
    fetchMonthlyLoans().then(setMonthly);
  }, []);

  return (
    <>
      <h1 className="text-primary">통계</h1>
      <Card title="인기 도서">
        {popular.map((p) => (
          <p key={p.book.id} data-testid="popular">
            {p.book.title} {p.loanCount}회 <StatusBadge status="available" />
          </p>
        ))}
      </Card>
      <Card title="월별 대출 수">
        {monthly.map((m) => (
          <p key={m.month} data-testid="monthly">
            {m.month} {m.count}건
          </p>
        ))}
      </Card>
    </>
  );
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
