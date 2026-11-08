import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 층(app · pages · widgets · features · entities · shared · generated)을 @/ 별칭으로 가져온다
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});
