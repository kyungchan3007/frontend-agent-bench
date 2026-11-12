import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { setupApi } from "@repo/api/setup";
import { enableMocking, setupAppApi } from "@/shared/api";
import { router } from "./router";

// 범용 · 앱 전용 호출 코드는 클라이언트가 따로라서 두 곳 모두 주소를 설정한다
export async function bootstrap() {
  setupApi("/api");
  setupAppApi("/api");
  await enableMocking();
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
