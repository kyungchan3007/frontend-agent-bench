import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBook, type Book } from "@repo/api/books";
import { BookCard } from "@/shared/ui/card";

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
      {/* React Router 영역에서 나갈 때도 Next.js를 거치도록 Next.js Link를 쓴다 (React Router Link면 옛 검색 화면으로 감) */}
      <Link href="/">검색으로</Link>
    </section>
  );
}
