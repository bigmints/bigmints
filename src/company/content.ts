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
    "Bigmints FZE is the company behind Saveaday, Youbot and Fikr. We build software for customer enquiries, bookings, follow-ups and notes.",
  contact: "mailto:me@bigmints.com?subject=Bigmints%20company%20enquiry",
};
export const pillars = [
  {
    id: "service-excellence",
    name: "Service excellence",
    title: "Help customers get answers.",
    description: "Customers should be able to find the information they need and speak to a person when they need more help.",
    detail: "People ask about prices, availability or how a service works. We want our software to help them get an answer and make it easy for a person to take over when it cannot help.",
  },
  {
    id: "customer-happiness",
    name: "Customer happiness",
    title: "Keep customers informed.",
    description: "People should know what happens after they ask a question or make a booking, without having to repeat themselves or chase an update.",
    detail: "Getting an answer is one part of being a customer. People also need to know what happens next. We want our products to help businesses keep track of what was discussed, what was agreed and what still needs a reply.",
  },
  {
    id: "operational-efficiency",
    name: "Operational efficiency",
    title: "Give people time back.",
    description: "Less time copying information, chasing messages or remembering follow-ups. More time for the work people want to do, and for life outside it.",
    detail: "We want repeated tasks to take less of a person's day. The time saved should be time they can use: to do work they enjoy, rest or be with people they care about. That is what operational efficiency means to us.",
  },
];
export const brands = [
  {
    id: "saveaday",
    logo: "/brand/products/saveaday-woven-color.svg",
    name: "Saveaday",
    searchLabel: "Customer & Booking Management",
    summary: "Saveaday is a Bigmints business platform for managing customer enquiries, bookings and follow-ups in one place.",
    category: "Enquiries, bookings and follow-ups",
    color: "peach",
    url: "https://www.saveaday.ai/",
    headline: "Manage enquiries and bookings.",
    description:
      "Keep customer details, appointments and follow-ups in one place.",
    detail:
      "Saveaday brings customer information, enquiries, appointments and follow-ups into the same application. Business owners can see what a customer asked for and what needs to happen next.",
    features: [
      "Keep customer details alongside their enquiries and bookings",
      "Let customers browse services, ask questions and request a booking",
      "Review requests that need your approval",
    ],
  },
  {
    id: "youbot",
    logo: "/brand/products/youbot-woven-color.svg",
    name: "Youbot",
    searchLabel: "Self-hosted AI Concierge",
    summary: "Youbot is a Bigmints AI assistant that answers visitors' questions. You run it on your own computer or server.",
    category: "AI concierge",
    color: "mint",
    url: "https://youbot.live",
    headline: "Answer visitors' questions.",
    description:
      "An AI concierge that answers from information you provide and lets you join the conversation when needed.",
    detail:
      "Youbot answers visitors using information you provide. You decide what it can do and which requests need your approval. It runs on your own computer or server. If you connect an external AI provider, that provider processes the requests sent to it.",
    features: [
      "Answer questions using information you supply",
      "Receive conversations through supported messaging channels",
      "Review requests and reply yourself when needed",
    ],
  },
  {
    id: "fikr",
    logo: "/brand/products/fikr.svg",
    name: "Fikr",
    searchLabel: "Notes & Ideas",
    summary: "Fikr is a Bigmints product for recording ideas and organising notes. It includes Fikr Go, Studio and Cowork.",
    category: "Notes and ideas",
    color: "sand",
    url: "https://fikr.one",
    headline: "Keep your notes and ideas together.",
    description:
      "Write down ideas, organise related notes and return to them later.",
    detail:
      "Fikr is for recording ideas and working with the notes around them. It includes Go, Studio and Cowork for capturing thoughts, connecting related notes and developing ideas.",
    features: [
      "Record an idea with Fikr Go",
      "Organise related notes in Fikr Studio",
      "Work on ideas and their supporting notes in Fikr Cowork",
    ],
  },
];
export const expertise = [
  {
    id: "ai",
    outcome: "Answer questions and help with routine tasks",
    number: "01",
    name: "Artificial intelligence",
    short: "Artificial intelligence in our products.",
    description:
      "We use AI to answer questions from supplied information and help with routine tasks. People can review requests that need their approval.",
    tags: ["AI agents", "Applied AI", "Private AI systems"],
    detail:
      "Our AI work includes answering customer questions, helping with follow-ups and organising notes. We define what an assistant can do and which requests need a person's approval. The model and information supplied to it affect the answers it gives.",
    points: [
      "Answer questions using the information a business provides",
      "Help with repeated tasks and flag requests that need approval",
      "Support different AI providers and local models where the product allows",
    ],
    related: ["saveaday", "youbot", "fikr"],
  },
  {
    id: "iot",
    outcome: "See information from connected equipment",
    number: "02",
    name: "Internet of Things",
    short: "Connected devices and their data.",
    description:
      "We research ways to collect information from connected equipment and show which device or location it belongs to.",
    tags: ["Connected devices", "Equipment data", "Sensors"],
    detail:
      "Our IoT work includes prototypes for viewing data from connected devices. We are testing how to identify the equipment behind a reading and show changes that someone may need to check.",
    points: [
      "Identify the device behind a reading",
      "Show changes in equipment data",
      "Link a reading to its equipment and location",
    ],
    related: [],
  },
  {
    id: "digital-twins",
    outcome: "View equipment in its location",
    number: "03",
    name: "Digital twins",
    short: "Digital models of physical places.",
    description:
      "We research digital models that show where equipment is and the information associated with it.",
    tags: ["Digital models", "Equipment locations", "3D views"],
    detail:
      "Our digital-twin work includes prototypes that place equipment and its readings inside a model of a physical space. We are testing whether this makes it easier to find the right equipment and understand what a reading refers to.",
    points: [
      "Find equipment within a model of its location",
      "Show the readings associated with that equipment",
      "Test ways to investigate a reading using the model",
    ],
    related: [],
  },
  {
    id: "product-engineering",
    outcome: "Build and improve our software",
    number: "04",
    name: "Product design & engineering",
    short: "Product design and development.",
    description:
      "We design and develop our own products, test how they work and make changes based on what we learn.",
    tags: ["Experience design", "Full-stack development", "Prototyping"],
    detail:
      "We work on the design and software behind our own products. That includes deciding how a task should work, building it, testing it and improving it as we learn how people use it.",
    points: [
      "Design how people complete a task",
      "Build and test the software",
      "Use feedback to decide what to improve",
    ],
    related: ["saveaday", "youbot", "fikr"],
  },
];
export const caseStudies = [
  {
    id: "saveaday-connected-business",
    brandId: "saveaday",
    title: "From enquiry to follow-up.",
    description: "A walkthrough of how the new Saveaday is designed to keep customer enquiries, bookings and follow-ups in one application.",
    intro: "This example follows a customer asking about a service, requesting a booking and receiving a follow-up. It explains how the new Saveaday is designed to keep those details together.",
    focus: "Enquiries and bookings",
    stage: "Product development",
    journey: ["Enquiry", "Booking", "Follow-up"],
    outcome: "Keep the enquiry, booking and follow-up alongside the customer's details.",
    sections: [
      {
        title: "The task",
        paragraphs: [
          "A customer asks about a service, shares their details and chooses a time. The business may need to contact them afterwards. If those details are kept in different tools, someone has to find and check them each time.",
          "The new Saveaday brings customer details, service lists, bookings, enquiry forms and follow-ups into the same application. The aim is to let the business see what the customer asked for and what is still waiting to be done."
        ]
      },
      {
        title: "How it is designed to work",
        paragraphs: [
          "A visitor browses the business's services, submits an enquiry or requests a booking. The business can then see the customer's information and manage the related tasks in the same application.",
          "The product also includes chat and an assistant. What someone can do depends on their permissions, and requests that need a person's approval still require it."
        ]
      },
      {
        title: "What this example shows",
        paragraphs: [
          "The intention is to reduce the time spent finding details and checking what happened. An owner should be able to see the enquiry, manage the booking and remember the follow-up from the same application.",
          "This walkthrough describes the new Saveaday, which is in development. It explains the intended workflow; it does not report results from a customer deployment."
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
    description: "A Saveaday product walkthrough showing how enquiries, bookings and follow-ups are designed to work in one application, with its development stage stated.",
    schemaType: "CollectionPage",
  },
  "/products/": {
    label: "Products",
    title: "Our Products & Brands | Bigmints",
    description:
      "See what Saveaday, Youbot and Fikr do: manage enquiries and bookings, answer visitors' questions, and organise notes and ideas.",
    schemaType: "CollectionPage",
  },
  "/company/": {
    label: "Company",
    title: "About Bigmints FZE | A Technology Product Company",
    description:
      "About Bigmints FZE, the company behind Saveaday, Youbot and Fikr. Why we build software and what we want it to help people do.",
    schemaType: "AboutPage",
  },
  "/innovation/": {
    label: "Innovation",
    title: "Product Innovation — AI, IoT & Digital Twins | Bigmints",
    description:
      "Read about AI in Bigmints products and our prototype and research work on connected devices and digital twins.",
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
