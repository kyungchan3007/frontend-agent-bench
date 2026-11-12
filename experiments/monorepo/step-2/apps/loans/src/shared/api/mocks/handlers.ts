import { http, HttpResponse } from "msw";
import { BOOKS, USERS } from "@repo/api/mocks";
import type { Loan } from "@/generated/api/types.gen";

// 대출 앱 가짜 응답
const LOANS: Loan[] = [
  { id: "l1", book: BOOKS[0], user: USERS[0], dueDate: "2026-11-20", status: "loaned" },
  { id: "l2", book: BOOKS[1], user: USERS[1], dueDate: "2026-11-01", status: "overdue" },
];

export const appHandlers = [
  http.get("/api/loans", ({ request }) => {
    const status = new URL(request.url).searchParams.get("status");
    return HttpResponse.json(status ? LOANS.filter((l) => l.status === status) : LOANS);
  }),
  http.post("/api/loans/:loanId/return", ({ params }) => {
    const loan = LOANS.find((l) => l.id === params.loanId);
    if (!loan) return new HttpResponse(null, { status: 404 });
    loan.status = "returned";
    return HttpResponse.json(loan);
  }),
];
