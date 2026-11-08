import { createBrowserRouter } from "react-router";
import { BookDetailPage } from "@/pages/book-detail-page";
import { BookSearchPage } from "@/pages/book-search-page";

// 라우트 연결: 도서 검색(메뉴) · 도서 상세(검색 결과에서 진입)
export const router = createBrowserRouter([
  { path: "/", element: <BookSearchPage /> },
  { path: "/books/:bookId", element: <BookDetailPage /> },
]);
