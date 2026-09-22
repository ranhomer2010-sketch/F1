import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const htmlPath = path.join(outputDirectory, "index.html");
const cssDirectory = path.join(outputDirectory, "_next/static/css");

let html = await readFile(htmlPath, "utf8");

html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (script) =>
  /type=["']application\/ld\+json["']/i.test(script) ? script : "",
);

html = html.replace(
  /<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*\/?\s*>/gi,
  "",
);

html = html
  .replaceAll('href="/_next/', 'href="./_next/')
  .replaceAll("href='/_next/", "href='./_next/");

await writeFile(htmlPath, html);

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

console.log("Prepared a script-free, relative-path build for GitHub Pages.");
