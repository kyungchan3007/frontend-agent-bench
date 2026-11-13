// 서버가 부르는 백엔드 주소. 실험에는 실제 백엔드가 없어서 가짜 주소를 쓰고, 서버용 가짜 백엔드(msw/node)가 받는다
// 서버(Node.js)에는 브라우저 같은 "현재 주소"가 없어서 상대 주소(/api)로는 요청할 수 없다
export const BACKEND_ORIGIN = "http://backend.test";
