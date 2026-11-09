import { createBrowserRouter } from "react-router";

// 라우트 연결: 인기 도서 · 월별 대출 (메뉴 2개). 메뉴별로 코드를 나눠 불러온다
export const router = createBrowserRouter([
  { path: "/", lazy: () => import("@/pages/popular-books-page").then((m) => ({ Component: m.PopularBooksPage })) },
  { path: "/monthly", lazy: () => import("@/pages/monthly-loans-page").then((m) => ({ Component: m.MonthlyLoansPage })) },
]);
