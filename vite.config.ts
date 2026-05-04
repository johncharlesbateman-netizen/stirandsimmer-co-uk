import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// @ts-ignore — plain JS module, no types needed
import { generateSitemap } from "./scripts/generate-sitemap.mjs";

// Regenerates public/sitemap.xml from the database before each production build.
const sitemapPlugin = () => ({
  name: "generate-sitemap",
  apply: "build" as const,
  async buildStart() {
    try {
      await generateSitemap();
    } catch (e) {
      console.warn("[sitemap] Generation failed, keeping existing file:", (e as Error).message);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
