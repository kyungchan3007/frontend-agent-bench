"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// 검색어 입력창. 입력한 검색어를 브라우저 상태가 아니라 주소(?q=)에 둔다 (#81 2-3a)
// (Next.js Learn "Adding Search and Pagination": useSearchParams · usePathname · useRouter.replace)
// 주소가 바뀌면 검색 페이지(서버)가 searchParams를 받아 결과를 다시 가져온다
// 입력을 멈추고 300ms 뒤에만 주소를 바꾼다 (Learn "Best practice: Debouncing", #81 2-3a ②)
// 한글은 자모를 누를 때마다 입력이 일어나서, 없을 때는 "리엑트"에 백엔드 요청이 8번 나갔다
export function SearchBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set("q", term);
    else params.delete("q");
    replace(params.size ? `${pathname}?${params.toString()}` : pathname);
  }, 300);

  return (
    <input
      aria-label="검색어"
      defaultValue={searchParams.get("q") ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="제목으로 검색"
    />
  );
}
