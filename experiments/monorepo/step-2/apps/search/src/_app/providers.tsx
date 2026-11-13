"use client";

import dynamic from "next/dynamic";

// 루트 레이아웃이 모든 화면을 감싸는 Provider
// (Next.js 문서 "Context providers": 브라우저 쪽 준비는 클라이언트 컴포넌트로 만들어 레이아웃에서 감싼다)
// msw/browser는 Node.js에서 쓸 수 없게 막혀 있어서("node": null), 서버 렌더링 없이 불러온다
export const Providers = dynamic(() => import("./app-start"), { ssr: false });
