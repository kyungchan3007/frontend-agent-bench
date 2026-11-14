import { BookSearchView } from "@/features/book-search";
import { AppNav } from "@/widgets/app-nav";

// 검색 페이지는 서버 컴포넌트다. 주소의 검색어(?q=)를 받아 검색 화면에 넘긴다 (#81 2-3a)
// (Next.js 문서 page.js "searchParams": Promise라서 await 한다. 쓰면 요청 때 그리는 페이지가 된다)
// 결과는 검색 화면 안의 Suspense 경계에서 가져온다 (③)
export async function BookSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return (
    <>
      <AppNav />
      <h1 className="text-primary">도서 검색</h1>
      <BookSearchView q={q} />
    </>
  );
}
