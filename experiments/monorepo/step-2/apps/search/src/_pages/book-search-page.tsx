import { BookSearchView } from "@/features/book-search";
import { AppNav } from "@/widgets/app-nav";

export function BookSearchPage() {
  return (
    <>
      <AppNav />
      <h1 className="text-primary">도서 검색</h1>
      <BookSearchView />
    </>
  );
}
