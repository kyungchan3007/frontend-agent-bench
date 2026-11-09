import type { ReactNode } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { StatusBadge } from "@repo/ui/status-badge";
import type { Book } from "@repo/api/types";

// 도서 검색 · 도서 상세가 함께 쓰는 앱 공통 카드
export function BookCard({ book, children }: { book: Book; children?: ReactNode }) {
  return (
    <Card title={book.title}>
      <p className="text-sm text-text-muted">
        {book.author} · {book.category}
      </p>
      <StatusBadge status="available" />
      <Button>대출하기</Button>
      {children}
    </Card>
  );
}
