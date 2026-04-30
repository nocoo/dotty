import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync } from "fs";

function getVersion(): string {
  const pkg = JSON.parse(readFileSync(path.resolve(__dirname, "package.json"), "utf-8"));
  return pkg.version as string;
}

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(getVersion()),
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      // AST-aware remapping is built into vitest v4+; no opt-in needed.
      reporter: ["text", "text-summary", "lcov"],
      include: ["src/models/**/*.ts", "src/viewmodels/**/*.ts", "src/lib/**/*.ts"],
      exclude: [
        // Test harness / fixtures — not production code.
        "src/test/**",
        // Ambient type declarations — no runtime behavior to cover.
        "src/**/*.d.ts",
        /*
         * Pure type definitions for domain models. These contain no executable
         * statements; coverage tooling would report 0/0 and skew aggregate
         * percentages. Behavior that uses these types is covered via the
         * model and viewmodel suites.
         */
        "src/models/types.ts",
      ],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
