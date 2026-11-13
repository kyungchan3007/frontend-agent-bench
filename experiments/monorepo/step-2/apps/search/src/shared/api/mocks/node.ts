import { setupServer } from "msw/node";
import { BACKEND_ORIGIN } from "../backend";
import { createAppHandlers } from "./handlers";

// 서버(Node.js)용 가짜 백엔드 (MSW 문서 "Node.js integration": msw/node의 setupServer)
// 범용 가짜 응답(@repo/api/mocks)은 상대 경로로 등록돼 있어 서버에서는 맞는 요청이 없다.
// 공통 패키지는 앱 3개를 옮긴 뒤 정리하기로 해서 그대로 두고, 서버에서 쓰는 검색 응답만 백엔드 주소로 등록한다
// 브라우저 코드에 섞이지 않도록 barrel(index.ts)로 내보내지 않고 instrumentation.ts에서 바로 불러온다
export const server = setupServer(...createAppHandlers(BACKEND_ORIGIN));
