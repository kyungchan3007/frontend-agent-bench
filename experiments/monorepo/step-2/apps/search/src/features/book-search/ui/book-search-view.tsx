import Link from "next/link";
import type { BookSearchResult } from "@/entities/book-search";
import { BookCard } from "@/shared/ui/card";
import { SearchBox } from "./search-box";

// 도서 검색 메뉴의 화면 기능 (#81 2-3a)
// 검색어는 주소에 있고 결과는 서버(검색 페이지)가 가져오므로, 상태가 없는 서버 컴포넌트가 됐다
// 입력창(SearchBox)만 클라이언트 컴포넌트다
// App Router로 옮기면서 링크를 React Router에서 Next.js Link로 바꿨다
export function BookSearchView({ result }: { result: BookSearchResult }) {
  return (
    <section>
      <SearchBox />
      <p data-testid="total">검색 결과 {result.total}건</p>
      {result.items.map((book) => (
        <BookCard key={book.id} book={book}>
          <Link href={`/books/${book.id}`}>상세 보기</Link>
        </BookCard>
      ))}
    </section>
  );
}
