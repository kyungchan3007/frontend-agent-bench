import type { Loan } from "./types";

// 대출 한 건을 카드에 필요한 값으로 바꾼다 (반납됨 → 대출 가능). 두 메뉴가 함께 사용해서 대출 묶음에 둔다
export function toCardProps(loan: Loan) {
  return {
    title: loan.book.title,
    userName: loan.user.name,
    dueDate: loan.dueDate,
    status: loan.status === "returned" ? ("available" as const) : loan.status,
  };
}
