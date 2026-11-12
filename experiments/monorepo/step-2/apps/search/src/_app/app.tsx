import { StrictMode, useEffect, useState } from "react";
import { RouterProvider } from "react-router/dom";
import { setupApi } from "@repo/api/setup";
import { enableMocking, setupAppApi } from "@/shared/api";
import { router } from "./router";

// 앱 시작 준비(API 주소 · 가짜 응답)를 마친 뒤 라우터를 그린다. Next.js가 이 컴포넌트를 브라우저에서만 불러온다
// (Vite 때는 bootstrap()이 같은 준비를 하고 화면을 직접 그렸다)
// 범용 · 앱 전용 호출 코드는 클라이언트가 따로라서 두 곳 모두 주소를 설정한다
let starting: Promise<void> | null = null;
function start() {
  // 개발 모드의 StrictMode는 effect를 두 번 실행하므로, 가짜 응답 워커는 한 번만 시작한다
  starting ??= (async () => {
    setupApi("/api");
    setupAppApi("/api");
    await enableMocking();
  })();
  return starting;
}

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    start().then(() => setReady(true));
  }, []);
  if (!ready) return null;
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
