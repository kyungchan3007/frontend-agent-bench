import { ClientOnly } from "./client";

// 아직 App Router로 옮기지 않은 화면을 받는 페이지. 화면은 기존 React Router가 정한다
// / 는 app/page.tsx가 맡도록, 빈 주소를 받지 않는 [...slug]로 바꿨다
// (빈 주소까지 받는 [[...slug]]와 app/page.tsx를 함께 두면 빌드 오류가 난다)
export default function Page() {
  return <ClientOnly />;
}
