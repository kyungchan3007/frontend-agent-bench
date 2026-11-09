import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchBook } from "@repo/api/books";
import type { Book } from "@repo/api/types";
import { BookCard } from "@/shared/ui/card/book-card/book-card";

// 도서 상세 화면 기능: 범용 API(@repo/api/books)를 그대로 사용한다
export function BookDetailView({ bookId }: { bookId: string }) {
  const [book, setBook] = useState<Book | null>(null);
  useEffect(() => {
    fetchBook(bookId).then(setBook);
  }, [bookId]);

  if (!book) return <p>불러오는 중</p>;
  return (
    <section>
      <BookCard book={book} />
      <Link to="/">검색으로</Link>
    </section>
  );
}
