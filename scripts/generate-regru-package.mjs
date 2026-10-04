import { copyFile, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { pbkdf2Sync, randomBytes, randomInt } from "node:crypto";
import path from "node:path";

const outputArgument = process.argv[2];
const existingConfigArgument = process.argv[3];
if (!outputArgument) {
  throw new Error("Usage: node scripts/generate-regru-package.mjs <new-output-directory>");
}

const source = path.resolve("dist/client");
const output = path.resolve(outputArgument);
const publicRoot = path.join(output, "public_html");
const privateRoot = path.join(output, "private");

try {
  await readFile(path.join(source, "index.html"));
} catch {
  throw new Error("Build not found. Run pnpm build:pages first.");
}

await mkdir(output, { recursive: false });
await cp(source, publicRoot, { recursive: true });
await mkdir(privateRoot, { mode: 0o700 });

const username = "alexandra_admin";
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
const password = Array.from({ length: 24 }, () => alphabet[randomInt(alphabet.length)]).join("");
const salt = randomBytes(24).toString("hex");
const iterations = 600000;
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("hex");
const rateLimitSecret = randomBytes(32).toString("hex");
const sessionName = `alexandra_admin_${randomBytes(4).toString("hex")}`;

const generatedConfig = `<?php
declare(strict_types=1);

return [
    'username' => '${username}',
    'password' => [
        'algo' => 'pbkdf2-sha256',
        'salt' => '${salt}',
        'iterations' => ${iterations},
        'hash' => '${hash}',
    ],
    'rate_limit_secret' => '${rateLimitSecret}',
    'session_name' => '${sessionName}',
    'session_ttl' => 1800,
];
`;

const guide = `# Публикация reborn-massage.ru на Reg.ru

1. Включите SSL-сертификат для домена и дождитесь, пока HTTPS заработает.
2. Загрузите содержимое папки public_html в публичную папку сайта на хостинге.
3. Загрузите папку private рядом с public_html, но не внутрь неё.
4. Для public_html/content/site.json разрешите PHP запись (обычно 0664).
5. Для папки private разрешите владельцу сайта чтение и запись (обычно 0700 или 0750).
6. Откройте https://reborn-massage.ru/admin/ и войдите с выданными отдельно реквизитами.
7. Измените тестовую строку, сохраните и проверьте обновление на главной странице.

Не переносите исходники, историю Git или текстовый файл с паролем в public_html.
`;

if (existingConfigArgument) {
  await copyFile(path.resolve(existingConfigArgument), path.join(privateRoot, "admin-config.php"));
} else {
  await writeFile(path.join(privateRoot, "admin-config.php"), generatedConfig, { mode: 0o600 });
}
await writeFile(path.join(output, "DEPLOYMENT.md"), guide, { mode: 0o600 });

console.log(JSON.stringify({
  output,
  username,
  password: existingConfigArgument ? "unchanged" : password,
}));
