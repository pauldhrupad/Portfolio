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
