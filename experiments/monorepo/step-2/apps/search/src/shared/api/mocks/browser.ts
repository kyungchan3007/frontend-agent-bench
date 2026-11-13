import { setupWorker } from "msw/browser";
import { commonHandlers } from "@repo/api/mocks";
import { createAppHandlers } from "./handlers";

// 범용 가짜 응답(@repo/api)과 이 앱의 가짜 응답을 함께 등록한다
export const worker = setupWorker(...commonHandlers, ...createAppHandlers());

// 실제 서버가 없는 실험이라 항상 켠다. 앱을 그리기 전에 워커 등록을 기다린다
export async function enableMocking() {
  await worker.start({ onUnhandledFrame: "bypass" });
}
