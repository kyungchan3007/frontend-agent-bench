import { Suspense } from "react";
import { BookSearchResults } from "./book-search-results";
import { SearchBox } from "./search-box";

// 도서 검색 메뉴의 화면 기능 (#81 2-3a)
// 검색어는 주소에 있고, 결과는 서버 컴포넌트(BookSearchResults)가 가져온다
// 결과를 기다리는 동안 이전 결과 대신 로딩 문구를 보여 주려고 Suspense로 감싼다 (③)
// key에 검색어를 넣어 검색어가 바뀔 때마다 로딩 문구가 다시 보이게 한다 (Learn 예시의 key={query + currentPage})
export function BookSearchView({ q }: { q: string }) {
  return (
    <section>
      <SearchBox />
      <Suspense key={q} fallback={<p data-testid="total">검색 결과를 불러오는 중…</p>}>
        <BookSearchResults q={q} />
      </Suspense>
    </section>
  );
}
