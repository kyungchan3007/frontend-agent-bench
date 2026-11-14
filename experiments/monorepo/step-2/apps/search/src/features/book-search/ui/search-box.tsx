"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// 검색어 입력창. 입력한 검색어를 브라우저 상태가 아니라 주소(?q=)에 둔다 (#81 2-3a)
// (Next.js Learn "Adding Search and Pagination": useSearchParams · usePathname · useRouter.replace)
// 주소가 바뀌면 검색 페이지(서버)가 searchParams를 받아 결과를 다시 가져온다
export function SearchBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) params.set("q", term);
    else params.delete("q");
    replace(params.size ? `${pathname}?${params.toString()}` : pathname);
  }

  return (
    <input
      aria-label="검색어"
      defaultValue={searchParams.get("q") ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="제목으로 검색"
    />
  );
}
