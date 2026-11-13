import { useEffect, useState, type ReactNode } from "react";
import { setupApi } from "@repo/api/setup";
import { enableMocking, setupAppApi } from "@/shared/api";

// 앱 시작 준비(API 주소 · 가짜 응답). 가짜 응답(msw/browser)은 브라우저 전용이라
// Providers가 이 파일을 서버 렌더링 없이(ssr: false) 불러온다
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

// 지금은 이전과 같게, 준비가 끝날 때까지 화면을 그리지 않는다
export default function AppStart({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    start().then(() => setReady(true));
  }, []);
  if (!ready) return null;
  return children;
}
