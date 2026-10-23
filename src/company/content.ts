export const company = {
  name: "Bigmints FZE",
  displayName: "Bigmints",
  alternateNames: ["BigMints", "Bigmints FZE"],
  category: "Technology product company",
  profiles: [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/bigmints/" },
  ],
  url: "https://www.bigmints.com",
  title: "Bigmints FZE — Technology Product Company",
  description:
    "Bigmints FZE builds technology products for better service, happier customers and more room for life. The company behind Saveaday, Youbot and Fikr.",
  contact: "mailto:me@bigmints.com?subject=Bigmints%20company%20enquiry",
};
export const pillars = [
  {
    id: "service-excellence",
    name: "Service excellence",
    title: "Better service.",
    description: "Help people find useful answers, understand the next step and reach the right person when they need help.",
    detail: "Good service needs clear information and a reliable way forward. We design products to keep context close to the conversation and make it easier for people to step in when their judgement matters.",
  },
  {
    id: "customer-happiness",
    name: "Customer happiness",
    title: "Happier customers.",
    description: "Make it easier to get help, with less waiting, less repetition and a conversation that feels connected.",
    detail: "A customer should be able to get help without repeating their story. We design for clear replies, useful next steps and continuity when a conversation passes to a person. The aim is an experience where people feel heard and know where they stand.",
  },
  {
    id: "operational-efficiency",
    name: "Operational efficiency",
    title: "More room for life.",
    description: "Reduce repetitive work and everyday chasing, so people have time to focus, switch off and enjoy life beyond work.",
    detail: "A smoother operation should mean a lighter day for the people running it. We build to reduce repetitive tasks, scattered information and the pressure of keeping everything in your head. The purpose is to give people time and headspace back, with more room for rest, relationships and life beyond work.",
  },
];
export const brands = [
  {
    id: "saveaday",
    logo: "/brand/products/saveaday-woven-color.svg",
    name: "Saveaday",
    searchLabel: "Customer & Booking Management",
    summary: "Saveaday is a Bigmints business platform for managing customer enquiries, bookings and follow-ups in one place.",
    category: "Business, connected",
    color: "peach",
    url: "https://www.saveaday.ai/",
    headline: "Less busywork. More business.",
    description:
      "Stay on top of customers, bookings and follow-ups, with less work scattered across separate tools.",
    detail:
      "Keep the customer relationship and the work around it together. Saveaday gives business owners one place to manage enquiries, appointments and follow-ups, so the next action is easier to find and act on.",
    features: [
      "Keep customer context close to the work",
      "Give customers a clear way to browse, book and enquire",
      "Get help with everyday tasks while keeping control",
    ],
  },
  {
    id: "youbot",
    logo: "/brand/products/youbot-woven-color.svg",
    name: "Youbot",
    searchLabel: "Self-hosted AI Concierge",
    summary: "Youbot is a self-hosted AI concierge by Bigmints that helps visitors find answers and connects them with you when needed.",
    category: "AI, on your terms",
    color: "mint",
    url: "https://youbot.live",
    headline: "Helpful answers. Less back-and-forth.",
    description:
      "Help visitors find answers and take the next step, while keeping the conversations that need you within reach.",
    detail:
      "Give visitors a useful first point of contact. Youbot answers from the information you provide and brings you into the conversation when your judgement is needed. You choose its boundaries and run it on your own computer or server; connected providers process the requests sent through them.",
    features: [
      "Make your information easier for visitors to find",
      "Keep conversations connected across supported channels",
      "Stay involved when a decision needs your attention",
    ],
  },
  {
    id: "fikr",
    logo: "/brand/products/fikr.svg",
    name: "Fikr",
    searchLabel: "Notes & Ideas Workspace",
    summary: "Fikr is a Bigmints workspace for capturing thoughts, connecting notes and developing ideas across Fikr Go, Studio and Cowork.",
    category: "A space for your thinking",
    color: "sand",
    url: "https://fikr.one",
    headline: "Catch a thought. Make something of it.",
    description:
      "Hold on to a passing thought, find the connections in your notes and pick up an idea with its context intact.",
    detail:
      "An idea should still make sense when you return to it. Fikr helps you capture what is on your mind, bring related notes together and explore what comes next. Go, Studio and Cowork give you different spaces to continue that thinking.",
    features: [
      "Catch ideas in the moment with Fikr Go",
      "See related thoughts together in Fikr Studio",
      "Keep your work and its context together in Fikr Cowork",
    ],
  },
];
export const expertise = [
  {
    id: "ai",
    outcome: "Make room for meaningful work",
    number: "01",
    name: "Artificial intelligence",
    short: "Less busywork. More room to focus.",
    description:
      "Make routine work easier to move through. Help people find answers, act on information and spend more attention on the decisions that need them.",
    tags: ["AI agents", "Applied AI", "Private AI systems"],
    detail:
      "The value of AI is in the work it helps someone finish. We focus on everyday outcomes: an enquiry answered, a follow-up brought into view, or an idea captured with its context. People stay involved in the decisions that matter.",
    points: [
      "Find useful answers in the context of the task",
      "Move routine tasks forward with appropriate oversight",
      "Choose how and where AI fits into your work",
    ],
    related: ["saveaday", "youbot", "fikr"],
  },
  {
    id: "iot",
    outcome: "Know what needs attention",
    number: "02",
    name: "Internet of Things",
    short: "Know what needs your attention.",
    description:
      "Make it easier to understand what is happening across a physical environment, so teams can spot what needs a closer look.",
    tags: ["Connected devices", "Telemetry", "Edge experiences"],
    detail:
      "We explore connected experiences that give teams a clearer view of their environment. The aim is to make useful information easier to find and connect it to the places, equipment and work it relates to.",
    points: [
      "Understand which equipment a signal comes from",
      "See relevant changes in a shared view",
      "Connect observations to the work that follows",
    ],
    related: [],
  },
  {
    id: "digital-twins",
    outcome: "See the whole picture",
    number: "03",
    name: "Digital twins",
    short: "See the whole picture.",
    description:
      "Understand a place and the equipment within it in context, so complex operational information is easier to interpret.",
    tags: ["Spatial interfaces", "Asset context", "Operational visibility"],
    detail:
      "A list of signals rarely tells the whole story. Our digital-twin explorations put equipment and observations in the context of a real place, helping teams investigate what they are seeing and understand what it relates to.",
    points: [
      "Find equipment in the context of its location",
      "Understand the relationships behind an observation",
      "Explore clearer ways to investigate and coordinate work",
    ],
    related: [],
  },
  {
    id: "product-engineering",
    outcome: "Bring your idea to life",
    number: "04",
    name: "Product design & engineering",
    short: "Give a good idea a life beyond the brief.",
    description:
      "Turn an idea into something people can try, respond to and use, with a clear path from intention to experience.",
    tags: ["Experience design", "Full-stack development", "Prototyping"],
    detail:
      "A useful product makes the next step clear. We develop our own ideas into products people can use, learn from their feedback and keep improving the experience. Each brand gives that work a distinct purpose and a group of people to build for.",
    points: [
      "Give people a clear way to complete their task",
      "Learn from a working experience people can try",
      "Bring the experience to the devices people use",
    ],
    related: ["saveaday", "youbot", "fikr"],
  },
];
export const caseStudies = [
  {
    id: "saveaday-connected-business",
    brandId: "saveaday",
    title: "Keep the customer in the picture.",
    description: "A Saveaday product case study: connecting enquiries, bookings and follow-ups so the next customer action has its context.",
    intro: "An enquiry is only the beginning. Saveaday brings the work that follows into the same business workspace, so a customer relationship can continue beyond a single conversation.",
    focus: "Customer continuity",
    stage: "Product development",
    journey: ["Enquiry", "Booking", "Follow-up"],
    outcome: "A clearer next step, with the customer context close by.",
    sections: [
      {
        title: "The work between the appointments",
        paragraphs: [
          "For a small business, serving a customer involves more than taking a booking. Someone asks about a service, shares their details, chooses a time and may need a follow-up afterwards. When those steps live in separate tools, the owner has to reconstruct the story each time.",
          "The new Saveaday starts with that continuity problem. Its business workspace brings customer management, service catalogues, bookings, lead forms and follow-ups together. The aim is to make it easier to understand what has happened and what needs attention next."
        ]
      },
      {
        title: "One relationship, from enquiry onwards",
        paragraphs: [
          "Consider a service business. A visitor can browse its catalogue, submit an enquiry or request a booking. The business can then work with customer information and the tasks around it in the same platform, instead of treating every step as a fresh exchange.",
          "Saveaday also includes business chat and managed assistance. Actions are bounded by the person's role and the business's permissions; visitor requests that need approval stay subject to that decision. Helpful assistance should move the work forward while leaving the business in control."
        ]
      },
      {
        title: "What this makes possible",
        paragraphs: [
          "The product direction is a working day with less information to piece together: a place to see customer context, handle the booking and keep a follow-up in view. Connected modules give the owner a way to carry the relationship across those steps.",
          "The new Saveaday is in development. This illustrative service-business journey shows the purpose of its connected workflows: helping an owner stay close to both the customer and the work that needs to happen next."
        ]
      }
    ]
  },
];

export const sitePages = {
  "/whatsapp/privacy/": {
    label: "WhatsApp privacy",
    title: "WhatsApp Connection Privacy | Bigmints FZE",
    description: "How Bigmints FZE handles account information, connection credentials and messaging data for authorized WhatsApp Business connections.",
    schemaType: "WebPage",
  },
  "/whatsapp/data-deletion/": {
    label: "WhatsApp data deletion",
    title: "WhatsApp Data Deletion Instructions | Bigmints FZE",
    description: "Disconnect a WhatsApp Business connection and request deletion of records held by Bigmints FZE, with account verification and clear deletion limits.",
    schemaType: "WebPage",
  },
  "/case-studies/": {
    label: "Case studies",
    title: "Product Case Studies | Bigmints",
    description: "Inside Saveaday: a Bigmints product case study on connecting customer enquiries, bookings and follow-ups in one business workspace.",
    schemaType: "CollectionPage",
  },
  "/products/": {
    label: "Products",
    title: "Our Products & Brands | Bigmints",
    description:
      "Explore Saveaday, Youbot and Fikr: Bigmints products for customer conversations, everyday operations, knowledge and ideas.",
    schemaType: "CollectionPage",
  },
  "/company/": {
    label: "Company",
    title: "About Bigmints FZE | A Technology Product Company",
    description:
      "Meet Bigmints FZE, the product company guided by service excellence, customer happiness and operational efficiency. Behind Saveaday, Youbot and Fikr.",
    schemaType: "AboutPage",
  },
  "/innovation/": {
    label: "Innovation",
    title: "Product Innovation — AI, IoT & Digital Twins | Bigmints",
    description:
      "How Bigmints explores AI, IoT and digital twins to support better service and clearer operations through its own products and research.",
    schemaType: "CollectionPage",
  },
  "/contact/": {
    label: "Contact",
    title: "Contact Bigmints FZE | Company & Partnerships",
    description:
      "Contact Bigmints FZE for company enquiries and partnerships, or find the website for each of our three product brands.",
    schemaType: "ContactPage",
  },
};
export const routes = [
  "/",
  ...Object.keys(sitePages),
  ...brands.map((b) => `/brands/${b.id}/`),
  ...expertise.map((e) => `/expertise/${e.id}/`),
  ...caseStudies.map((study) => `/case-studies/${study.id}/`),
];
export function getPage(path: string) {
  const brand = brands.find((b) => path === `/brands/${b.id}/`);
  const capability = expertise.find((e) => path === `/expertise/${e.id}/`);
  const study = caseStudies.find((item) => path === `/case-studies/${item.id}/`);
  const page = sitePages[path as keyof typeof sitePages];
  return {
    brand,
    capability,
    study,
    label: study?.title || brand?.name || capability?.name || page?.label || "Bigmints",
    parent: study
      ? { label: "Case studies", path: "/case-studies/" }
      : brand
      ? { label: "Products", path: "/products/" }
      : capability
        ? { label: "Innovation", path: "/innovation/" }
        : null,
    schemaType: page?.schemaType || "WebPage",
    title: study
      ? `${brands.find((b) => b.id === study.brandId)?.name}: ${study.title} | Bigmints`
      : brand
      ? `${brand.name} — ${brand.searchLabel} | Bigmints`
      : capability
        ? `${capability.name} | Bigmints FZE`
        : page?.title ||
          (path === "/" ? company.title : "Page not found | Bigmints"),
    description:
      study?.description ||
      brand?.summary ||
      capability?.description ||
      page?.description ||
      company.description,
  };
}
