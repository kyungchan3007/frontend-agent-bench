import { createBrowserRouter } from "react-router";

// 라우트 연결: 아직 App Router로 옮기지 않은 도서 상세만 남았다. 메뉴별로 코드를 나눠 불러온다
// 도서 검색(/)은 2-1에서 App Router로 옮긴 뒤 쓰이지 않던 경로라, 검색 페이지가 searchParams를 받게 되면서 지웠다 (#81 2-3a)
export const router = createBrowserRouter([
  { path: "/books/:bookId", lazy: () => import("@/_pages/book-detail-page").then((m) => ({ Component: m.BookDetailPage })) },
]);
