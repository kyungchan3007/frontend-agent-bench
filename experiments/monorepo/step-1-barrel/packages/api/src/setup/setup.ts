import { client } from "../generated/client.gen";

// 모든 호출에 공통인 설정(baseUrl 등)은 앱 시작 시 이 함수로 한 번만 설정한다
export function setupApi(baseUrl: string) {
  client.setConfig({ baseUrl });
}
