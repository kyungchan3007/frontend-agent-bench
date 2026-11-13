// 서버가 시작될 때 한 번 실행된다 (Next.js 문서 "Instrumentation")
// 현업에서는 Next.js 서버가 백엔드를 부르는데, 실험에는 백엔드가 없어서 서버용 가짜 백엔드(msw/node)를 켠다
// register는 모든 런타임에서 불리므로 Node.js일 때만 불러온다 (문서 "Importing runtime-specific code")
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { server } = await import("@/shared/api/mocks/node");
    server.listen({ onUnhandledFrame: "bypass" });
  }
}
