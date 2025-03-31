import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import monkey from "vite-plugin-monkey";

export default defineConfig({
  plugins: [
    solidPlugin(),
    monkey({
      entry: "src/index.tsx",
      userscript: {
        namespace: "<@1225068050923917404>",
        match: ["https://neal.fun/infinite-craft/*"],
        grant: ["GM.getValue", "GM.setValue", "unsafeWindow"],
        version: "2.0.0",
        author: "@errorplex on Discord",
      },
    }),
  ],
  build: {
    minify: "esbuild",
  },
});
