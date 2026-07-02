export type Media =
  | { type: "image"; src: string; wide?: boolean; caption?: string; alt?: string }
  | { type: "video"; src: string; wide?: boolean; caption?: string; poster?: string }
  | { type: "placeholder"; label: string; hint?: string; wide?: boolean }
  | { type: "widget"; name: string; wide?: boolean };

export type CaseSection = { h: string; body: string[]; media?: Media[] };

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
  mock: "tingting" | "assessment" | "themeforge" | "glassbox";
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
        media: [{ type: "widget", name: "system-map", wide: true }],
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
        media: [
          { type: "widget", name: "bp-tokens" },
          { type: "widget", name: "bp-components" },
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
        media: [
          { type: "widget", name: "dukan-rule", wide: true },
        ],
      },
      {
        h: "How we scaled: 0 \u2192 1 \u2192 30",
        body: [
          "We didn\u2019t launch to 30 stores. The app went live for users within 5km of a single Royal-Mart, and that was the whole audience for the first stretch. Get one store running cleanly before adding a second.",
          "That first store surfaced edge cases in the order flow, cart friction that never showed in testing, and patterns in what people actually bought versus what we assumed. Each new store inherited everything we\u2019d already fixed and added its own learnings, usually around inventory edge cases.",
          "Most of what\u2019s on the live app now isn\u2019t what we shipped at launch. It\u2019s **what survived two years of real users across thirty stores**.",
        ],
        media: [
          { type: "widget", name: "scaling-map", wide: true },
        ],
      },
      {
        h: "Smaller decisions that were really systems decisions",
        body: [
          "Every workflow had to stay synchronized across three interconnected systems, so even small UX calls were architecture calls.",
          "**Phone-first onboarding**: register with OTP, no email, no password. The phone number became the delivery contact, the notification hub, and the identifier the store and admin used to track the order. One ID across all three apps. **Guest mode**: browse without signing up, cart saved locally, carried over on login. A few days of state-management work in exchange for an unblocked first session. **One geofence**: the 5km radius the customer saw was the same one the admin saw and the same one store flows used for assignment. **Checkout**: the delivery promise front-loaded (\u201cdeliver in 18 min\u201d) so urgency felt earned, free-delivery threshold nudges, and one active coupon at a time, which prevented stacking abuse without building a discount engine.",
        ],
        media: [
          { type: "widget", name: "bp-flow" },
          { type: "placeholder", label: "checkout", hint: "the 'deliver in 18 min' promise front-loaded" },
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
        media: [
          { type: "placeholder", label: "assessment builder", hint: "export from the contra case study" },
          { type: "widget", name: "bp-pipeline" },
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
        media: [
          { type: "placeholder", label: "generation recording", hint: "15\u201330s screen capture: prompt typed \u2192 ramps streaming in", wide: true },
          { type: "widget", name: "bp-tokens" },
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
  {
    slug: "glassbox",
    titlePre: "Glassbox: an AI agent builder you can actually ",
    titleItalic: "debug",
    titlePost: "",
    summary:
      "A working AI agent builder where the run trace, not the canvas, is the home screen. When an agent does the wrong thing, Glassbox localises the failure to a layer — prompt, tool, context, or model — and lets you re-run just that step. It turns prompt-roulette into targeted fixes. Built solo with the Claude API.",
    tags: ["ai product", "agent tooling", "2026"],
    status: "side product",
    year: "2026",
    meta: [
      { k: "role", v: "designer + builder · solo" },
      { k: "stack", v: "next.js 14 · typescript · claude api (tool use)" },
      { k: "timeline", v: "2026 · nights and weekends" },
      { k: "status", v: "working prototype · in active use on my own agents" },
      { k: "the one question", v: "can the builder fix the right thing on the first try?" },
    ],
    outcomeLine: "prompt-roulette → localise + scoped replay · ~10 blind re-runs down to 2–3 targeted edits",
    mock: "glassbox",
    marginNote: "the canvas was the easy part. trust was the product.",
    sections: [
      {
        h: "Why I built it",
        body: [
          "Every agent platform now ships the same thing: a canvas where you drag steps and tools into a flow. Assembling an agent has become a solved problem. Running one you can **trust** has not.",
          "I kept building small agents for my own work — a research agent, a support-triage agent — and kept hitting the same wall. It would behave in testing, then do something wrong in the wild, and I couldn’t tell **why**. So I’d tweak the prompt, re-run the whole thing, and hope. I built Glassbox to kill that loop.",
        ],
      },
      {
        h: "The problem: prompt roulette",
        body: [
          "When an agent misbehaves, the cause is almost never obvious. Did the **prompt** steer it wrong? Did a **tool** return garbage? Was the **context** missing a key fact? Or did the **model** just fumble? Most tools answer this with a wall of raw JSON, or nothing at all.",
          "So builders do what I did: change one thing, re-run the entire agent (slow, and often non-deterministic), and guess again. I call it **prompt roulette**. It’s why agents get abandoned — not at the build step, but at the make-it-reliable step. Across agent-builder communities it’s the single most common complaint: “works in the demo, fails in prod, can’t tell why.”",
          "Try the loop yourself — this is a real run that failed, the way Glassbox shows it:",
        ],
        media: [{ type: "widget", name: "glassbox-demo", wide: true }],
      },
      {
        h: "The insight",
        body: [
          "The build canvas is commoditised — everyone has one, and it isn’t where people get stuck. They get stuck in the loop between a **failure and a fix**.",
          "So the unit to design isn’t the canvas; it’s the **run trace and the fix loop**. Make every run legible and diffable, attribute each failure to a layer, and scope the fix to the failing step. It’s the same bet I made with ThemeForge: design the layer where a few decisions cascade, not the surface sitting on top of it.",
        ],
      },
      {
        h: "What I designed",
        body: [
          "**The run trace is the home screen.** A timeline of every step — what the agent saw, what it decided and why, the exact tool call and arguments, and what came back. Each step expands; the failing step is flagged.",
          "**Failure attribution.** Every failure is tagged by its most likely layer — prompt, tool, context, or model — with the evidence for the guess, so you fix the right thing instead of reaching for the prompt by reflex.",
          "**Scoped replay.** Fix at the failing step and re-run **just that step** against the captured input, instead of re-running the whole agent. Targeted iteration, not roulette.",
          "**Cases are first-class.** Any real run can be saved as a test case, so you build an eval set by *using* the agent — reliability you can measure, not vibes. And streaming is the trust device throughout: you watch the agent think and act in real time instead of staring at a spinner.",
        ],
        media: [
          { type: "widget", name: "bp-flow" },
          { type: "placeholder", label: "cases / eval set", hint: "saved runs becoming a regression set" },
        ],
      },
      {
        h: "The hard part: blaming the right layer",
        body: [
          "Attribution is what makes Glassbox more than a log viewer, and it’s the hardest thing to get right. A wrong tool result and a missing piece of context can look identical three steps downstream.",
          "I started with hard rules and they mis-blamed constantly. What worked better: attribute with a **confidence**, **show the evidence** behind the guess, and — critically — let the builder **correct it in one click**. A wrong guess you can fix in a second is useful; a *confident* wrong guess is worse than no guess at all. That correction is also the signal that makes attribution better over time.",
        ],
      },
      {
        h: "What it taught me about AI UX",
        body: [
          "I over-built the canvas first — two weekends on drag-drop niceties before admitting nobody abandons at the canvas. The trace was the product the whole time.",
          "The broader lesson is one I keep relearning: **latency is a design surface, failure is a design surface**, and trust lives in the gap between “the model did something” and “I understand what it did.” Glassbox is just that gap, turned into a screen.",
        ],
      },
    ],
    reflection:
      "Two honest things. The attribution is still heuristic — right often enough to save real time, but I shipped it before building the correction-learning loop that would make it compound, which is backwards from how I’d tell anyone else to sequence it. And I haven’t put it in front of enough other builders yet: everything I claim about the loop is from my own use across a handful of agents. The next real step isn’t more features — it’s five builders, their own agents, and watching where they still get stuck.",
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

export type PlayItem = {
  title: string;
  tools: string[];
  format: string;
  desc: string;
  long: string;
  slug?: string;
  href?: string;
  thumb?: string;
  demo?: string;
  sections?: { h: string; body: string[] }[];
};

export const playlist: PlayItem[] = [
  {
    title: "ThemeForge — ramp generator",
    tools: ["Claude API", "Next.js", "Zod"],
    format: "a weekend",
    desc: "Prompt or a seed hex → a full, usable colour ramp with semantic roles. The seed that grew into the whole tool.",
    long: "Type a vibe — “calm fintech, trustworthy, slightly warm” — or drop a single seed hex, and it generates a complete token set: colour ramps with semantic roles, a type scale, spacing and radii. Every output is validated against a strict Zod schema so it’s always usable, and it streams so you watch the system assemble instead of staring at a spinner. This weekend build grew into the full case study.",
    href: "/work/themeforge",
  },
  {
    title: "Glassbox — scoped replay",
    tools: ["Claude API", "tool use", "Next.js"],
    format: "in progress",
    desc: "Re-run one failed step of an agent instead of the whole thing. Killing prompt-roulette.",
    long: "An agent builder where the run trace, not the canvas, is the home screen. When a run fails, Glassbox localises the failure to a layer — prompt, tool, context, or model — and lets you replay just that step instead of re-running the whole agent. The scoped-replay loop is live and clickable inside the case study.",
    href: "/work/glassbox",
  },
  {
    title: "Figma design-system builder",
    slug: "figma-ds-builder",
    tools: ["Figma Plugin API", "Claude"],
    format: "3 nights",
    desc: "A plugin that scaffolds tokens, components and variant sets from a single prompt.",
    long: "A Figma plugin that reads a prompt and scaffolds a starter design system directly on the canvas — tokens, base components, and variant sets — through the Plugin API, with Claude handling the naming and structure passes. From empty file to a coherent kit in one step.",
    demo: "dsbuilder",
    sections: [
      {
        h: "Why I built it",
        body: [
          "Starting a design system from an empty Figma file is the same hour of busywork every time: set up the colour styles, name them, build a button with its states, a card, an input, wire the variants. I wanted to skip to the part that’s actually design.",
        ],
      },
      {
        h: "The problem",
        body: [
          "The first hour of every system is **mechanical, not creative** — and doing it by hand means every system starts a little differently, with slightly different names and structure. The drudgery is also where the drift creeps in.",
        ],
      },
      {
        h: "How it works",
        body: [
          "Type a brief. The plugin generates a **token set** — colour ramps with roles, radius, a type scale — then scaffolds the **base components** from those tokens, on the canvas, via the Plugin API. Claude handles naming and structure; a fixed schema keeps it consistent. You start from a coherent kit instead of a blank file. Try the brief picker above.",
        ],
      },
    ],
  },
  {
    title: "Prototype auto-wiring",
    slug: "figma-auto-wiring",
    tools: ["Figma Plugin API"],
    format: "1 day",
    desc: "Interactions and variant transitions set programmatically with setReactionsAsync.",
    long: "An exploration of wiring Figma prototypes from data instead of by hand: setting interactions and variant transitions programmatically with setReactionsAsync, so an entire flow can be connected — and re-connected — from a description rather than dragging noodles between frames.",
    demo: "autowire",
    sections: [
      {
        h: "Why I built it",
        body: [
          "Prototyping a flow in Figma means dragging connection noodles between frames, one interaction at a time. Past a few screens it’s tedious and brittle — change a frame and you re-wire by hand.",
        ],
      },
      {
        h: "The problem",
        body: [
          "Prototype interactions live as **manual gestures, not data**. There’s no way to say “connect this flow” — you connect it click by click, and it falls apart the moment the structure changes.",
        ],
      },
      {
        h: "How it works",
        body: [
          "Describe the flow as data — which frame goes where, on which trigger — and set every reaction programmatically with **setReactionsAsync**. The whole prototype wires itself, and re-wires when the data changes. Hit auto-wire above to watch it connect.",
        ],
      },
    ],
  },
  {
    title: "Touchless case-study nav",
    slug: "touchless-nav",
    tools: ["MediaPipe Hands", "JS"],
    format: "a weekend",
    desc: "Webcam gesture tracking — pinch to advance. Browsing a portfolio without touching it.",
    long: "A webcam prototype built on MediaPipe Hands: pinch to advance, open palm to go back. The question was whether a case study could be browsed hands-free — it turned out useful, slightly magical, and occasionally chaotic when the lighting was bad.",
    demo: "touchless",
    sections: [
      {
        h: "Why I built it",
        body: [
          "A what-if: could you browse a case study without touching anything — across a room, hands busy, mid-demo? I wanted to feel whether gesture nav was genuinely useful or just a party trick.",
        ],
      },
      {
        h: "The problem",
        body: [
          "Gesture interfaces usually fail on two fronts: **latency** (the gesture lags the intent) and **ambiguity** (the system can’t tell a pinch from a fist). Either one kills the feeling of control.",
        ],
      },
      {
        h: "How it works",
        body: [
          "MediaPipe Hands tracks the hand in the webcam; a pinch (thumb-to-index) advances, an open palm goes back. The real work was **debouncing** — a movement threshold and a cooldown so one pinch counts once. The control above simulates the gesture; the real build reads your camera.",
        ],
      },
    ],
  },
  {
    title: "Design-system teardowns",
    slug: "ds-teardowns",
    tools: ["Figma console", "Tokens Studio"],
    format: "ongoing",
    desc: "Extracting and rebuilding production design systems as console scripts and tokens JSON.",
    long: "A habit and a small toolkit for reverse-engineering design systems I admire into portable, structured data — so I can understand how they were actually built, not just look at them.",
    demo: "teardown",
    sections: [
      {
        h: "Why I built it",
        body: [
          "Every few weeks I find a design system I want to understand — in a live product, a Figma community file, a competitor’s app. Screenshotting it teaches me nothing. I want the **system**, not the picture: the token structure, the naming, where it’s consistent and where it quietly isn’t.",
          "So instead of admiring systems from the outside, I started tearing them down — pulling them apart into something I can read, rebuild, and learn from.",
        ],
      },
      {
        h: "The problem",
        body: [
          "A design system inside a Figma file or a live site is **locked in its medium**. You can see the colours and components, but not the structure underneath — which greys are actually the same, what’s a primitive versus a semantic role, how the type scale steps, where two near-identical values should have been one token.",
          "To learn from a system (or migrate it), you need it as **portable, structured data** — not a flattened artifact you can only look at.",
        ],
      },
      {
        h: "How it works",
        body: [
          "**Extract, don’t recreate.** A Figma console script walks the document’s styles and components and pulls every raw value — fills, text styles, effects, spacing — into a flat list.",
          "**Normalise into a token model.** Map the raw values onto a structured schema: primitives (raw colours, sizes) and semantics (roles like *surface*, *accent*). This is where the real structure shows up — and where the inconsistencies surface.",
          "**Export as Tokens Studio JSON.** Output a clean, portable set that drops straight into Tokens Studio or a codebase, so the torn-down system can be rebuilt, compared, or migrated. The teardown isn’t the deliverable — the understanding is.",
        ],
      },
    ],
  },
  {
    title: "Token-stream perception study",
    slug: "token-stream",
    tools: ["JS"],
    format: "an evening",
    desc: "Why streamed text feels alive — recreated and slowed down to see the trick.",
    long: "A tiny study recreating why streamed LLM text feels alive: the same words, revealed token-by-token at the right cadence, read as “thinking” instead of “loading.” Slowed right down so you can see exactly where the perception of intelligence comes from.",
    demo: "tokenstream",
    sections: [
      {
        h: "Why I built it",
        body: [
          "Streamed model responses feel alive in a way the same text dumped at once doesn’t. I wanted to know exactly **why** — and whether it’s the content or purely the timing.",
        ],
      },
      {
        h: "What it showed",
        body: [
          "It’s the timing. The same sentence, revealed at roughly reading cadence, reads as **a mind working**; shown instantly, it reads as a wall to skim. Latency, used deliberately, becomes a trust signal instead of a cost.",
        ],
      },
      {
        h: "How it works",
        body: [
          "The same passage rendered two ways — streamed at ~105ms/word with a caret, or instant. Toggle them above and the difference in *felt* intelligence is obvious, with nothing changed but the cadence. It’s the principle ThemeForge and Glassbox both lean on.",
        ],
      },
    ],
  },
  {
    title: "Honest skeletons",
    slug: "honest-skeletons",
    tools: ["CSS"],
    format: "an evening",
    desc: "Loading states shaped like the answer, not like a lie.",
    long: "Loading skeletons shaped like the actual answer — same layout, same rhythm — so the wait sets a true expectation instead of a generic shimmer that misrepresents what’s coming. A small argument that loading states are a design surface, not an afterthought.",
    demo: "skeletons",
    sections: [
      {
        h: "Why I built it",
        body: [
          "Most loading skeletons are a generic shimmer that has nothing to do with what’s coming. I wanted to argue — in code — that a loading state is a **design decision**, not a default.",
        ],
      },
      {
        h: "The problem",
        body: [
          "A generic skeleton sets a **false expectation**. When the real content lands it doesn’t match, the layout lurches, and the wait turns out to have been a small lie about what was loading.",
        ],
      },
      {
        h: "How it works",
        body: [
          "An honest skeleton mirrors the actual answer — same layout, same rhythm, same number of lines — so when content resolves, **nothing moves**. Toggle honest vs generic above and reload: the honest one settles in place; the generic one jumps.",
        ],
      },
    ],
  },
];
