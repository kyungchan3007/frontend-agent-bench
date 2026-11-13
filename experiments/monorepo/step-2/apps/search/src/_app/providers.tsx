"use client";

import type { ReactNode } from "react";
import { setupApi } from "@repo/api/setup";
import { setupAppApi } from "@/shared/api";

// 루트 레이아웃이 모든 화면을 감싸는 Provider
// (Next.js 문서 "Context providers": 브라우저 쪽 준비는 클라이언트 컴포넌트로 만들어 레이아웃에서 감싼다)
// 가짜 응답(MSW)을 지운 뒤로는 기다릴 준비가 없어서, API 주소만 설정하고 화면을 막지 않는다 (#81 2-2)
// 브라우저의 /api 요청은 Next.js Route Handler(app/api/**)가 받아 백엔드로 넘긴다
// 범용 · 앱 전용 호출 코드는 클라이언트가 따로라서 두 곳 모두 주소를 설정한다
setupApi("/api");
setupAppApi("/api");

export function Providers({ children }: { children: ReactNode }) {
  return children;
}
