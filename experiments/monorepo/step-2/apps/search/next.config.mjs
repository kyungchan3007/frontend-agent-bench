/** @type {import('next').NextConfig} */
// 공식 가이드(Vite에서 이전하기) Step 2: 먼저 클라이언트 전용 앱(SPA)으로 내보낸다
const nextConfig = {
  output: "export", // 정적 파일로 내보내는 SPA
  distDir: "./dist", // 빌드 결과를 Vite 때와 같은 dist에 둔다
};

export default nextConfig;
