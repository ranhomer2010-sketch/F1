import { spawnSync } from "node:child_process";

const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const result = spawnSync(pnpm, ["run", "build:pages"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: "https://reborn-massage.ru",
    NEXT_PUBLIC_ALLOW_INDEXING: "true",
  },
});

process.exit(result.status ?? 1);
