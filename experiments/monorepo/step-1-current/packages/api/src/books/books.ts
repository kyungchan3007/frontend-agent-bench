import { getBook, getBooks } from "../generated/sdk.gen";
import type { Book } from "../generated/types.gen";

// 서비스 함수: 생성 함수 위에 한 겹 더 둔다. 응답 검사는 생성 코드(validator)가 하고, 여기서는 데이터만 반환한다
export async function fetchBooks(): Promise<Book[]> {
  const { data } = await getBooks({ throwOnError: true });
  return data;
}

// 경로 파라미터는 인자로 받는다
export async function fetchBook(bookId: string): Promise<Book> {
  const { data } = await getBook({ path: { bookId }, throwOnError: true });
  return data;
}
