import { createBrowserRouter } from "react-router";

// 라우트 연결: 대출 현황 · 연체 관리 (메뉴 2개). 메뉴별로 코드를 나눠 불러온다
export const router = createBrowserRouter([
  { path: "/", lazy: () => import("@/pages/loan-status-page").then((m) => ({ Component: m.LoanStatusPage })) },
  { path: "/overdue", lazy: () => import("@/pages/overdue-page").then((m) => ({ Component: m.OverduePage })) },
]);
