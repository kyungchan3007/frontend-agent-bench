// 도서 묶음을 모아 내보내는 barrel (현업 방식: 묶음별 진입점)
export { fetchBook, fetchBooks } from "./books";
export type { Book } from "../generated/types.gen";
