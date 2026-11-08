import { useEffect, useState } from "react";
import { StatusBadge } from "@repo/ui/status-badge";
import { fetchPopularBooks } from "@/entities/stats/api/stats";
import type { PopularBook } from "@/entities/stats/model/types";
import { StatCard } from "@/shared/ui/card/stat-card/stat-card";

// 인기 도서 메뉴의 화면 기능
export function PopularBooksView() {
  const [items, setItems] = useState<PopularBook[]>([]);
  useEffect(() => {
    fetchPopularBooks().then(setItems);
  }, []);

  return (
    <>
      <StatCard title="인기 도서" rows={items.map((p) => ({ key: p.book.id, label: p.book.title, value: `${p.loanCount}회` }))} />
      <StatusBadge status="available" />
    </>
  );
}
