import { useParams } from "react-router";
import { BookDetailView } from "@/features/book-detail/ui/book-detail-view";
import { AppNav } from "@/widgets/app-nav/app-nav";

export function BookDetailPage() {
  const { bookId = "" } = useParams();
  return (
    <>
      <AppNav />
      <h1 className="text-primary">도서 상세</h1>
      <BookDetailView bookId={bookId} />
    </>
  );
}
