import { NavLink } from "react-router";

// 모든 페이지에 들어가는 메뉴 이동 바
const MENUS = [
  { to: "/", label: "인기 도서" },
  { to: "/monthly", label: "월별 대출" },
];

export function AppNav() {
  return (
    <nav aria-label="메뉴">
      {MENUS.map((m) => (
        <NavLink key={m.to} to={m.to} end className={({ isActive }) => (isActive ? "font-semibold text-primary" : "text-text-muted")}>
          {m.label}
        </NavLink>
      ))}
    </nav>
  );
}
