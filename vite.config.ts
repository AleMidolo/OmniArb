import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";

export default defineConfig({
  plugins: [
    vinext(),
    cloudflare({
      configPath: "./wrangler.jsonc",
      config: {
        compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"],
        workers_dev: true,
        preview_urls: true,
        vars: {
          OMNIARB_MODE: "PRE_LAUNCH",
        },
      },
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
