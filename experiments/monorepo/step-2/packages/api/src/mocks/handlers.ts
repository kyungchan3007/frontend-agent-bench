import { http, HttpResponse } from "msw";
import type { Book, User } from "../generated/types.gen";

// 범용 가짜 응답: 세 앱이 함께 사용하는 도서 · 사용자 API
export const BOOKS: Book[] = [
  { id: "b1", title: "모던 자바스크립트", author: "이웅모", category: "프로그래밍" },
  { id: "b2", title: "리액트 입문", author: "김민준", category: "프로그래밍" },
  { id: "b3", title: "데이터 시각화", author: "박서연", category: "데이터" },
];

export const USERS: User[] = [
  { id: "u1", name: "홍길동" },
  { id: "u2", name: "김철수" },
];

export const commonHandlers = [
  http.get("/api/books", () => HttpResponse.json(BOOKS)),
  http.get("/api/books/:bookId", ({ params }) => {
    const book = BOOKS.find((b) => b.id === params.bookId);
    return book ? HttpResponse.json(book) : new HttpResponse(null, { status: 404 });
  }),
  http.get("/api/users/:userId", ({ params }) => {
    const user = USERS.find((u) => u.id === params.userId);
    return user ? HttpResponse.json(user) : new HttpResponse(null, { status: 404 });
  }),
];
