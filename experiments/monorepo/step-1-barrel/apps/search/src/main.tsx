import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { StatusBadge } from "@repo/ui/status-badge";
import { setupApi } from "@repo/api/setup";
import { searchBooks, setupAppApi, type SearchResult } from "./shared/api";
import { enableMocking } from "./shared/api/mocks";
import "./index.css";

// 범용 · 앱 전용 호출 코드는 클라이언트가 따로라서 두 곳 모두 주소를 설정한다
setupApi("/api");
setupAppApi("/api");

function App() {
  const [result, setResult] = useState<SearchResult | null>(null);
  useEffect(() => {
    searchBooks("자바스크립트").then(setResult);
  }, []);

  return (
    <>
      <h1 className="text-primary">도서 검색</h1>
      <p data-testid="total">검색 결과 {result?.total ?? "-"}건</p>
      {result?.items.map((book) => (
        <Card key={book.id} title={book.title}>
          <StatusBadge status="available" />
          <Button>대출하기</Button>
        </Card>
      ))}
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
