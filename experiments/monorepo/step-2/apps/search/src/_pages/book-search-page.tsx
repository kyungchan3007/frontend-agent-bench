import { BookSearchView } from "@/features/book-search";
import { searchBooks } from "@/entities/book-search";
import { AppNav } from "@/widgets/app-nav";

// 검색 페이지는 서버 컴포넌트다. 첫 결과(검색어 없음)를 서버에서 가져와 화면에 넘긴다 (#81 2-2)
// (Next.js 문서 "Fetching Data": 컴포넌트를 async로 만들고 데이터를 await)
export async function BookSearchPage() {
  const initialResult = await searchBooks("");
  return (
    <>
      <AppNav />
      <h1 className="text-primary">도서 검색</h1>
      <BookSearchView initialResult={initialResult} />
    </>
  );
}
