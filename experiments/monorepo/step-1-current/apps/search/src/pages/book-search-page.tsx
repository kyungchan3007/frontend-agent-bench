import { BookSearchView } from "@/features/book-search/ui/book-search-view";
import { AppNav } from "@/widgets/app-nav/app-nav";

export function BookSearchPage() {
  return (
    <>
      <AppNav />
      <h1 className="text-primary">도서 검색</h1>
      <BookSearchView />
    </>
  );
}
