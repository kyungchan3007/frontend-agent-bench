import { NavLink } from "react-router";

// 모든 페이지에 들어가는 메뉴 이동 바
const MENUS = [
  { to: "/", label: "대출 현황" },
  { to: "/overdue", label: "연체 관리" },
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
