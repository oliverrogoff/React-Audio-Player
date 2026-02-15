import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  publicDir: false,
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "AudioPlayer",
      fileName: "index",
      formats: ["es"]
    },
    rolldownOptions: {
      external: ["react", "react-dom"]
    }
  }
});
