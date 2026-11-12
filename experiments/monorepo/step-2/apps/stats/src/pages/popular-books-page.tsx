import { PopularBooksView } from "@/features/popular-books";
import { AppNav } from "@/widgets/app-nav";

export function PopularBooksPage() {
  return (
    <>
      <AppNav />
      <h1 className="text-primary">인기 도서</h1>
      <PopularBooksView />
    </>
  );
}
