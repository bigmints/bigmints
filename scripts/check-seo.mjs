import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { routes, brands, company, getPage } from "../dist-ssr/entry-server.js";

const read = (path) => readFile(`dist${path}`, "utf8");
const canonical = (path) => company.url + path;
const titles = new Set();
const descriptions = new Set();
const sitemap = await read("/sitemap.xml");
const indexed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.deepEqual(indexed.sort(), routes.map(canonical).sort(), "Sitemap must cover exactly the published pages");
const llms = await read("/llms.txt");
const full = await read("/llms-full.txt");
assert.match(await read("/robots.txt"), /User-agent: \*\nAllow: \/\nSitemap: https:\/\/www\.bigmints\.com\/sitemap.xml/);

for (const path of routes) {
  const html = await read(`${path}index.html`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert(title && !titles.has(title), `${path}: missing or duplicate title`);
  assert(description && !descriptions.has(description), `${path}: missing or duplicate description`);
  titles.add(title); descriptions.add(description);
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, `${path}: expected one H1`);
  assert(html.includes(`<link rel="canonical" href="${canonical(path)}"`), `${path}: canonical`);
  assert(!html.includes("noindex"), `${path}: must be indexable`);
  assert(!html.includes("<!--app-html-->"), `${path}: must contain rendered HTML`);
  assert(html.includes('href="/llms.txt"'), `${path}: agent index must be linked`);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])["@graph"];
  const ids = graph.map((node) => node["@id"]);
  assert.equal(new Set(ids).size, ids.length, `${path}: duplicate entity IDs`);
  const org = graph.find((node) => node["@type"] === "Organization");
  assert.equal(org.legalName, "Bigmints FZE");
  assert.equal(org.brand.length, 6);
  // Identity signals must agree across the rendered site and public references.
  assert.deepEqual(org.alternateName, company.alternateNames);
  assert.equal(org.mainEntityOfPage["@id"], canonical("/company/"));
  assert.deepEqual(org.sameAs, company.profiles.map((profile) => profile.url));
  for (const profile of company.profiles) {
    assert(html.includes(`href="${profile.url}"`), `${path}: profile must be visible`);
    assert(llms.includes(profile.url) && full.includes(profile.url), `${path}: missing profile reference`);
  }
  if (path === "/company/") {
    assert(html.includes("Bigmints is the brand name of Bigmints FZE"), "Company identity must be visible");
  }
  const page = graph.find((node) => node["@id"] === canonical(path));
  assert(page, `${path}: missing page entity`);
  const { brand, study } = getPage(path);
  if (study) {
    const article = graph.find((node) => node["@type"] === "Article");
    assert.equal(page.mainEntity["@id"], article["@id"]);
    assert.equal(article.headline, study.title);
    assert.equal(article.mainEntityOfPage["@id"], canonical(path));
    assert.equal(article.author["@id"], org["@id"]);
    assert(llms.includes(canonical(path)), `${path}: missing agent index reference`);
    for (const section of study.sections) {
      for (const paragraph of section.paragraphs) {
        const escaped = paragraph.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
        assert(html.includes(escaped), `${path}: missing visible case study copy`);
        assert(full.includes(paragraph) && article.articleBody.includes(paragraph), `${path}: case study references differ`);
      }
    }
  }
  if (brand) {
    assert.equal(page.mainEntity["@id"], `${canonical(path)}#brand`);
    const entity = graph.find((node) => node["@id"] === page.mainEntity["@id"]);
    assert.equal(entity.url, brand.url);
    assert.equal(entity.description, brand.summary);
    assert(html.includes(brand.summary), `${path}: structured description must be visible`);
    assert(llms.includes(brand.summary) && full.includes(brand.summary), `${path}: reference copy out of sync`);
  }
  if (path !== "/") {
    const crumbs = graph.find((node) => node["@type"] === "BreadcrumbList").itemListElement;
    assert.equal(crumbs.at(-1).item, canonical(path));
    assert.deepEqual(crumbs.map((item) => item.position), crumbs.map((_, i) => i + 1));
  }
  // Check published internal page and asset links, independent of the route list.
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    await access(`dist${target}${target.endsWith("/") ? "index.html" : ""}`)
      .catch(() => assert.fail(`${path}: broken internal reference ${target}`));
  }
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, "");
  assert(!visible.includes("me@bigmints.com"), "Contact address must not appear as visible text");
}
for (const brand of brands) {
  assert(llms.includes(canonical(`/brands/${brand.id}/`)) && llms.includes(brand.url));
}
for (const text of [llms, full]) {
  assert(!text.includes("me@bigmints.com"));
  assert(text.includes("prototypes and product research"));
  for (const match of text.matchAll(/https:\/\/www\.bigmints\.com(\/[^\s)]+)/g)) {
    const target = match[1];
    await access(`dist${target}${target.endsWith("/") ? "index.html" : ""}`);
  }
}
assert.match(await read("/404.html"), /name="robots" content="noindex, follow"/);
assert(!(await read("/404.html")).includes('rel="canonical"'));
console.log(`SEO checks passed: ${routes.length} pages, six brand entities, crawlable links, sitemap and agent references.`);
