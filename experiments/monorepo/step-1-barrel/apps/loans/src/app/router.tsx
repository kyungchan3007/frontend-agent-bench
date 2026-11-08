import { createBrowserRouter } from "react-router";
import { LoanStatusPage } from "@/pages/loan-status-page";
import { OverduePage } from "@/pages/overdue-page";

// 라우트 연결: 대출 현황 · 연체 관리 (메뉴 2개)
export const router = createBrowserRouter([
  { path: "/", element: <LoanStatusPage /> },
  { path: "/overdue", element: <OverduePage /> },
]);
