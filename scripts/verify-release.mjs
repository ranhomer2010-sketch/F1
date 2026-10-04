import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist/client");
const errors = [];

const requiredFiles = [
  "index.html",
  ".htaccess",
  "robots.txt",
  "sitemap.xml",
  "content/site.json",
  "js/site-content.js",
  "js/yandex-reviews.js",
  "admin/index.html",
  "admin/admin.js",
  "admin/api.php",
];

for (const file of requiredFiles) {
  try {
    await access(path.join(root, file));
  } catch {
    errors.push(`missing required file: ${file}`);
  }
}

const html = await readFile(path.join(root, "index.html"), "utf8");
const content = JSON.parse(await readFile(path.join(root, "content/site.json"), "utf8"));
const htaccess = await readFile(path.join(root, ".htaccess"), "utf8");
const robots = await readFile(path.join(root, "robots.txt"), "utf8");
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");

const getValue = (source, key) =>
  key.split(".").reduce((value, part) => (value == null ? undefined : value[part]), source);

for (const match of html.matchAll(/data-content="([^"]+)"/g)) {
  if (typeof getValue(content, match[1]) !== "string") {
    errors.push(`content key is missing: ${match[1]}`);
  }
}

for (const match of html.matchAll(/(?:src|href)="(\.\/[^"?#]+)"/g)) {
  const target = path.resolve(root, match[1]);
  if (!target.startsWith(`${root}${path.sep}`)) {
    errors.push(`unsafe local path: ${match[1]}`);
    continue;
  }
  try {
    await access(target);
  } catch {
    errors.push(`broken local reference: ${match[1]}`);
  }
}

if (/(?:href|src)=["']\/_next\//.test(html)) {
  errors.push("root-absolute Next.js path remains in index.html");
}
if (html.includes('rel="modulepreload"')) errors.push("unused module preload remains in index.html");
if (htaccess.includes("__INLINE_SCRIPT_HASHES__")) errors.push("CSP hashes were not generated");

const indexable = !/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
if (indexable) {
  if (!html.includes('href="https://reborn-massage.ru/"')) errors.push("production canonical URL is missing");
  if (!robots.includes("Allow: /")) errors.push("production robots.txt does not allow indexing");
  if (!sitemap.includes("https://reborn-massage.ru/")) errors.push("production sitemap URL is missing");
} else if (!robots.includes("Disallow: /")) {
  errors.push("preview robots.txt does not block indexing");
}

const publicEntries = await readdir(root);
if (publicEntries.includes("private")) errors.push("private configuration directory leaked into public build");
for (const forbidden of ["index.rsc", "vinext-client-entry-manifest.json", ".vite", ".assetsignore", "_headers"]) {
  if (publicEntries.includes(forbidden)) errors.push(`unused build artifact leaked into public build: ${forbidden}`);
}

for (const imageEntry of await readdir(path.join(root, "images"))) {
  if (imageEntry.endsWith(".json")) errors.push(`image metadata leaked into public build: ${imageEntry}`);
}

const staticEntries = await readdir(path.join(root, "_next/static"));
for (const entry of staticEntries) {
  if (!["css", "media"].includes(entry)) errors.push(`unused framework asset directory remains: ${entry}`);
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Release verification passed: links, content keys, CSP and public files are consistent.");
}
