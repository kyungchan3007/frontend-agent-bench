import { client } from "@/generated/api/client.gen";

// 앱 전용 명세에서 생성된 호출 코드는 범용(@repo/api)과 별도의 클라이언트를 가진다. 앱 시작 시 한 번 설정한다
export function setupAppApi(baseUrl: string) {
  client.setConfig({ baseUrl });
}
