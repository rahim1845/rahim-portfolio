export type CaseSection = { h: string; body: string[] };

export type Project = {
  slug: string;
  titlePre: string;
  titleItalic: string;
  titlePost: string;
  summary: string;
  tags: string[];
  status: "shipped" | "internal" | "side product";
  year: string;
  meta: { k: string; v: string }[];
  outcomeLine: string;
  mock: "tingting" | "assessment" | "themeforge";
  marginNote?: string;
  external?: { label: string; url: string };
  images?: { src: string; wide?: boolean }[];
  sections: CaseSection[];
  reflection: string;
};

const tt = "https://framerusercontent.com/images/";

export const projects: Project[] = [
  {
    slug: "tingting",
    titlePre: "TingTing: a quick-commerce ",
    titleItalic: "ecosystem",
    titlePost: " that survived 30 stores",
    summary:
      "Founding designer of a quick-commerce system for Royal-Mart, a 30-store supermarket chain in Bangalore. Customer app, store fulfilment panel, and admin operations, all designed to work from one shared system.",
    tags: ["quick commerce", "founding designer", "2022\u201325"],
    status: "shipped",
    year: "2022\u201325",
    meta: [
      { k: "role", v: "founding product designer \u00b7 sole designer" },
      { k: "team", v: "1 designer \u00b7 3 developers \u00b7 1 product manager" },
      { k: "timeline", v: "2.5 years \u00b7 6 months to launch, 2 years refining" },
      { k: "scope", v: "4 surfaces: customer, driver, store, admin" },
      { k: "status", v: "live on iOS & Android" },
      { k: "numbers", v: "40k+ orders \u00b7 12k+ downloads \u00b7 4.5\u2605 \u00b7 \u20b91cr+ transactions" },
    ],
    outcomeLine: "40k+ orders \u00b7 12k+ downloads \u00b7 4.5\u2605 app store \u00b7 \u20b91cr+ in transactions",
    mock: "tingting",
    marginNote: "6 months to launch. 2 years making it survive.",
    external: { label: "Visit the live app", url: "https://apps.apple.com/in/app/tingting-grocery-delivery/id6464051281" },
    images: [
      { src: tt + "8J0SwYskqxHmLoj3Vi3ir7vF3l8.png?width=780&height=1688" },
      { src: tt + "yZ31rgUTdHGWAEdAlW3r8iMM9RA.png?width=780&height=1688" },
      { src: tt + "fAsnKA5db9DOsZuvpvwwLU79dMo.png?width=780&height=1688" },
      { src: tt + "Qw5euNQiOhIdCaZQEtMYQPEFr8k.png?width=2400&height=1500", wide: true },
      { src: tt + "PySn8sz4dkMP9ZmoDPD9Sjm3lE.png?width=1920&height=1076", wide: true },
    ],
    sections: [
      {
        h: "The setup",
        body: [
          "On paper, the flow looked simple: customer places an order, store confirms it, picker packs it, rider delivers it. In reality, the system started breaking almost immediately.",
          "Inventory mismatches were constant. Products shown in the app were often unavailable in-store, forcing the system to handle substitutions, cancellations, and missing products dynamically across every interface. As order volume grew, stores slowed down, riders waited, and fulfilment queues stacked up. Customers only saw \u201clate delivery\u201d; internally the issue was operational coordination.",
          "Most of the work wasn\u2019t adding features. It was **reducing operational gaps** so the system could survive real usage. Quick commerce breaks when systems stop syncing.",
        ],
      },
      {
        h: "Building it small",
        body: [
          "We were three developers, one product manager, and me. One frontend developer, no QA team. Whatever I designed, that same team had to build, test, and ship. That shaped two decisions before a single screen existed.",
          "**Flutter**, because we needed customer apps on iOS and Android, store flows, and a desktop admin app, and with one frontend developer, three native apps was off the table. **Material Design**, because Flutter renders Material fastest and our developer was already fluent in it. Instead of designing freely and negotiating what could be built, I designed on top of Material from day one. Material\u2019s structure became the constraint; TingTing\u2019s brand sat on top of it.",
        ],
      },
      {
        h: "The design system",
        body: [
          "The system had to cover three apps and stay in sync with code, because nobody had time to translate between Figma and Flutter on every change. The goal wasn\u2019t aesthetics. It was **consistency and speed**.",
          "Tokens came first: colour, type, spacing, radius, shadows, all defined inside Material\u2019s architecture, all checked against WCAG contrast before anything reached the codebase. Components came next. Material covers buttons and sheets, but quick commerce needs product cards with quantity steppers, cart rows, order timelines, store cards, address pickers. Every custom component was built inside the same token system, so change one token and it carries through all three apps.",
          "The system was designed less like a brand guideline and more like **shared infrastructure between design and engineering**. If it drifted from implementation, the product slowed down immediately.",
        ],
      },
      {
        h: "The major roadblock: Dukan CMS",
        body: [
          "Dukan let the operations team manage homepage bundles, the grouped categories like kitchen staples and daily essentials, without engineering help. The customer side was easy; people already understand how a supermarket aisle works. The hard part was the operator side.",
          "The question I kept coming back to: **can someone with no design knowledge publish a new bundle in under a minute without breaking the homepage?** If not, this wouldn\u2019t work. Everything else came from that.",
          "The operator could only pick between two layout modes: three-column carousels with 4:3 cards, or four-column blocks with 1:1 cards. Anything else would break the grid, so it just wasn\u2019t an option. Bundles always render in multiples of three or four, so adding one item too many still lays out cleanly. The operator doesn\u2019t need to know why; **the rule just holds**. Render mode was separate from content, so the same bundle could switch between block and carousel without being rebuilt.",
          "The result: a homepage we could update in real time. Campaigns went live the day they were planned. We built the same pattern for pricing. Different surface, same idea: give just enough control, and let the system catch the rest.",
        ],
      },
      {
        h: "How we scaled: 0 \u2192 1 \u2192 30",
        body: [
          "We didn\u2019t launch to 30 stores. The app went live for users within 5km of a single Royal-Mart, and that was the whole audience for the first stretch. Get one store running cleanly before adding a second.",
          "That first store surfaced edge cases in the order flow, cart friction that never showed in testing, and patterns in what people actually bought versus what we assumed. Each new store inherited everything we\u2019d already fixed and added its own learnings, usually around inventory edge cases.",
          "Most of what\u2019s on the live app now isn\u2019t what we shipped at launch. It\u2019s **what survived two years of real users across thirty stores**.",
        ],
      },
      {
        h: "Smaller decisions that were really systems decisions",
        body: [
          "Every workflow had to stay synchronized across three interconnected systems, so even small UX calls were architecture calls.",
          "**Phone-first onboarding**: register with OTP, no email, no password. The phone number became the delivery contact, the notification hub, and the identifier the store and admin used to track the order. One ID across all three apps. **Guest mode**: browse without signing up, cart saved locally, carried over on login. A few days of state-management work in exchange for an unblocked first session. **One geofence**: the 5km radius the customer saw was the same one the admin saw and the same one store flows used for assignment. **Checkout**: the delivery promise front-loaded (\u201cdeliver in 18 min\u201d) so urgency felt earned, free-delivery threshold nudges, and one active coupon at a time, which prevented stacking abuse without building a discount engine.",
        ],
      },
    ],
    reflection:
      "Two things. I started the design system after the first version was in testing, which was the right timing, but then retrofitted too much early work to match it; some of those screens were fine and didn\u2019t need redoing for consistency\u2019s sake. And on measurement: our published fulfilment-time drop from 40 to 15 minutes is real, but much of that gain came from the human coordination chain, not the app alone. The cleaner metric would have been SLA breach rate per store. The numbers weren\u2019t wrong, but the story behind them was more shared than I credited at the time.",
  },
  {
    slug: "skill-assessment-platform",
    titlePre: "Replacing a hiring process held together by ",
    titleItalic: "spreadsheets",
    titlePost: "",
    summary:
      "Admin-side skill assessment platform for Kanini Academy\u2019s hiring and training workflows. Assessment creation, candidate tracking, and admin flows that replaced a fragmented manual process with one structured system.",
    tags: ["b2b platform", "admin ux", "2022"],
    status: "shipped",
    year: "2022",
    meta: [
      { k: "role", v: "product designer" },
      { k: "company", v: "Kanini" },
      { k: "timeline", v: "2022" },
      { k: "surface", v: "admin web platform" },
      { k: "status", v: "shipped \u00b7 used for hiring and training" },
    ],
    outcomeLine: "fragmented manual process \u2192 one structured system for assessments and tracking",
    mock: "assessment",
    external: { label: "Full case study on Contra", url: "https://contra.com/p/7QkBmFvm-employ-skill-assessment-portal-design-for-kanini" },
    sections: [
      {
        h: "The problem",
        body: [
          "Kanini Academy ran skill assessments for hiring and internal training through a patchwork of tools: question banks in documents, candidate lists in spreadsheets, results compiled by hand, status communicated over email. Every assessment cycle meant re-assembling the process from scratch, and nobody could answer \u201cwhere is this candidate right now\u201d without asking around.",
        ],
      },
      {
        h: "What I designed",
        body: [
          "Three connected admin workflows. **Assessment creation**: a builder for assembling tests from a structured question bank, with reusable templates so recurring assessments didn\u2019t start from zero. **Candidate tracking**: a single pipeline view of every candidate\u2019s stage, from invited through completed to evaluated, replacing the spreadsheet-and-email relay. **Admin flows**: scheduling, assignment, and result review designed for the people running the process daily, not occasionally.",
        ],
      },
      {
        h: "The design approach",
        body: [
          "Admin tools fail when they\u2019re designed as forms instead of workflows. I mapped the actual sequence the academy team followed in a hiring cycle and designed to that sequence, so the platform\u2019s structure matched the mental model of the work. Status had to be **glanceable**: every candidate, every assessment, one consistent state vocabulary across the platform.",
          "The constraint I held: the team running this wasn\u2019t technical, and training time was near zero. Anything that needed explaining was redesigned until it didn\u2019t.",
        ],
      },
      {
        h: "Outcome",
        body: [
          "The platform replaced the manual process for assessment creation and candidate tracking. Hiring and training cycles ran on one system with a shared source of truth for candidate status, instead of being re-improvised each round. The full walkthrough with screens lives on Contra, linked above.",
        ],
      },
    ],
    reflection:
      "This was early in my career and it taught me the lesson that later shaped TingTing\u2019s admin tooling and Dukan: the person operating the system is a user too, usually the most underserved one in the building. Internal tools are where I learned to design workflows instead of screens.",
  },
  {
    slug: "themeforge",
    titlePre: "ThemeForge: an AI that generates ",
    titleItalic: "design systems",
    titlePost: ", not pictures",
    summary:
      "A working AI tool that turns a text prompt or a single seed colour into a complete, production-ready design token set: colour ramps, typography, spacing, radii, animation. Built with the Claude API.",
    tags: ["ai product", "design tooling", "2026"],
    status: "side product",
    year: "2026",
    meta: [
      { k: "role", v: "designer + builder \u00b7 solo" },
      { k: "stack", v: "next.js 14 \u00b7 typescript \u00b7 claude api (sonnet + haiku)" },
      { k: "timeline", v: "2026 \u00b7 iterative builds" },
      { k: "status", v: "working product \u00b7 in active use for client theming" },
    ],
    outcomeLine: "prompt or seed hex \u2192 complete saas token set \u00b7 dual-model architecture",
    mock: "themeforge",
    marginNote: "i built this to understand ai as a design material. it worked.",
    sections: [
      {
        h: "Why I built it",
        body: [
          "Most AI design tools generate screens: impressive demos, unusable output, because a picture of an interface isn\u2019t a system. After building TingTing\u2019s token architecture by hand, I wanted to test a thesis: **the right unit for AI to generate is the token set**, the layer where a few hundred decisions cascade into every screen. Get the tokens right and the screens follow; get a screen right and you have one screen.",
        ],
      },
      {
        h: "How it works",
        body: [
          "Input is a text prompt (\u201ccalm fintech, trustworthy, slightly warm\u201d) or a single seed hex colour. Output is a complete SaaS token set: full colour ramps with semantic roles, a type scale, spacing, radii, shadows, and animation values, structured and ready to drop into a codebase or Tokens Studio.",
          "Under the hood it\u2019s a **dual-model architecture**: Claude Sonnet does the heavy generation against a strict schema, Claude Haiku handles the fast, cheap naming passes. Responses stream so the designer watches the system assemble instead of staring at a spinner. Every output is validated with Zod before it renders; if the model returns something malformed, the user never sees it.",
        ],
      },
      {
        h: "The design decisions that mattered",
        body: [
          "**Schema over freedom.** The model isn\u2019t asked to be creative about structure, only about values. The token schema is fixed; that\u2019s what makes the output dependable enough to use.",
          "**Streaming as a trust device.** Watching ramps fill in colour by colour does the same job the confidence chip does in a chat product: it makes the machine\u2019s work legible instead of magical. Generation feels collaborative rather than oracular.",
          "**Regenerate the part, not the whole.** A designer who likes the palette but not the type scale can regenerate just that slice. Treating AI output as editable material instead of a final answer turned out to be the single biggest usability difference.",
        ],
      },
      {
        h: "What it taught me about AI UX",
        body: [
          "Latency is a design surface. Failure is a design surface. The gap between \u201cthe model did something\u201d and \u201cthe user trusts what it did\u201d is where the actual design work lives, the same gap I now look for in every AI product. Building with the API directly, rather than reading about it, is why I can argue with engineers about token budgets and streaming behaviour in their own vocabulary.",
        ],
      },
    ],
    reflection:
      "I let scope creep into a full theme-history feature before nailing the regenerate-a-slice flow, which was the actual differentiator. The lesson is the same one from Dukan, just pointed at myself this time: decide the one question the tool must answer, and let everything else come from that.",
  },
];

export const smallerThings = [
  "figma plugin: design-system builder that scaffolds tokens, components, and variant sets from a prompt via the plugin api",
  "figma prototype auto-wiring exploration: interactions and variant transitions set programmatically with setReactionsAsync",
  "webcam gesture navigation prototype with mediapipe hands, exploring touchless case-study browsing",
  "design-system teardowns: extracting and rebuilding production systems as figma console scripts and tokens studio json",
];

export const articles = [
  {
    title: "Struggling to prioritize? How I balance what users want and what keeps the lights on",
    where: "Weekly Design Zaiqa \u00b7 LinkedIn newsletter",
    url: "https://www.linkedin.com/newsletters/weekly-design-zaiqa-7346642262941933568/",
  },
  {
    title: "Architecting clarity: a scalable design system for quick commerce",
    where: "Muzli / Medium",
    url: "https://medium.com/muzli-design-inspiration/architecting-clarity-a-scalable-design-system-for-quick-commerce-f145d0aa711d",
  },
  {
    title: "Beyond the \u2018app\u2019: your portal to an interconnected digital world",
    where: "Medium",
    url: "https://medium.com/@rahim1845/beyond-the-app-your-portal-to-an-interconnected-digital-world-29b907c56a2a",
  },
  {
    title: "What exactly is a persona, and why most designers misuse it",
    where: "LinkedIn",
    url: "https://www.linkedin.com/pulse/what-exactly-persona-why-most-designers-misuse-abdul-rahim-rangrez-3c7nf/",
  },
];
