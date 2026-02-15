import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  publicDir: false, // don't copy public/
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "AudioPlayer",
      fileName: "index",
      formats: ["es"], // ONLY ESM, no CJS
    },
    rollupOptions: {
      external: ["react", "react-dom"], // do NOT bundle React
      output: {
        // Ensure consumers import from ES modules
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
