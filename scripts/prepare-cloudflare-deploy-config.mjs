import { readFileSync, writeFileSync } from "node:fs";

const configPath = "dist/server/wrangler.json";
const config = JSON.parse(readFileSync(configPath, "utf8"));

config.workers_dev = true;
config.preview_urls = true;
config.vars = {
  ...(config.vars ?? {}),
  OMNIARB_MODE: "PRE_LAUNCH",
};

writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      name: config.name,
      workers_dev: config.workers_dev,
      preview_urls: config.preview_urls,
      OMNIARB_MODE: config.vars.OMNIARB_MODE,
    },
    null,
    2,
  ),
);
