import { useEffect, useState } from "react";
import { RankingChart } from "@/shared/ui/chart";
import { StatusBadge } from "@repo/ui/status-badge";
import { fetchPopularBooks, type PopularBook } from "@/entities/stats";
import { StatCard } from "@/shared/ui/card";

// 인기 도서 메뉴의 화면 기능
export function PopularBooksView() {
  const [items, setItems] = useState<PopularBook[]>([]);
  useEffect(() => {
    fetchPopularBooks().then(setItems);
  }, []);

  return (
    <>
      <StatCard title="인기 도서" rows={items.map((p) => ({ key: p.book.id, label: p.book.title, value: `${p.loanCount}회` }))} />
      <RankingChart labels={items.map((p) => p.book.title)} values={items.map((p) => p.loanCount)} />
      <StatusBadge status="available" />
    </>
  );
}
