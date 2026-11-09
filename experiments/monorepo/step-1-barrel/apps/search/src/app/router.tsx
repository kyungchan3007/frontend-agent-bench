import { createBrowserRouter } from "react-router";

// 라우트 연결: 도서 검색(메뉴) · 도서 상세(검색 결과에서 진입). 메뉴별로 코드를 나눠 불러온다
export const router = createBrowserRouter([
  { path: "/", lazy: () => import("@/pages/book-search-page").then((m) => ({ Component: m.BookSearchPage })) },
  { path: "/books/:bookId", lazy: () => import("@/pages/book-detail-page").then((m) => ({ Component: m.BookDetailPage })) },
]);
