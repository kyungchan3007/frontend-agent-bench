/** @type {import('next').NextConfig} */
// #81: 정적 내보내기(output: 'export')를 빼고 서버 모드로 바꿨다.
// 미리 만들지 않은 동적 주소(/books/b1 등)를 요청이 올 때 처리하기 위해서다
const nextConfig = {
  distDir: "./dist", // 빌드 결과 폴더는 이번 단계에서 바꾸지 않는다
};

export default nextConfig;
