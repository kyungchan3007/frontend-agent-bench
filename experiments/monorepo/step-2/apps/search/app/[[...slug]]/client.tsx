"use client";

import dynamic from "next/dynamic";

// 기존 앱을 브라우저에서만 불러온다 (서버 렌더링 없음)
const App = dynamic(() => import("@/_app/app"), { ssr: false });

export function ClientOnly() {
  return <App />;
}
