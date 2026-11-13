"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { searchBooks, type BookSearchResult } from "@/entities/book-search";
import { BookCard } from "@/shared/ui/card";

// 도서 검색 메뉴의 화면 기능. 검색어 상태와 브라우저 요청이 있어 클라이언트 컴포넌트다
// 첫 결과는 서버가 가져오고, 검색어를 입력한 뒤의 요청만 브라우저에서 한다 (#81 2-2)
// App Router로 옮기면서 링크를 React Router에서 Next.js Link로 바꿨다
export function BookSearchView({ initialResult }: { initialResult: BookSearchResult }) {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<BookSearchResult>(initialResult);
  useEffect(() => {
    // 검색어가 없을 때의 첫 결과는 서버(검색 페이지)가 가져와 props로 넘긴다
    // (Next.js 문서 "Passing data from Server to Client Components")
    if (q === "") {
      setResult(initialResult);
      return;
    }
    searchBooks(q).then(setResult);
  }, [q, initialResult]);

  return (
    <section>
      <input aria-label="검색어" value={q} onChange={(e) => setQ(e.target.value)} placeholder="제목으로 검색" />
      <p data-testid="total">검색 결과 {result.total}건</p>
      {result.items.map((book) => (
        <BookCard key={book.id} book={book}>
          <Link href={`/books/${book.id}`}>상세 보기</Link>
        </BookCard>
      ))}
    </section>
  );
}
