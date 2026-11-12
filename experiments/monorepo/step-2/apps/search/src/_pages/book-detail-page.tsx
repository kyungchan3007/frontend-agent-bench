import { useParams } from "react-router";
import { BookDetailView } from "@/features/book-detail";
import { AppNav } from "@/widgets/app-nav";

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
