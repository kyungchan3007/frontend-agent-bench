import { useEffect, useState } from "react";
import { Link } from "react-router";
import { searchBooks, type BookSearchResult } from "@/entities/book-search";
import { BookCard } from "@/shared/ui/card";

// 도서 검색 메뉴의 화면 기능
export function BookSearchView() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<BookSearchResult | null>(null);
  useEffect(() => {
    searchBooks(q).then(setResult);
  }, [q]);

  return (
    <section>
      <input aria-label="검색어" value={q} onChange={(e) => setQ(e.target.value)} placeholder="제목으로 검색" />
      <p data-testid="total">검색 결과 {result?.total ?? "-"}건</p>
      {result?.items.map((book) => (
        <BookCard key={book.id} book={book}>
          <Link to={`/books/${book.id}`}>상세 보기</Link>
        </BookCard>
      ))}
    </section>
  );
}
