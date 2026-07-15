import { defineConfig } from "astro/config";

const base = process.env.SITE_BASE || "/";
const outDir = process.env.OUT_DIR || "./dist";

export default defineConfig({
  site: "https://inset.app",
  base,
  outDir,
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
  build: {
    format: "directory",
    assets: "_assets"
  },
  vite: {
    build: {
      cssMinify: "lightningcss"
    }
  }
});
