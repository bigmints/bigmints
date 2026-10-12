import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render, routes, getPage, company, brands, expertise } from "../dist-ssr/entry-server.js";

const template = await readFile("dist/index.html", "utf8");
const absolute = (path) => `${company.url}${path}`;
const organizationId = absolute("/#organization");
const websiteId = absolute("/#website");
const brandId = (brand) => absolute(`/brands/${brand.id}/#brand`);
const reference = (id) => ({ "@id": id });
const escape = (value) => value.replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const organization = {
  "@type": "Organization", "@id": organizationId,
  name: "Bigmints", legalName: company.name, url: company.url,
  logo: absolute("/brand/bigmints-mark.svg"),
  description: company.description,
  brand: brands.map((brand) => reference(brandId(brand))),
};

for (const path of [...routes, "/404.html"]) {
  const page = getPage(path);
  const url = absolute(path);
  const is404 = path === "/404.html";
  const title = is404 ? "Page not found | Bigmints" : page.title;
  const topic = page.brand ? brandId(page.brand)
    : page.capability ? `${url}#topic` : organizationId;
  const graph = [
    organization,
    ...brands.map((brand) => ({
      "@type": "Brand", "@id": brandId(brand), name: brand.name,
      url: brand.url, logo: absolute(brand.logo),
      mainEntityOfPage: reference(absolute(`/brands/${brand.id}/`)),
      ...(page.brand?.id === brand.id ? { description: brand.summary } : {}),
    })),
    {
      "@type": "WebSite", "@id": websiteId,
      url: `${company.url}/`, name: "Bigmints", inLanguage: "en",
      publisher: reference(organizationId),
    },
    {
      "@type": page.schemaType, "@id": url, url, name: title,
      description: page.description, inLanguage: "en",
      isPartOf: reference(websiteId), publisher: reference(organizationId),
      about: reference(topic),
      ...(page.brand || path === "/company/" ? { mainEntity: reference(topic) } : {}),
      ...(path === "/products/" || path === "/innovation/"
        ? { mainEntity: reference(`${url}#list`) } : {}),
      ...(!is404 && path !== "/" ? { breadcrumb: reference(`${url}#breadcrumb`) } : {}),
    },
  ];
  if (page.capability) {
    graph.push({ "@type": "Thing", "@id": topic, name: page.capability.name,
      description: page.capability.detail, url });
  }
  if (path === "/products/" || path === "/innovation/") {
    const items = path === "/products/" ? brands : expertise;
    graph.push({ "@type": "ItemList", "@id": `${url}#list`,
      name: page.label, numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem", position: index + 1, name: item.name,
        url: absolute(`/${path === "/products/" ? "brands" : "expertise"}/${item.id}/`),
      })),
    });
  }
  if (path !== "/" && !is404) {
    const crumbs = [{ label: "Bigmints", path: "/" },
      ...(page.parent ? [page.parent] : []), { label: page.label, path }];
    graph.push({ "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem", position: index + 1, name: crumb.label,
        item: absolute(crumb.path),
      })),
    });
  }
  const meta = `<title>${escape(title)}</title>
 <meta name="description" content="${escape(page.description)}"/>
 ${is404 ? '<meta name="robots" content="noindex, follow"/>' : `<meta name="robots" content="index, follow, max-image-preview:large"/><link rel="canonical" href="${url}"/>`}
 <meta property="og:type" content="website"/><meta property="og:site_name" content="Bigmints"/>
 <meta property="og:title" content="${escape(title)}"/><meta property="og:description" content="${escape(page.description)}"/><meta property="og:url" content="${url}"/>
 <meta property="og:image" content="${absolute("/og-image.png")}"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:alt" content="Bigmints. Make work easier. Make room for life."/>
 <meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(title)}"/><meta name="twitter:description" content="${escape(page.description)}"/><meta name="twitter:image" content="${absolute("/og-image.png")}"/><meta name="twitter:image:alt" content="Bigmints. Make work easier. Make room for life."/>
 <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`;
  const destination = is404 ? "dist/404.html" : `dist${path}index.html`;
  await mkdir(destination.slice(0, destination.lastIndexOf("/")), { recursive: true });
  await writeFile(destination, template.replace("<!--page-meta-->", meta)
    .replace("<!--app-html-->", render(path)));
}

await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((path) => `<url><loc>${absolute(path)}</loc></url>`).join("")}</urlset>`);
// Wildcard access already includes search and assistant crawlers. Keep the existing crawl policy.
await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${absolute("/sitemap.xml")}\n`);

// Optional agent reference files, generated from the same public copy as the HTML.
// These supplement crawlable pages; they are not a search indexing requirement.
const research = "Bigmints creates, owns and grows its own product brands. Its work in IoT and digital twins includes prototypes and product research.";
const index = `# Bigmints\n\n> ${company.description}\n\nLegal company name: ${company.name}.\n\n${research}\n\n## Company\n\n${["/", "/company/", "/products/", "/innovation/", "/contact/"].map((path) => `- [${getPage(path).label}](${absolute(path)}): ${getPage(path).description}`).join("\n")}\n\n## Product brands\n\n${brands.map((brand) => `- [${brand.name}](${absolute(`/brands/${brand.id}/`)}): ${brand.summary} Official product website: ${brand.url}`).join("\n")}\n\n## Innovation\n\n${expertise.map((item) => `- [${item.name}](${absolute(`/expertise/${item.id}/`)}): ${item.detail}`).join("\n")}\n\n## Optional\n\n- [Full company and product reference](${absolute("/llms-full.txt")}): Public descriptions, features and source pages in one text file.\n- [Sitemap](${absolute("/sitemap.xml")}): Canonical website pages.\n`;
await writeFile("dist/llms.txt", index);
await writeFile("dist/llms-full.txt", `# Bigmints — company and product reference\n\n${company.description}\n\n${research}\n\nCompany: ${absolute("/company/")}\nContact: ${absolute("/contact/")}\n\n${brands.map((brand) => `## ${brand.name}\n\n${brand.summary}\n\n${brand.headline}\n\n${brand.description}\n\n${brand.detail}\n\n${brand.features.map((feature) => `- ${feature}`).join("\n")}\n\nBigmints product page: ${absolute(`/brands/${brand.id}/`)}\nOfficial product website: ${brand.url}`).join("\n\n")}\n\n## Innovation and research\n\n${expertise.map((item) => `### ${item.name}\n\n${item.detail}\n\n${item.points.map((point) => `- ${point}`).join("\n")}\n\nSource: ${absolute(`/expertise/${item.id}/`)}`).join("\n\n")}\n`);
await writeFile("dist/.nojekyll", "");
console.log(`Pre-rendered ${routes.length} pages, custom 404, sitemap, robots.txt and agent reference files.`);
