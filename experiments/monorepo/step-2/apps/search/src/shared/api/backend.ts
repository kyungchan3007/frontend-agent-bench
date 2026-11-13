// Next.js 서버(BFF)가 부르는 백엔드 주소. 서버에서만 쓴다
// 실험에서는 같은 모노레포의 Node.js 백엔드(apps/backend)를 부른다 (현업에서는 Java Spring 백엔드)
export const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:4000";
