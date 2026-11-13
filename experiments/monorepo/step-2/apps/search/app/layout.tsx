import type { Metadata } from "next";
import "../src/index.css";
import { Providers } from "@/_app/providers";

// 공식 가이드 Step 4: index.html을 루트 레이아웃으로 옮긴다
export const metadata: Metadata = {
  title: "도서 검색",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
