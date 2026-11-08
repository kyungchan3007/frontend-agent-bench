import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@repo/ui/button";
import { StatusBadge } from "@repo/ui/status-badge";
import { setupApi } from "@repo/api/setup";
import { fetchLoans, returnLoan, setupAppApi, type Loan } from "./shared/api";
import { enableMocking } from "./shared/api/mocks";
import "./index.css";

// 범용 · 앱 전용 호출 코드는 클라이언트가 따로라서 두 곳 모두 주소를 설정한다
setupApi("/api");
setupAppApi("/api");

// 대출 상태를 ui 배지 상태로 맞춘다 (반납됨 → 대출 가능)
const toBadge = (status: Loan["status"]) => (status === "returned" ? "available" : status);

function App() {
  const [loans, setLoans] = useState<Loan[]>([]);
  useEffect(() => {
    fetchLoans().then(setLoans);
  }, []);

  const onReturn = async (loanId: string) => {
    const returned = await returnLoan(loanId);
    setLoans((prev) => prev.map((l) => (l.id === returned.id ? returned : l)));
  };

  return (
    <>
      <h1 className="text-primary">대출 관리</h1>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id} data-testid="loan">
            {loan.book.title} · {loan.user.name} · {loan.dueDate} <StatusBadge status={toBadge(loan.status)} />
            {loan.status !== "returned" && <Button onClick={() => onReturn(loan.id)}>반납 처리</Button>}
          </li>
        ))}
      </ul>
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
