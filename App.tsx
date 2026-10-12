import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, Menu, X, Plus, Minus } from "lucide-react";
import { brands, company, expertise, getPage } from "./src/company/content";
import "./src/company/company.css";

const Arrow = () => <ArrowUpRight size={18} aria-hidden="true" />;
function Mark() {
  return (
    <img
      className="brand-mark"
      src="/brand/bigmints-mark.svg"
      width="40"
      height="40"
      alt=""
      aria-hidden="true"
    />
  );
}
function ProductLogo({
  brand,
  large = false,
}: {
  brand: (typeof brands)[number];
  large?: boolean;
}) {
  return (
    <img
      className={`product-logo product-logo-${brand.id}${large ? " product-logo-large" : ""}`}
      src={brand.logo}
      width={large ? 72 : 36}
      height={large ? 72 : 36}
      alt=""
      aria-hidden="true"
    />
  );
}
function ProductIdentity({ brand }: { brand: (typeof brands)[number] }) {
  return (
    <span className="product-identity">
      <ProductLogo brand={brand} />
      {brand.name}
    </span>
  );
}
function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <a href="/" className="wordmark" aria-label="Bigmints home">
        <Mark />
        bigmints
      </a>
      <button
        id="menu-toggle"
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="navigation"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
      >
        {[
          {
            href: "/products/",
            label: "Products",
            active:
              path.startsWith("/products/") || path.startsWith("/brands/"),
          },
          { href: "/company/", label: "Company", active: path === "/company/" },
          {
            href: "/innovation/",
            label: "Innovation",
            active:
              path.startsWith("/innovation/") || path.startsWith("/expertise/"),
          },
          {
            href: "/contact/",
            label: "Get in touch",
            active: path === "/contact/",
          },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`${link.active ? "nav-active" : ""} ${link.href === "/contact/" ? "nav-contact" : ""}`}
            aria-current={
              path === link.href ? "page" : link.active ? "location" : undefined
            }
          >
            {link.label}
            {link.href === "/contact/" && <Arrow />}
          </a>
        ))}
      </nav>
    </header>
  );
}
function OutcomeShowcase({ active }: { active: number }) {
  const examples = [
    {
      brand: brands[0],
      title: "More time for your business.",
      context: "Customers. Bookings. Follow-ups.",
      result: "Together, so you can stay on top of the day.",
    },
    {
      brand: brands[2],
      title: "Your idea, taking shape.",
      context: "See it. Try it. Refine it.",
      result:
        "A working version gives you something real to move forward with.",
    },
    {
      brand: brands[5],
      title: "More of the moments that matter.",
      context: "The plan. The people. The memories.",
      result: "One place to bring the whole occasion together.",
    },
  ];
  const example = examples[active];
  return (
    <aside
      className="outcome-showcase"
      aria-label="What our products help you do"
    >
      <div className="outcome-kicker">
        <span>WHAT BETTER LOOKS LIKE</span>
        <span>0{active + 1} / 03</span>
      </div>
      <a className="outcome-feature" href={`/brands/${example.brand.id}/`}>
        <span className="outcome-brand">
          <ProductIdentity brand={example.brand} />
          <Arrow />
        </span>
        <h2>{example.title}</h2>
        <div className="outcome-result">
          <strong>{example.context}</strong>
          <p>{example.result}</p>
        </div>
        <span className="outcome-explore">
          Explore {example.brand.name}
          <ArrowRight size={18} />
        </span>
      </a>
      <div className="outcome-footnote">
        ONE OF SIX BRANDS. ONE EVERYDAY DIFFERENCE.
      </div>
    </aside>
  );
}
function Hero() {
  const [active, setActive] = useState(0);
  const notes = [
    "Less to coordinate. More room to run your business.",
    "Make an idea tangible, then make it better.",
    "Bring people together and keep the moments that follow.",
  ];
  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <h1>
          Make work easier.
          <br />
          <em>Make room for life.</em>
        </h1>
        <p>
          From running a business to getting people together, our products make
          everyday things a little easier.
        </p>
        <a className="button dark" href="/products/">
          Explore our brands <ArrowRight size={18} />
        </a>
        <a className="text-link" href="/innovation/">
          See what changes <Arrow />
        </a>
      </div>
      <OutcomeShowcase active={active} />
      <div className="hero-bottom">
        <span className="micro">MADE FOR WORK. MADE FOR LIFE.</span>
        <div className="hero-selector" aria-label="Explore everyday outcomes">
          {["Business", "Creation", "Everyday"].map((label, i) => (
            <button
              key={label}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              {label}
              <span>{active === i ? "↗" : "+"}</span>
            </button>
          ))}
        </div>
        <span className="hero-note" aria-live="polite">
          {notes[active]}
        </span>
      </div>
    </section>
  );
}
function BrandCard({
  brand,
  index,
}: {
  brand: (typeof brands)[number];
  index: number;
}) {
  return (
    <a className={`brand-card ${brand.color}`} href={`/brands/${brand.id}/`}>
      <div className="brand-card-top">
        <span className="micro">{brand.category}</span>
        <Arrow />
      </div>
      <p className="brand-outcome">{brand.headline}</p>
      <div className="brand-card-bottom">
        <div>
          <span className="brand-index">0{index + 1} / BIGMINTS FAMILY</span>
          <h3>
            <ProductLogo brand={brand} />
            {brand.name}
            <span>↗</span>
          </h3>
        </div>
        <p>{brand.description}</p>
      </div>
    </a>
  );
}
function PageIntro({
  eyebrow,
  title,
  emphasis,
  description,
}: {
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
}) {
  return (
    <section className="page-intro wrap">
      <span className="eyebrow">{eyebrow}</span>
      <h1>
        {title}
        <br />
        <em>{emphasis}</em>
      </h1>
      <p>{description}</p>
    </section>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <section className="section wrap home-products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OUR PRODUCTS</span>
            <h2>
              Made for a reason.
              <br />
              <em>Made to be used.</em>
            </h2>
          </div>
          <a className="text-link" href="/products/">
            Explore all six brands <Arrow />
          </a>
        </div>
        <div className="brand-grid home-brand-grid">
          {[brands[0], brands[2], brands[4]].map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              index={brands.indexOf(brand)}
            />
          ))}
        </div>
      </section>
      <section className="company-section section">
        <div className="wrap home-company">
          <div>
            <span className="eyebrow">THE COMPANY BEHIND THE BRANDS</span>
            <h2>
              One company.
              <br />
              <em>Everyday possibilities.</em>
            </h2>
          </div>
          <div>
            <p className="large-copy">
              Bigmints FZE LLC creates, owns and grows products for better ways
              to work, create and connect.
            </p>
            <p>
              Different brands, each with a clear purpose. A shared belief that
              technology earns its place through what it makes possible.
            </p>
            <a className="text-link" href="/company/">
              Get to know Bigmints <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
function ProductsPage() {
  return (
    <>
      <PageIntro
        eyebrow="THE BIGMINTS FAMILY"
        title="Real things to use."
        emphasis="Everyday reasons to use them."
        description="Products for running a business, creating something new, finding a thought and bringing people together. Find the one that fits your day."
      />
      <section
        className="wrap product-directory"
        aria-label="Our six product brands"
      >
        <div className="directory-caption">
          <span>SIX BRANDS / ONE PRODUCT COMPANY</span>
          <a href="/company/">
            Meet the company <Arrow />
          </a>
        </div>
        <div className="brand-grid">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
function InnovationPage() {
  const [expanded, setExpanded] = useState<string | null>("ai");
  return (
    <>
      <PageIntro
        eyebrow="INNOVATION AT BIGMINTS"
        title="Better possibilities."
        emphasis="A purpose behind each one."
        description="We explore technology through the difference it can make in our own products. Useful AI, connected environments and clearer ways to understand the world."
      />
      <section id="expertise" className="expertise section">
        <div className="wrap expertise-layout">
          <div className="section-intro">
            <span className="eyebrow">OUR PRODUCT FOCUS</span>
            <h2>
              Less friction.
              <br />
              <em>More forward motion.</em>
            </h2>
            <p>
              A business that is easier to manage. An idea you can finally try.
              A clearer view of what needs your attention. These are the
              outcomes that guide our products and explorations.
            </p>
            <a className="text-link" href="/products/">
              Find a product for you <Arrow />
            </a>
          </div>
          <div className="expertise-list">
            {expertise.map((item) => (
              <div
                className={`expertise-item ${expanded === item.id ? "expanded" : ""}`}
                key={item.id}
              >
                <h3>
                  <button
                    aria-expanded={expanded === item.id}
                    aria-controls={`expertise-${item.id}`}
                    onClick={() =>
                      setExpanded(expanded === item.id ? null : item.id)
                    }
                  >
                    <span className="item-number">{item.number}</span>
                    {item.outcome}
                    {expanded === item.id ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </button>
                </h3>
                <div
                  id={`expertise-${item.id}`}
                  hidden={expanded !== item.id}
                  className="expertise-content"
                >
                  <p>{item.description}</p>
                  <p className="supporting-field">
                    Supported by {item.name.toLowerCase()}.
                  </p>
                  <a href={`/expertise/${item.id}/`} className="text-link">
                    Inside our product thinking <Arrow />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section research-note">
        <span className="eyebrow">PRODUCTS AND EXPLORATIONS</span>
        <h2>
          Some ideas are ready to use.
          <br />
          <em>Others are still taking shape.</em>
        </h2>
        <p>
          Our brands give you products to explore today. Our work in connected
          environments and digital twins also includes prototypes and product
          research. We keep that distinction clear as ideas develop.
        </p>
        <a className="text-link" href="/products/">
          Explore our brands <Arrow />
        </a>
      </section>
    </>
  );
}
function CompanyPage() {
  return (
    <>
      <PageIntro
        eyebrow="BIGMINTS FZE LLC"
        title="A product company."
        emphasis="A family of possibilities."
        description="We create, own and grow our own brands. Each starts with an everyday need and becomes a product with a purpose of its own."
      />
      <section id="company" className="company-section section">
        <div className="wrap">
          <span className="eyebrow">WHAT CONNECTS OUR BRANDS</span>
          <div className="company-grid">
            <h2>
              One company.
              <br />
              A family of products.
              <br />
              <em>Everyday possibilities.</em>
            </h2>
            <div>
              <p className="large-copy">
                Bigmints FZE LLC is a technology product company. We create, own
                and grow a family of brands for better ways to work, create and
                connect.
              </p>
              <p>
                Our brands start with everyday needs: keeping a business moving,
                making an idea tangible, remembering a thought or getting people
                together.
              </p>
              <p>
                AI, IoT, digital twins and thoughtful product design support
                that work. Their value is in what they help someone do.
              </p>
              <a className="text-link" href="/products/">
                Meet our products <Arrow />
              </a>
            </div>
          </div>
          <div className="principles">
            {[
              [
                "Time for what matters",
                "Less coordination between you and the work you care about.",
              ],
              [
                "Clarity to move forward",
                "Useful context when you need to choose the next step.",
              ],
              [
                "Room to connect",
                "Keep people, ideas and shared experiences closer together.",
              ],
            ].map(([title, text], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section company-next">
        <span className="eyebrow">GET TO KNOW BIGMINTS</span>
        <div className="related-links">
          <a href="/products/">
            <h3>Our products</h3>
            <p>Meet the six brands and find what each makes easier.</p>
            <Arrow />
          </a>
          <a href="/innovation/">
            <h3>Our innovation</h3>
            <p>Explore the thinking behind our products and research.</p>
            <Arrow />
          </a>
          <a href="/contact/">
            <h3>Get in touch</h3>
            <p>
              Connect with Bigmints about company enquiries and partnerships.
            </p>
            <Arrow />
          </a>
        </div>
      </section>
    </>
  );
}
function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="CONTACT BIGMINTS"
        title="A conversation about"
        emphasis="what comes next."
        description="For company enquiries, product conversations and partnerships, get in touch with Bigmints FZE LLC."
      />
      <section className="wrap contact-options">
        <div className="contact-company">
          <span className="eyebrow">COMPANY & PARTNERSHIPS</span>
          <h2>Talk to Bigmints.</h2>
          <p>
            Interested in one of our brands or a partnership with the company?
            Tell us what you have in mind.
          </p>
          <a className="button dark" href={company.contact}>
            Contact Bigmints <Arrow />
          </a>
          <span className="contact-note">Opens your email app.</span>
        </div>
        <div className="contact-products">
          <span className="eyebrow">LOOKING FOR A PRODUCT?</span>
          <h2>Go straight to the source.</h2>
          <p>
            Visit each product’s website for product-specific information and
            available ways to get help.
          </p>
          <div className="product-contact-list">
            {brands.map((brand) => (
              <a
                key={brand.id}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ProductIdentity brand={brand} />
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
function Detail({ path }: { path: string }) {
  const { brand, capability } = getPage(path);
  if (!brand && !capability)
    return (
      <section className="detail wrap">
        <span className="eyebrow">404 / PAGE NOT FOUND</span>
        <h1>A different direction.</h1>
        <p>This page isn’t here. Explore what we’re building at Bigmints.</p>
        <a href="/" className="button dark">
          Back to Bigmints <ArrowRight size={18} />
        </a>
      </section>
    );
  const item = brand || capability!;
  return (
    <>
      <section className="detail wrap">
        <a
          className="text-link breadcrumb"
          href={brand ? "/products/" : "/innovation/"}
        >
          ← {brand ? "All products" : "Innovation"}
        </a>
        <span className="eyebrow">
          {brand
            ? `A BIGMINTS BRAND / ${brand.category}`
            : `BIGMINTS / ${capability!.name.toUpperCase()}`}
        </span>
        {brand && <ProductLogo brand={brand} large />}
        <h1>
          {brand ? brand.name : capability!.outcome}
          <span className="detail-headline">
            {brand ? brand.headline : capability!.short}
          </span>
        </h1>
        <p className="detail-description">{item.description}</p>
        {brand ? (
          <a
            className="button dark"
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit {brand.name} <Arrow />
          </a>
        ) : (
          <a href="/products/" className="button dark">
            Explore our products <Arrow />
          </a>
        )}
      </section>
      <section className="detail-body section">
        <div className="wrap detail-grid">
          <h2>
            {brand
              ? "What this makes easier."
              : "The difference we aim to make."}
          </h2>
          <div>
            <p className="large-copy">{item.detail}</p>
            <ul className="feature-list">
              {(brand ? brand.features : capability!.points).map(
                (feature, i) => (
                  <li key={feature}>
                    <span>0{i + 1}</span>
                    {feature}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>
      {capability && capability.related.length > 0 && (
        <section className="wrap section">
          <span className="eyebrow">FROM THE BIGMINTS FAMILY</span>
          <h2>Explore related brands.</h2>
          <div className="related-links">
            {brands
              .filter((b) => capability.related.includes(b.id))
              .map((b) => (
                <a href={`/brands/${b.id}/`} key={b.id}>
                  <h3>
                    <ProductIdentity brand={b} />
                  </h3>
                  <p>{b.description}</p>
                  <Arrow />
                </a>
              ))}
          </div>
        </section>
      )}
      <section className="wrap detail-back">
        <a className="text-link" href="/products/">
          Explore all six brands <ArrowRight size={18} />
        </a>
      </section>
    </>
  );
}
function ProductCallout() {
  return (
    <section id="contact" className="contact section">
      <div className="wrap contact-inner">
        <div>
          <span className="eyebrow">THE BIGMINTS FAMILY</span>
          <h2>
            Find your next
            <br />
            <em>everyday essential.</em>
          </h2>
          <p>
            Explore products for your business, your ideas and your everyday
            life.
            <br />
            For company enquiries and partnerships,{" "}
            <a className="text-link" href="/contact/">
              get in touch <Arrow />
            </a>
            .
          </p>
        </div>
        <a className="button dark" href="/products/">
          Explore our products <Arrow />
        </a>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <a href="/" className="wordmark">
          <Mark />
          bigmints
        </a>
        <span>Ideas into impact.</span>
        <nav className="footer-navigation" aria-label="Footer navigation">
          <a href="/products/">Products</a>
          <a href="/company/">Company</a>
          <a href="/innovation/">Innovation</a>
          <a href="/contact/">Contact</a>
        </nav>
        <a href="/products/">
          Explore our brands <Arrow />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Bigmints FZE LLC</span>
        <span>Technology innovation. Human possibility.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
export default function App({ path = "/" }: { path?: string }) {
  useEffect(() => {
    document.title = getPage(path).title;
  }, [path]);
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main">
        {path === "/" ? (
          <Home />
        ) : path === "/products/" ? (
          <ProductsPage />
        ) : path === "/company/" ? (
          <CompanyPage />
        ) : path === "/innovation/" ? (
          <InnovationPage />
        ) : path === "/contact/" ? (
          <ContactPage />
        ) : (
          <Detail path={path} />
        )}
        {path !== "/contact/" && path !== "/products/" && <ProductCallout />}
      </main>
      <Footer />
    </div>
  );
}
