import { StrictMode } from "react";
import { RouterProvider } from "react-router/dom";
import { router } from "./router";

// 아직 App Router로 옮기지 않은 화면을 React Router로 그린다. Next.js가 이 컴포넌트를 브라우저에서만 불러온다
// 앱 시작 준비(API 주소 · 가짜 응답)는 Providers가 루트 레이아웃에서 먼저 한다
// (Vite 때는 bootstrap()이 같은 준비를 하고 화면을 직접 그렸다)
export default function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
