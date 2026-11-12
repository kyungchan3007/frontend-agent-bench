import { ClientOnly } from "./client";

// 공식 가이드 Step 5: 모든 주소를 이 페이지 하나가 받는다. 화면은 기존 React Router가 정한다
export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default function Page() {
  return <ClientOnly />;
}
