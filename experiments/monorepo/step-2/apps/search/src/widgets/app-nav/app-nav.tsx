"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 모든 페이지에 들어가는 메뉴 이동 바
// App Router로 옮긴 화면(/)과 아직 React Router인 화면 모두에서 쓰도록 Next.js Link로 바꿨다
const MENUS = [{ to: "/", label: "도서 검색" }];

export function AppNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="메뉴">
      {MENUS.map((m) => (
        <Link key={m.to} href={m.to} className={pathname === m.to ? "font-semibold text-primary" : "text-text-muted"}>
          {m.label}
        </Link>
      ))}
    </nav>
  );
}
