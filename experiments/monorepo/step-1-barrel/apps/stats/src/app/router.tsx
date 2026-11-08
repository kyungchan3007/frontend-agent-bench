import { createBrowserRouter } from "react-router";
import { MonthlyLoansPage } from "@/pages/monthly-loans-page";
import { PopularBooksPage } from "@/pages/popular-books-page";

// 라우트 연결: 인기 도서 · 월별 대출 (메뉴 2개)
export const router = createBrowserRouter([
  { path: "/", element: <PopularBooksPage /> },
  { path: "/monthly", element: <MonthlyLoansPage /> },
]);
