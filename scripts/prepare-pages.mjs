import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const htmlPath = path.join(outputDirectory, "index.html");
const staticDirectory = path.join(outputDirectory, "_next/static");
const cssDirectory = path.join(outputDirectory, "_next/static/css");
const imagesDirectory = path.join(outputDirectory, "images");

// This example is for the server administrator, not the public document root.
// GitHub Pages ignores Apache access rules, so exclude the directory entirely.
await rm(path.join(outputDirectory, "private"), { recursive: true, force: true });
await Promise.all([
  "index.rsc",
  "vinext-client-entry-manifest.json",
  ".vite",
  ".assetsignore",
  "_headers",
].map((entry) => rm(path.join(outputDirectory, entry), { recursive: true, force: true })));

for (const filename of await readdir(imagesDirectory)) {
  if (filename.endsWith(".json")) {
    await rm(path.join(imagesDirectory, filename), { force: true });
  }
}

let html = await readFile(htmlPath, "utf8");

html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (script) => {
  const openingTag = script.match(/^<script\b[^>]*>/i)?.[0] ?? "";

  return /type=["']application\/ld\+json["']/i.test(openingTag) ||
    /\bdata-external-consent(?:=["'][^"']*["'])?/i.test(openingTag) ||
    /\bdata-site-content(?:=["'][^"']*["'])?/i.test(openingTag)
    ? script
    : "";
});

html = html.replace(
  /<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*\/?\s*>/gi,
  "",
);

html = html
  .replaceAll('href="/_next/', 'href="./_next/')
  .replaceAll("href='/_next/", "href='./_next/");

await writeFile(htmlPath, html);

for (const entry of await readdir(staticDirectory, { withFileTypes: true })) {
  if (entry.isDirectory() && !["css", "media"].includes(entry.name)) {
    await rm(path.join(staticDirectory, entry.name), { recursive: true, force: true });
  }
}

const inlineScriptHashes = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map((match) => createHash("sha256").update(match[1]).digest("base64"))
  .map((hash) => `'sha256-${hash}'`)
  .join(" ");

const htaccessPath = path.join(outputDirectory, ".htaccess");
const htaccess = await readFile(htaccessPath, "utf8");
await writeFile(
  htaccessPath,
  htaccess.replace("__INLINE_SCRIPT_HASHES__", inlineScriptHashes),
);

for (const filename of await readdir(cssDirectory)) {
  if (!filename.endsWith(".css")) continue;

  const cssPath = path.join(cssDirectory, filename);
  const css = await readFile(cssPath, "utf8");
  const portableCss = css
    .replaceAll("url(/_next/static/media/", "url(../media/")
    .replaceAll('url("/_next/static/media/', 'url("../media/')
    .replaceAll("url('/_next/static/media/", "url('../media/");

  await writeFile(cssPath, portableCss);
}

console.log("Prepared a privacy-gated, CSP-hardened relative build for GitHub Pages.");
