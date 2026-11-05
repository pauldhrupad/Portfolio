import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "gharkabite",
    title: "GharKaBite",
    shortDescription:
      "A food ordering platform for customizable thalis, cart and checkout, order tracking, and kitchen administration with manual UPI verification.",
    longDescription:
      "A Next.js application connecting a customer storefront to a kitchen admin dashboard. Customers customize thalis, manage a cart, and track orders stored in MongoDB. Auth.js handles sign-in, while the server validates menu availability, delivery, pricing, and order transitions. Online orders require manual UPI payment verification by an admin. Subscription management supports plan offerings, meal credits, and pause, resume, and cancellation workflows. Plan purchases use a separate preview flow that collects no money.",
    category: "Full-Stack Food Ordering Platform",
    technologies: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Auth.js",
      "bcryptjs",
      "MongoDB",
      "Mongoose",
      "Cloudinary",
      "Geoapify",
      "Leaflet",
      "Vitest",
    ],
    homepageTechnologies: ["Next.js", "React", "Auth.js", "MongoDB", "Mongoose"],
    previewEyebrow: "Kitchen and storefront",
    previewTitle: "Food ordering overview",
    previewFeatures: ["Customizable thalis", "Cart and checkout", "Order tracking", "Kitchen dashboard"],
    featured: true,
    github: "https://github.com/pauldhrupad/GharKaBite",
    demo: "https://gharkabite.vercel.app",
    highlights: [
      "Configurable thalis with required choices and optional add-ons",
      "Admin menu management, daily availability, and preparation tools",
      "Cart, server-calculated checkout, and MongoDB order persistence",
      "Auth.js sign-in and server-side admin authorization",
      "Manual UPI proof review and admin confirmation or rejection",
      "Subscription management and meal credits, with preview-only plan purchases",
    ],
    status: "prototype",
    caseStudy: {
      kind: "commerce",
      seoDescription:
        "GharKaBite case study covering customizable thalis, Next.js architecture, MongoDB checkout, kitchen administration, manual UPI verification, and subscription management.",
      heroSummary:
        "A Next.js food ordering platform that connects a customizable thali storefront to kitchen operations, persistent order tracking, manual UPI payment review, and subscription management.",
      context:
        "GharKaBite is a local food-kitchen prototype with customer and admin interfaces in one Next.js application. Its workflows cover menu configuration, date-specific availability, ordering, payment review, and preparation.",
      problem:
        "A configurable meal order combines several changing inputs. Required choices, add-ons, delivery eligibility, kitchen cutoffs, and payment status all affect whether an order can be accepted. The kitchen also needs a consistent record of what was ordered and which actions are still pending.",
      productGoal:
        "Connect the storefront and kitchen dashboard through server-validated orders, preserve the selected meal configuration, and make payment review and fulfilment states explicit.",
      technologyGroups: [
        { label: "Application", technologies: ["Next.js App Router", "React", "JavaScript"] },
        { label: "Interface", technologies: ["Tailwind CSS", "Lucide", "Leaflet"] },
        { label: "Persistence", technologies: ["MongoDB Atlas", "Mongoose"] },
        { label: "Authentication", technologies: ["Auth.js", "bcryptjs"] },
        { label: "External services", technologies: ["Cloudinary", "Geoapify"] },
        { label: "Testing", technologies: ["Vitest", "MongoDB Memory Server"] },
      ],
      featureGroups: [
        {
          title: "Configurable thalis",
          description: "Required choices, selection limits, price adjustments, and optional add-ons produce distinct meal configurations.",
        },
        {
          title: "Menu management",
          description: "Admins configure meals, daily availability, preparation quantities, ordering cutoffs, and kitchen on/off controls.",
        },
        {
          title: "Cart and checkout",
          description: "The cart groups compatible variants by delivery date and meal period. Checkout rechecks availability, customization, prices, and delivery on the server.",
        },
        {
          title: "Persistent orders",
          description: "MongoDB stores order snapshots, totals, payment status, and status history for customer tracking and kitchen operations.",
        },
        {
          title: "Kitchen dashboard",
          description: "Admin pages support order review, preparation planning, menu changes, and subscription management.",
        },
        {
          title: "Manual UPI review",
          description: "Customers submit payment details for admin review. Confirmation or rejection changes the order's payment workflow.",
        },
        {
          title: "Subscriptions",
          description: "Meal-credit tracking and admin pause, resume, and cancellation are implemented. Plan purchases run through a separate preview that collects no money.",
        },
        {
          title: "Delivery checks",
          description: "Geoapify-backed address verification and optional map pins support delivery eligibility checks at order placement.",
        },
      ],
      architecture: {
        client: "Next.js Storefront & Admin",
        api: "Next.js Route Handlers",
        database: "MongoDB Atlas",
        externalServices: ["Cloudinary", "Geoapify"],
      },
      authentication: [
        "Auth.js uses a credentials provider for email or phone and password sign-in.",
        "bcryptjs verifies stored password hashes, and Auth.js manages JWT-based sessions.",
        "Admin routes check the authenticated user's role on the server.",
        "Customer order queries are scoped to the signed-in user. Payment-proof retrieval checks the order owner or admin role.",
      ],
      orderWorkflows: [
        {
          title: "Customer checkout",
          steps: ["Customize thali", "Cart and delivery", "Server validation", "Order snapshot"],
        },
        {
          title: "Online payment order",
          steps: ["Payment pending", "Submit UPI proof", "Admin review", "Confirmed or rejected"],
        },
        {
          title: "Cash on Delivery",
          steps: ["Validated checkout", "Confirmed order", "Delivery", "Payment recorded"],
        },
      ],
      paymentVerification: [
        "Online orders begin in a payment-pending state with the server-calculated total and configured UPI details.",
        "Customers can submit a screenshot with a transaction reference, or report proof through the configured WhatsApp channel.",
        "An admin checks the payment against the bank or UPI statement before confirming it. A screenshot or reference alone does not establish receipt of money.",
        "Confirmation marks payment as paid and confirms the order. Rejection records a reason and allows the customer to resubmit proof.",
        "Payment review is manual. Automatic gateway processing and payment webhooks are outside the implemented flow.",
      ],
      subscriptions: [
        "Admins manage plan offerings and can pause, resume, or cancel an active subscription.",
        "Resuming a paused subscription extends its expiry by the paused duration.",
        "An eligible plan credit covers one thali base price and delivery. Paid choices and add-ons remain payable.",
        "Checkout records meal-credit use with the order, and cancellation can return a previously consumed credit.",
        "Plan purchases remain a separate preview flow that collects no money.",
      ],
      testingPhilosophy:
        "The repository includes tests for pricing rules, delivery eligibility, checkout persistence, authorization, payment-state changes, and subscription-credit use. Unit tests isolate business rules, while checkout tests use an in-memory MongoDB replica set.",
      testingPractices: [
        "Vitest checks required thali choices, selection limits, add-on pricing, and cart variant identity.",
        "Delivery tests cover missing provider configuration, ambiguous addresses, map pins, and radius boundaries.",
        "Checkout tests exercise idempotency, order snapshots, subscription credits, and server-side validation.",
        "Payment tests cover pending orders, admin confirmation and rejection, duplicate references, and protected proof access.",
      ],
      deployment: [
        { layer: "Next.js application", platform: "Vercel" },
        { layer: "Database", platform: "MongoDB Atlas" },
        { layer: "Upload storage", platform: "Cloudinary" },
      ],
      lessons: [
        "Recalculate final prices and validate current menu configuration at the server boundary.",
        "Store meal and price snapshots so later catalogue edits preserve the meaning of past orders.",
        "Use checkout keys and request hashes to distinguish retries from changed submissions.",
        "Commit order creation and subscription-credit changes in a MongoDB transaction.",
        "Keep order fulfilment separate from payment review so an unpaid online order cannot enter preparation.",
        "Retrieve private payment proofs through authenticated order endpoints.",
      ],
    },
  },
  {
    slug: "co-parenting-coordinator",
    title: "Co-Parenting Coordinator",
    shortDescription:
      "A shared workspace for separated parents to coordinate custody schedules, shared expenses, communication, approvals and disputes, and auditable family activity.",
    longDescription:
      "A family-scoped MERN workspace with JWT authentication and server-side membership checks. Parents coordinate custody events and swap requests, review shared expenses through proposed, approved, disputed, and settled states, and communicate through append-only messages. MongoDB transactions connect business changes to timestamped audit records. Email notifications and PDF/CSV exports support follow-up and portable review of family activity. Audit guarantees are enforced at the application layer.",
    category: "Full-Stack MERN Application",
    technologies: [
      "React",
      "Vite",
      "React Router",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcryptjs",
      "Cloudinary",
      "Nodemailer",
      "PDFKit",
      "Vitest",
      "Supertest",
      "Vercel",
      "Render",
    ],
    homepageTechnologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"],
    previewEyebrow: "Family workspace",
    previewFeatures: [
      "Custody schedule",
      "Shared expenses",
      "Family messages",
      "Activity history",
    ],
    previewTitle: "Coordination overview",
    featured: false,
    github: "https://github.com/pauldhrupad/co-parenting-coordinator",
    demo: "https://co-parenting-coordinator.vercel.app",
    highlights: [
      "Parent authentication and family onboarding",
      "Custody scheduling with conflict detection and swap workflows",
      "Shared expense management with receipt uploads, approvals, and disputes",
      "Family messages and auditable activity history",
      "Email notifications, PDF export, and CSV export",
      "Automated testing",
    ],
    status: "completed",
    caseStudy: {
      kind: "coordination",
      seoDescription:
        "A detailed case study of Co-Parenting Coordinator, a MERN application for custody scheduling, shared expenses, family communication, audit history, notifications, and exports.",
      heroSummary:
        "A family-scoped MERN application that brings custody scheduling, shared expenses, communication, approvals, disputes, notifications, and exportable activity records into one coordinated workspace.",
      context:
        "Co-parenting creates recurring coordination work across time, money, and communication. This project explores how a family-scoped web application can keep those operational workflows connected without presenting itself as a replacement for legal advice or formal agreements.",
      problem:
        "Separated parents may rely on different calendars, chat threads, spreadsheets, and receipt photos. When each source contains only part of the picture, agreed schedules, expense decisions, pending actions, and the history behind a change become difficult to track consistently.",
      productGoal:
        "Bring scheduling, expenses, communication, approvals, and exportable records into one authenticated application, with permissions and family membership enforced by the server.",
      technologyGroups: [
        {
          label: "Frontend",
          technologies: ["React", "Vite", "React Router", "react-big-calendar"],
        },
        {
          label: "Backend",
          technologies: ["Node.js", "Express"],
        },
        {
          label: "Database",
          technologies: ["MongoDB Atlas", "Mongoose"],
        },
        {
          label: "Authentication",
          technologies: ["JWT", "bcryptjs"],
        },
        {
          label: "Services",
          technologies: ["Cloudinary", "Nodemailer"],
        },
        {
          label: "Documents",
          technologies: ["PDFKit", "CSV export"],
        },
        {
          label: "Testing",
          technologies: ["Vitest", "Supertest", "MongoDB Memory Server"],
        },
        {
          label: "Hosting",
          technologies: ["Vercel", "Render"],
        },
      ],
      featureGroups: [
        {
          title: "Authentication",
          description: "Account access with hashed passwords and JWT-protected API requests.",
        },
        {
          title: "Family onboarding",
          description: "Family-scoped membership establishes the shared context for each workflow.",
        },
        {
          title: "Custody scheduling",
          description: "Create schedule events, check conflicts, and manage parent swap requests.",
        },
        {
          title: "Expenses",
          description: "Record shared costs, upload receipts, and manage approvals or disputes.",
        },
        {
          title: "Communication",
          description: "Keep family messages alongside the schedules and expenses they support.",
        },
        {
          title: "Audit history",
          description: "Capture server-timestamped activity records for important workflow changes.",
        },
        {
          title: "Notifications",
          description: "Send email updates for events that require another parent’s attention.",
        },
        {
          title: "Exports",
          description: "Produce PDF and CSV outputs for portable review of application records.",
        },
        {
          title: "Testing",
          description: "Exercise API behavior, authorization rules, and database-backed workflows.",
        },
      ],
      architecture: {
        client: "React Client",
        api: "Express REST API",
        database: "MongoDB Atlas",
        externalServices: ["Cloudinary", "SMTP / Nodemailer"],
      },
      authentication: [
        "bcryptjs hashes passwords before they are stored.",
        "JWTs authorize requests to protected API routes.",
        "Protected routes reject requests without valid authentication.",
        "Family membership checks scope reads and writes to the authenticated family context.",
      ],
      custodyWorkflows: [
        {
          title: "Schedule event",
          steps: ["Create event", "Conflict check", "Confirmed event"],
        },
        {
          title: "Swap request",
          steps: [
            "Submit swap request",
            "Other parent review",
            "Accept or reject",
            "Audited action",
          ],
        },
      ],
      expenseWorkflows: [
        {
          title: "Approval path",
          steps: ["Proposed", "Approved", "Settled"],
        },
        {
          title: "Dispute path",
          steps: ["Proposed", "Disputed", "Resolution"],
        },
      ],
      communicationAudit: [
        "Append-only family messages preserve the application conversation sequence.",
        "Auditable activity records capture important actions and their surrounding workflow context.",
        "Server timestamps provide a consistent time source for recorded activity.",
        "Before-and-after snapshots document relevant changes to business records.",
        "Transaction-backed business and audit writes keep related updates aligned.",
      ],
      testingPhilosophy:
        "Testing focuses on observable behavior across API boundaries: authentication, authorization, validation, state transitions, persistence, and the multi-step workflows most likely to fail when exercised together.",
      testingPractices: [
        "Vitest for focused application and business-rule tests",
        "Supertest for HTTP routes, validation, and authorization behavior",
        "MongoDB Memory Server for isolated database-backed test runs",
        "Workflow tests for multi-step schedule, swap, expense, and audit operations",
      ],
      deployment: [
        { layer: "Frontend", platform: "Vercel" },
        { layer: "Backend", platform: "Render" },
        { layer: "Database", platform: "MongoDB Atlas" },
      ],
      lessons: [
        "Enforce authorization on the server, even when the interface already limits available actions.",
        "Isolate business rules so scheduling and expense decisions are not coupled to presentation code.",
        "Validate state transitions instead of allowing arbitrary status updates.",
        "Test multi-step workflows as complete operations, including their failure paths.",
        "Separate interface concerns from domain rules to keep both easier to change.",
        "Treat production configuration, service boundaries, and deployment environments as part of the system.",
      ],
    },
  },
  {
    slug: "4d-chess",
    title: "4D Chess: Chess on a Cube",
    shortDescription:
      "A chess variant on the 384-square surface of a 3D cube, with cross-face movement, local two-player and four-player modes, and optional heuristic CPU opponents.",
    longDescription:
      "A browser-based game built with React, TypeScript, and Three.js. Six 8-by-8 faces form a 384-square cube-surface board. A custom engine folds movement across edges and enforces team and king-safety rules. Players can orbit and zoom the board, inspect legal destinations, and follow move history. Local two-player matches and four-player team games support optional CPU seats driven by a lightweight move-scoring heuristic. Game state lives in the browser and resets on refresh.",
    category: "Interactive 3D Strategy Game",
    technologies: ["React", "TypeScript", "Three.js", "Vite", "Tailwind CSS"],
    homepageTechnologies: ["React", "TypeScript", "Three.js", "Vite"],
    previewEyebrow: "Cube-surface chess",
    previewTitle: "Six faces, 384 squares",
    previewFeatures: ["Cross-face movement", "Two-player matches", "Four-player teams", "Optional CPU seats"],
    featured: false,
    github: "https://github.com/pauldhrupad/3d-Cube-Chess-Game",
    highlights: [
      "384 squares across six 8-by-8 cube faces",
      "Custom movement rules that fold across cube edges",
      "Local two-player and four-player team modes",
      "Interactive Three.js board with orbit, zoom, and move animation",
      "Legal-move guidance, check indicators, and move history",
      "Optional CPU seats using a move-scoring heuristic",
    ],
    status: "prototype",
  },
];
