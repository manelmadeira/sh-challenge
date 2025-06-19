import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["test-setup.ts"],
    coverage: {
      include: ["app/**", "components/**"],
      exclude: ["app/api/**", "components/ui/**", "**/index.ts"],
    },
  },
});
