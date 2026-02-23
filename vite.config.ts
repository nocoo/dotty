import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync } from "fs";

function getVersion(): string {
  const pkg = JSON.parse(readFileSync(path.resolve(__dirname, "package.json"), "utf-8"));
  return pkg.version as string;
}

/** Dev-server middleware that serves GET /api/live */
function apiLivePlugin(): PluginOption {
  return {
    name: "api-live",
    configureServer(server) {
      server.middlewares.use("/api/live", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ status: "ok", version: getVersion() }));
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  define: {
    __APP_VERSION__: JSON.stringify(getVersion()),
  },
  server: {
    host: "::",
    port: 7020,
    allowedHosts: ["dotty.dev.hexly.ai"],
    hmr: {
      overlay: false,
    },
  },
  plugins: [tailwindcss(), react(), apiLivePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "@radix-ui/react-tooltip"],
  },
}));
