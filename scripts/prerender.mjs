import { readFile, writeFile, mkdir } from "node:fs/promises";
import {
  render,
  routes,
  getPage,
  company,
  brands,
} from "../dist-ssr/entry-server.js";
const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
for (const path of [...routes, "/404.html"]) {
  const page = getPage(path);
  const url = `${company.url}${path}`;
  const is404 = path === "/404.html";
  const title = is404 ? "Page not found | Bigmints" : page.title;
  const graph = [
    {
      "@type": "Organization",
      "@id": `${company.url}/#organization`,
      name: "Bigmints",
      legalName: company.name,
      url: company.url,
      logo: `${company.url}/brand/bigmints-mark.svg`,
      description: company.description,
      brand: brands.map((b) => ({
        "@type": "Brand",
        name: b.name,
        url: b.url,
        logo: `${company.url}${b.logo}`,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${company.url}/#website`,
      url: company.url,
      name: "Bigmints",
      publisher: { "@id": `${company.url}/#organization` },
    },
    {
      "@type": page.schemaType,
      "@id": url,
      url,
      name: title,
      description: page.description,
      isPartOf: { "@id": `${company.url}/#website` },
      about: { "@id": `${company.url}/#organization` },
    },
  ];
  if (path !== "/" && !is404) {
    const crumbs = [
      { label: "Bigmints", path: "/" },
      ...(page.parent ? [page.parent] : []),
      { label: page.label, path },
    ];
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        item: company.url + crumb.path,
      })),
    });
  }
  const meta = `<title>${escape(title)}</title>
 <meta name="description" content="${escape(page.description)}"/>
 ${is404 ? '<meta name="robots" content="noindex, follow"/>' : `<link rel="canonical" href="${url}"/>`}
 <meta property="og:type" content="website"/><meta property="og:site_name" content="Bigmints"/>
 <meta property="og:title" content="${escape(title)}"/><meta property="og:description" content="${escape(page.description)}"/><meta property="og:url" content="${url}"/>
 <meta property="og:image" content="${company.url}/og-image.png"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:alt" content="Bigmints. Make work easier. Make room for life."/>
 <meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(title)}"/><meta name="twitter:description" content="${escape(page.description)}"/><meta name="twitter:image" content="${company.url}/og-image.png"/>
 <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`;
  const destination = is404 ? "dist/404.html" : `dist${path}index.html`;
  await mkdir(destination.slice(0, destination.lastIndexOf("/")), {
    recursive: true,
  });
  await writeFile(
    destination,
    template
      .replace("<!--page-meta-->", meta)
      .replace("<!--app-html-->", render(path)),
  );
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((path) => `<url><loc>${company.url}${path}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${company.url}/sitemap.xml\n`,
);
await writeFile("dist/.nojekyll", "");
console.log(
  `Pre-rendered ${routes.length} pages, custom 404, sitemap and robots.txt.`,
);
