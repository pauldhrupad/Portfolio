import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "gharkabite",
    title: "GharKaBite",
    shortDescription: "A food ordering platform for customizable thalis, cart and checkout, order tracking, and kitchen administration with manual UPI verification.",
    longDescription: "A Next.js application connecting a customer storefront to a kitchen admin dashboard. Customers customize thalis, manage a cart, and track orders stored in MongoDB. Auth.js handles sign-in, while the server validates menu availability, delivery, pricing, and order transitions. Online orders require manual UPI payment verification by an admin. Subscription management supports plan offerings, meal credits, and pause, resume, and cancellation workflows. Plan purchases use a separate preview flow that collects no money.",
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
      "Vitest"
    ],
    homepageTechnologies: [
      "Next.js",
      "React",
      "Auth.js",
      "MongoDB",
      "Mongoose"
    ],
    previewEyebrow: "Kitchen and storefront",
    previewTitle: "Food ordering overview",
    previewFeatures: [
      "Customizable thalis",
      "Cart and checkout",
      "Order tracking",
      "Kitchen dashboard"
    ],
    featured: true,
    github: "https://github.com/pauldhrupad/GharKaBite",
    demo: "https://gharkabite.vercel.app",
    highlights: [
      "Configurable thalis with required choices and optional add-ons",
      "Admin menu management, daily availability, and preparation tools",
      "Cart, server-calculated checkout, and MongoDB order persistence",
      "Auth.js sign-in and server-side admin authorization",
      "Manual UPI proof review and admin confirmation or rejection",
      "Subscription management and meal credits, with preview-only plan purchases"
    ],
    status: "prototype",
    caseStudy: {
      seoDescription: "GharKaBite case study covering customizable thalis, Next.js architecture, MongoDB checkout, kitchen administration, manual UPI verification, and subscription management.",
      heroSummary: "A Next.js food ordering platform that connects a customizable thali storefront to kitchen operations, persistent order tracking, manual UPI payment review, and subscription management.",
      technologyGroups: [
        {
          label: "Application",
          technologies: [
            "Next.js App Router",
            "React",
            "JavaScript"
          ]
        },
        {
          label: "Interface",
          technologies: [
            "Tailwind CSS",
            "Lucide",
            "Leaflet"
          ]
        },
        {
          label: "Persistence",
          technologies: [
            "MongoDB Atlas",
            "Mongoose"
          ]
        },
        {
          label: "Authentication",
          technologies: [
            "Auth.js",
            "bcryptjs"
          ]
        },
        {
          label: "External services",
          technologies: [
            "Cloudinary",
            "Geoapify"
          ]
        },
        {
          label: "Testing",
          technologies: [
            "Vitest",
            "MongoDB Memory Server"
          ]
        }
      ],
      sections: [
        {
          id: "overview",
          title: "Product overview",
          type: "text",
          paragraphs: [
            "GharKaBite is a local food-kitchen prototype with customer and admin interfaces in one Next.js application. Its workflows cover menu configuration, date-specific availability, ordering, payment review, and preparation.",
            "A configurable meal order combines several changing inputs. Required choices, add-ons, delivery eligibility, kitchen cutoffs, and payment status all affect whether an order can be accepted. The kitchen also needs a consistent record of what was ordered and which actions are still pending."
          ]
        },
        {
          id: "goals",
          title: "Goals",
          type: "list",
          items: [
            "Connect the storefront and kitchen dashboard through server-validated orders, preserve the selected meal configuration, and make payment review and fulfilment states explicit."
          ]
        },
        {
          id: "contribution",
          title: "Role & implementation scope",
          type: "text",
          paragraphs: [
            "Full-stack implementation across the customer storefront, kitchen dashboard, authentication, checkout, order persistence, and payment-review routes. The engineering focus is connecting customer actions to server-validated kitchen workflows."
          ]
        },
        {
          id: "journey",
          title: "Customer journey",
          type: "workflows",
          items: [
            {
              title: "Ordering a meal",
              steps: [
                "Browse daily menu",
                "Customize thali",
                "Cart and delivery",
                "Validated checkout"
              ]
            }
          ]
        },
        {
          id: "features",
          title: "Menu, customization & admin",
          type: "features",
          items: [
            {
              title: "Configurable thalis",
              description: "Required choices, selection limits, price adjustments, and optional add-ons produce distinct meal configurations."
            },
            {
              title: "Menu management",
              description: "Admins configure meals, daily availability, preparation quantities, ordering cutoffs, and kitchen on/off controls."
            },
            {
              title: "Cart and checkout",
              description: "The cart groups compatible variants by delivery date and meal period. Checkout rechecks availability, customization, prices, and delivery on the server."
            },
            {
              title: "Persistent orders",
              description: "MongoDB stores order snapshots, totals, payment status, and status history for customer tracking and kitchen operations."
            },
            {
              title: "Kitchen dashboard",
              description: "Admin pages support order review, preparation planning, menu changes, and subscription management."
            },
            {
              title: "Manual UPI review",
              description: "Customers submit payment details for admin review. Confirmation or rejection changes the order's payment workflow."
            },
            {
              title: "Subscriptions",
              description: "Meal-credit tracking and admin pause, resume, and cancellation are implemented. Plan purchases run through a separate preview that collects no money."
            },
            {
              title: "Delivery checks",
              description: "Geoapify-backed address verification and optional map pins support delivery eligibility checks at order placement."
            }
          ]
        },
        {
          id: "architecture",
          title: "Architecture",
          type: "architecture",
          diagram: {
            caption: "The Next.js storefront and admin pages use Route Handlers backed by MongoDB Atlas. Cloudinary stores uploads, and Geoapify supports address verification.",
            layers: [
              {
                label: "Interface",
                value: "Next.js Storefront & Admin"
              },
              {
                label: "Application",
                value: "Next.js Route Handlers"
              },
              {
                label: "Persistence",
                value: "MongoDB Atlas"
              }
            ],
            externalServices: [
              "Cloudinary",
              "Geoapify"
            ]
          }
        },
        {
          id: "authentication",
          title: "Authentication & data",
          type: "list",
          items: [
            "Auth.js uses a credentials provider for email or phone and password sign-in.",
            "bcryptjs verifies stored password hashes, and Auth.js manages JWT-based sessions.",
            "Admin routes check the authenticated user's role on the server.",
            "Customer order queries are scoped to the signed-in user. Payment-proof retrieval checks the order owner or admin role.",
            "Mongoose models persist meals, daily menus, orders, subscription plans, and subscription use. Order snapshots retain the chosen meal configuration and calculated totals."
          ]
        },
        {
          id: "orders",
          title: "Order & payment flows",
          type: "workflows",
          items: [
            {
              title: "Customer checkout",
              steps: [
                "Customize thali",
                "Cart and delivery",
                "Server validation",
                "Order snapshot"
              ]
            },
            {
              title: "Online payment order",
              steps: [
                "Payment pending",
                "Submit UPI proof",
                "Admin review",
                "Confirmed or rejected"
              ]
            },
            {
              title: "Cash on Delivery",
              steps: [
                "Validated checkout",
                "Confirmed order",
                "Delivery",
                "Payment recorded"
              ]
            }
          ]
        },
        {
          id: "payments",
          title: "Manual UPI verification",
          type: "list",
          items: [
            "Online orders begin in a payment-pending state with the server-calculated total and configured UPI details.",
            "Customers can submit a screenshot with a transaction reference, or report proof through the configured WhatsApp channel.",
            "An admin checks the payment against the bank or UPI statement before confirming it. A screenshot or reference alone does not establish receipt of money.",
            "Confirmation marks payment as paid and confirms the order. Rejection records a reason and allows the customer to resubmit proof.",
            "Payment review is manual. Automatic gateway processing and payment webhooks are outside the implemented flow."
          ]
        },
        {
          id: "subscriptions",
          title: "Subscription management",
          type: "list",
          items: [
            "Admins manage plan offerings and can pause, resume, or cancel an active subscription.",
            "Resuming a paused subscription extends its expiry by the paused duration.",
            "An eligible plan credit covers one thali base price and delivery. Paid choices and add-ons remain payable.",
            "Checkout records meal-credit use with the order, and cancellation can return a previously consumed credit.",
            "Plan purchases remain a separate preview flow that collects no money."
          ]
        },
        {
          id: "safeguards",
          title: "Challenges & operational safeguards",
          type: "features",
          items: [
            {
              title: "Repeated checkout submissions",
              description: "A checkout key and request hash distinguish an identical retry from a changed request. Order creation and plan-credit consumption share a MongoDB transaction."
            },
            {
              title: "Changing menu and prices",
              description: "The server rechecks daily availability, required choices, ordering cutoffs, delivery eligibility, and prices. Snapshots preserve what an accepted order contained."
            },
            {
              title: "Payment and kitchen handoff",
              description: "An online order remains payment-pending until admin verification. The order service blocks unpaid online orders from entering preparation."
            },
            {
              title: "Private payment proof",
              description: "Proof retrieval checks the signed-in order owner or admin role. Payment screenshots are served through an authenticated order endpoint."
            }
          ]
        },
        {
          id: "testing",
          title: "Testing",
          type: "list",
          intro: "The repository includes tests for pricing rules, delivery eligibility, checkout persistence, authorization, payment-state changes, and subscription-credit use. Unit tests isolate business rules, while checkout tests use an in-memory MongoDB replica set.",
          items: [
            "Vitest checks required thali choices, selection limits, add-on pricing, and cart variant identity.",
            "Delivery tests cover missing provider configuration, ambiguous addresses, map pins, and radius boundaries.",
            "Checkout tests exercise idempotency, order snapshots, subscription credits, and server-side validation.",
            "Payment tests cover pending orders, admin confirmation and rejection, duplicate references, and protected proof access."
          ]
        },
        {
          id: "deployment",
          title: "Deployment",
          type: "deployment",
          items: [
            {
              layer: "Next.js application",
              platform: "Vercel"
            },
            {
              layer: "Database",
              platform: "MongoDB Atlas"
            },
            {
              layer: "Upload storage",
              platform: "Cloudinary"
            }
          ]
        },
        {
          id: "limitations",
          title: "Current limitations",
          type: "list",
          items: [
            "Online UPI payments require manual verification against the bank or UPI statement.",
            "Meal-plan purchases use a no-money preview, while subscription management and meal-credit use are implemented.",
            "Address checks depend on configured Geoapify access and kitchen delivery coordinates. Order placement fails closed when verification is unavailable.",
            "Upload-dependent payment-proof and QR workflows require Cloudinary configuration.",
            "The README identifies the application as a prototype and calls for controlled payment and operational checks before commercial use."
          ]
        },
        {
          id: "lessons",
          title: "Engineering lessons",
          type: "list",
          items: [
            "Recalculate final prices and validate current menu configuration at the server boundary.",
            "Store meal and price snapshots so later catalogue edits preserve the meaning of past orders.",
            "Use checkout keys and request hashes to distinguish retries from changed submissions.",
            "Commit order creation and subscription-credit changes in a MongoDB transaction.",
            "Keep order fulfilment separate from payment review so an unpaid online order cannot enter preparation.",
            "Retrieve private payment proofs through authenticated order endpoints."
          ]
        }
      ]
    },
    media: {
      src: "/projects/gharkabite.webp",
      width: 1440,
      height: 900,
      alt: "GharKaBite public storefront showing its homemade meal introduction and delivery checker.",
      caption: "Public storefront · gharkabite.vercel.app"
    }
  },
  {
    slug: "co-parenting-coordinator",
    title: "Co-Parenting Coordinator",
    shortDescription: "A shared workspace for separated parents to coordinate custody schedules, shared expenses, communication, approvals and disputes, and auditable family activity.",
    longDescription: "A family-scoped MERN workspace with JWT authentication and server-side membership checks. Parents coordinate custody events and swap requests, review shared expenses through proposed, approved, disputed, and settled states, and communicate through append-only messages. MongoDB transactions connect business changes to timestamped audit records. Email notifications and PDF/CSV exports support follow-up and portable review of family activity. Audit guarantees are enforced at the application layer.",
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
      "Render"
    ],
    homepageTechnologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Cloudinary"
    ],
    previewEyebrow: "Family workspace",
    previewFeatures: [
      "Custody schedule",
      "Shared expenses",
      "Family messages",
      "Activity history"
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
      "Automated testing"
    ],
    status: "completed",
    caseStudy: {
      seoDescription: "A detailed case study of Co-Parenting Coordinator, a MERN application for custody scheduling, shared expenses, family communication, audit history, notifications, and exports.",
      heroSummary: "A family-scoped MERN application that brings custody scheduling, shared expenses, communication, approvals, disputes, notifications, and exportable activity records into one coordinated workspace.",
      technologyGroups: [
        {
          label: "Frontend",
          technologies: [
            "React",
            "Vite",
            "React Router",
            "react-big-calendar"
          ]
        },
        {
          label: "Backend",
          technologies: [
            "Node.js",
            "Express"
          ]
        },
        {
          label: "Database",
          technologies: [
            "MongoDB Atlas",
            "Mongoose"
          ]
        },
        {
          label: "Authentication",
          technologies: [
            "JWT",
            "bcryptjs"
          ]
        },
        {
          label: "Services",
          technologies: [
            "Cloudinary",
            "Nodemailer"
          ]
        },
        {
          label: "Documents",
          technologies: [
            "PDFKit",
            "CSV export"
          ]
        },
        {
          label: "Testing",
          technologies: [
            "Vitest",
            "Supertest",
            "MongoDB Memory Server"
          ]
        },
        {
          label: "Hosting",
          technologies: [
            "Vercel",
            "Render"
          ]
        }
      ],
      sections: [
        {
          id: "problem",
          title: "Problem & scope",
          type: "text",
          paragraphs: [
            "Co-parenting creates recurring coordination work across time, money, and communication. This project explores how a family-scoped web application can keep those operational workflows connected without presenting itself as a replacement for legal advice or formal agreements.",
            "Separated parents may rely on different calendars, chat threads, spreadsheets, and receipt photos. When each source contains only part of the picture, agreed schedules, expense decisions, pending actions, and the history behind a change become difficult to track consistently."
          ]
        },
        {
          id: "goals",
          title: "Goals",
          type: "list",
          items: [
            "Bring scheduling, expenses, communication, approvals, and exportable records into one authenticated application, with permissions and family membership enforced by the server."
          ]
        },
        {
          id: "contribution",
          title: "Role & implementation scope",
          type: "text",
          paragraphs: [
            "Full-stack implementation across the React client, Express routes, workflow services, and Mongoose models. The technical scope includes family membership, custody and expense decisions, transactional audit writes, notifications, and exports."
          ]
        },
        {
          id: "features",
          title: "Feature breakdown",
          type: "features",
          items: [
            {
              title: "Authentication",
              description: "Account access with hashed passwords and JWT-protected API requests."
            },
            {
              title: "Family onboarding",
              description: "Family-scoped membership establishes the shared context for each workflow."
            },
            {
              title: "Custody scheduling",
              description: "Create schedule events, check conflicts, and manage parent swap requests."
            },
            {
              title: "Expenses",
              description: "Record shared costs, upload receipts, and manage approvals or disputes."
            },
            {
              title: "Communication",
              description: "Keep family messages alongside the schedules and expenses they support."
            },
            {
              title: "Audit history",
              description: "Capture server-timestamped activity records for important workflow changes."
            },
            {
              title: "Notifications",
              description: "Send email updates for events that require another parent’s attention."
            },
            {
              title: "Exports",
              description: "Produce PDF and CSV outputs for portable review of application records."
            },
            {
              title: "Testing",
              description: "Exercise API behavior, authorization rules, and database-backed workflows."
            }
          ]
        },
        {
          id: "architecture",
          title: "Architecture",
          type: "architecture",
          diagram: {
            caption: "The React client calls an Express REST API using JWT authorization. MongoDB Atlas stores family data and workflow history, with Cloudinary uploads and SMTP email as external services.",
            layers: [
              {
                label: "Interface",
                value: "React Client"
              },
              {
                label: "Application",
                value: "Express REST API"
              },
              {
                label: "Persistence",
                value: "MongoDB Atlas"
              }
            ],
            externalServices: [
              "Cloudinary",
              "SMTP / Nodemailer"
            ]
          }
        },
        {
          id: "authentication",
          title: "Authentication & authorization",
          type: "list",
          items: [
            "bcryptjs hashes passwords before they are stored.",
            "JWTs authorize requests to protected API routes.",
            "Protected routes reject requests without valid authentication.",
            "Family membership checks scope reads and writes to the authenticated family context.",
            "JWTs are held in per-tab sessionStorage by the client. The API verifies authentication and family membership for protected resources."
          ]
        },
        {
          id: "custody",
          title: "Custody scheduling & conflicts",
          type: "workflows",
          items: [
            {
              title: "Schedule event",
              steps: [
                "Create event",
                "Conflict check",
                "Confirmed event"
              ]
            },
            {
              title: "Swap request",
              steps: [
                "Submit swap request",
                "Other parent review",
                "Accept or reject",
                "Audited action"
              ]
            }
          ]
        },
        {
          id: "family-scope",
          title: "Family-scoped workflows",
          type: "list",
          items: [
            "Invitation-based onboarding links two parents to one family context, with children recorded inside that family.",
            "Custody overlap checks use family and child identifiers and compare confirmed events with half-open time intervals.",
            "Swap responses and expense decisions check the acting parent and allowed state transition on the server."
          ]
        },
        {
          id: "expenses",
          title: "Expense lifecycle",
          type: "workflows",
          items: [
            {
              title: "Approval path",
              steps: [
                "Proposed",
                "Approved",
                "Settled"
              ]
            },
            {
              title: "Dispute path",
              steps: [
                "Proposed",
                "Disputed",
                "Resolution"
              ]
            }
          ]
        },
        {
          id: "records",
          title: "Messages & audit records",
          type: "list",
          items: [
            "Append-only family messages preserve the application conversation sequence.",
            "Auditable activity records capture important actions and their surrounding workflow context.",
            "Server timestamps provide a consistent time source for recorded activity.",
            "Before-and-after snapshots document relevant changes to business records.",
            "Transaction-backed business and audit writes keep related updates aligned."
          ]
        },
        {
          id: "decisions",
          title: "Technical decisions & solutions",
          type: "features",
          items: [
            {
              title: "Business changes and history",
              description: "An audited Express route wrapper captures the previous state, runs the controller, inserts the semantic audit record, and sends success only after the transaction commits."
            },
            {
              title: "Workflow consistency",
              description: "Custody overlap and expense transitions live in focused services. They enforce child/family scoping, valid state changes, and required dispute or resolution notes."
            },
            {
              title: "Follow-up work after commit",
              description: "Notification jobs run after committed business changes. PDF and CSV exports use family authorization and date filters to produce portable history."
            }
          ]
        },
        {
          id: "testing",
          title: "Testing",
          type: "list",
          intro: "Testing focuses on observable behavior across API boundaries: authentication, authorization, validation, state transitions, persistence, and the multi-step workflows most likely to fail when exercised together.",
          items: [
            "Vitest for focused application and business-rule tests",
            "Supertest for HTTP routes, validation, and authorization behavior",
            "MongoDB Memory Server for isolated database-backed test runs",
            "Workflow tests for multi-step schedule, swap, expense, and audit operations"
          ]
        },
        {
          id: "deployment",
          title: "Deployment",
          type: "deployment",
          items: [
            {
              layer: "Frontend",
              platform: "Vercel"
            },
            {
              layer: "Backend",
              platform: "Render"
            },
            {
              layer: "Database",
              platform: "MongoDB Atlas"
            }
          ]
        },
        {
          id: "boundaries",
          title: "Security boundaries & limitations",
          type: "list",
          items: [
            "Append-only behavior is enforced by the Express API and Mongoose models. A database administrator with direct write access can still modify stored records.",
            "The application does not implement cryptographic signing or independent timestamp certification for its records.",
            "JWT storage uses per-tab sessionStorage. Uploads and email require configured Cloudinary and SMTP services.",
            "The documented free Render backend can sleep after inactivity, delaying the first request.",
            "Co-Parenting Coordinator is an educational project with application-level records and workflow guarantees."
          ]
        },
        {
          id: "lessons",
          title: "Engineering lessons",
          type: "list",
          items: [
            "Enforce authorization on the server, even when the interface already limits available actions.",
            "Isolate business rules so scheduling and expense decisions are not coupled to presentation code.",
            "Validate state transitions instead of allowing arbitrary status updates.",
            "Test multi-step workflows as complete operations, including their failure paths.",
            "Separate interface concerns from domain rules to keep both easier to change.",
            "Treat production configuration, service boundaries, and deployment environments as part of the system."
          ]
        }
      ]
    },
    media: {
      src: "/projects/co-parenting-coordinator.webp",
      width: 1440,
      height: 900,
      alt: "Co-Parenting Coordinator public sign-in page with empty email and password fields.",
      caption: "Public sign-in screen · no family records"
    }
  },
  {
    slug: "4d-chess",
    title: "4D Chess: Chess on a Cube",
    shortDescription: "A chess variant on the 384-square surface of a 3D cube, with cross-face movement, local two-player and four-player modes, and optional heuristic CPU opponents.",
    longDescription: "A browser-based game built with React, TypeScript, and Three.js. Six 8-by-8 faces form a 384-square cube-surface board. A custom engine folds movement across edges and enforces team and king-safety rules. Players can orbit and zoom the board, inspect legal destinations, and follow move history. Local two-player matches and four-player team games support optional CPU seats driven by a lightweight move-scoring heuristic. Game state lives in the browser and resets on refresh.",
    category: "Interactive 3D Strategy Game",
    technologies: [
      "React",
      "TypeScript",
      "Three.js",
      "Vite",
      "Tailwind CSS"
    ],
    homepageTechnologies: [
      "React",
      "TypeScript",
      "Three.js",
      "Vite"
    ],
    previewEyebrow: "Cube-surface chess",
    previewTitle: "Six faces, 384 squares",
    previewFeatures: [
      "Cross-face movement",
      "Two-player matches",
      "Four-player teams",
      "Optional CPU seats"
    ],
    featured: false,
    github: "https://github.com/pauldhrupad/3d-Cube-Chess-Game",
    highlights: [
      "384 squares across six 8-by-8 cube faces",
      "Custom movement rules that fold across cube edges",
      "Local two-player and four-player team modes",
      "Interactive Three.js board with orbit, zoom, and move animation",
      "Legal-move guidance, check indicators, and move history",
      "Optional CPU seats using a move-scoring heuristic"
    ],
    status: "prototype",
    media: {
      src: "/projects/4d-chess.webp",
      width: 1440,
      height: 900,
      alt: "4D Chess local game showing the cube board and four-player team controls.",
      caption: "Local repository build · initial four-player board"
    },
    caseStudy: {
      seoDescription: "4D Chess case study covering a 384-square cube-surface board, cross-face move generation, local team play, heuristic CPU opponents, and Three.js rendering.",
      heroSummary: "A browser-based chess variant on six connected cube faces. A custom rules engine handles folded movement and team safety while Three.js turns the game state into an interactive board.",
      technologyGroups: [
        {
          label: "Interface",
          technologies: [
            "React",
            "TypeScript"
          ]
        },
        {
          label: "Game logic",
          technologies: [
            "Custom TypeScript engine"
          ]
        },
        {
          label: "Rendering",
          technologies: [
            "Three.js",
            "OrbitControls"
          ]
        },
        {
          label: "Styling",
          technologies: [
            "Tailwind CSS"
          ]
        },
        {
          label: "Build",
          technologies: [
            "Vite",
            "vite-plugin-singlefile"
          ]
        }
      ],
      sections: [
        {
          id: "concept",
          title: "Game concept & problem",
          type: "text",
          paragraphs: [
            "4D Chess: Chess on a Cube is played on the surface of a three-dimensional cube. Six 8-by-8 faces create 384 squares, and a move can continue across a fold into another face.",
            "The central engineering problem is keeping movement, legal destinations, team rules, and the rendered board consistent when a piece crosses a face boundary."
          ]
        },
        {
          id: "goals",
          title: "Goals",
          type: "list",
          items: [
            "Make the folded board playable through familiar piece patterns, clear legal-move guidance, and interactive camera controls.",
            "Support local two-player games, four-player teams, and optional CPU seats within one rules engine."
          ]
        },
        {
          id: "contribution",
          title: "Role & implementation scope",
          type: "text",
          paragraphs: [
            "Frontend, game-engine, and rendering implementation. The repository separates React controls and turn flow in src/App.tsx, board geometry and rules in src/game/engine.ts, and the Three.js scene in src/scene.ts."
          ]
        },
        {
          id: "architecture",
          title: "Game architecture",
          type: "architecture",
          diagram: {
            caption: "React manages controls and turn flow. The TypeScript Game engine supplies legal moves and board state, and the Three.js scene handles picking and visual updates.",
            layers: [
              {
                label: "Interface",
                value: "React controls & turn flow"
              },
              {
                label: "Rules",
                value: "TypeScript Game engine"
              },
              {
                label: "Presentation",
                value: "Three.js scene & picking"
              }
            ],
            externalServices: []
          }
        },
        {
          id: "board",
          title: "Six faces & cross-face movement",
          type: "features",
          items: [
            {
              title: "A face-local coordinate system",
              description: "Each square has a face, row, and column. Face normals and tangent vectors map those local coordinates to a point on the cube."
            },
            {
              title: "Folding across an edge",
              description: "The advance function steps along local axes. When a step leaves a face, it projects the position onto the neighboring face and derives its local square."
            },
            {
              title: "Move paths",
              description: "The engine supplies square sequences for sliding-piece animation. Face-square notation identifies moves in the history."
            }
          ]
        },
        {
          id: "move-flow",
          title: "From input to a move",
          type: "workflows",
          items: [
            {
              title: "Player interaction",
              steps: [
                "Pick a piece",
                "Generate legal moves",
                "Choose destination",
                "Apply and animate"
              ]
            }
          ]
        },
        {
          id: "rules",
          title: "Custom move-generation logic",
          type: "list",
          items: [
            "Pseudo-legal moves follow the piece pattern over the folded surface. Sliding rays stop on occupied squares, repeated squares, or the current step limit.",
            "Legal-move filtering temporarily applies a candidate and rejects it when the moving team's surviving kings would be unsafe.",
            "Teammates cannot capture one another. Pawn direction follows the face ring, with automatic queen promotion on reaching the opposite home face.",
            "A player with no legal move on their turn is eliminated. The remaining team wins when the opposing team has no surviving players."
          ]
        },
        {
          id: "modes",
          title: "Two-player & team modes",
          type: "features",
          items: [
            {
              title: "Two players",
              description: "Vermilion starts on the top face and Ultramarine on the bottom face for a local opposite-face match."
            },
            {
              title: "Four players",
              description: "Vermilion and Ochre form Team Warm, while Ultramarine and Green form Team Cool. Turns alternate through the seats, skipping eliminated players."
            },
            {
              title: "CPU seats",
              description: "Individual seats can be automated, and Solo vs CPU leaves Vermilion human-controlled while the other seats play automatically."
            }
          ]
        },
        {
          id: "cpu",
          title: "CPU heuristic",
          type: "list",
          items: [
            "The CPU enumerates legal moves for its seat and scores them using captures, promotion, checks, forward progress, and a small positional preference.",
            "A random score component adds variation. The selected move is the highest-scoring candidate from that evaluation.",
            "The implementation evaluates the current legal moves in a single scoring pass."
          ]
        },
        {
          id: "rendering",
          title: "Three.js rendering & controls",
          type: "features",
          items: [
            {
              title: "Board and pieces",
              description: "The scene builds the six board faces and geometric pieces with meshes, materials, lighting, shadows, and plaster texture."
            },
            {
              title: "Picking and camera",
              description: "Raycasting maps pointer input to board squares. OrbitControls supports dragging to orbit and scrolling to zoom."
            },
            {
              title: "Visual feedback",
              description: "Legal destinations, capture rings, check indicators, move history, and animated paths connect the rules to the interface."
            },
            {
              title: "Scene lifecycle",
              description: "The scene responds to container resize and exposes an API for state synchronization and move animation. Disposal stops its frame loop and releases controls and renderer."
            }
          ]
        },
        {
          id: "decisions",
          title: "Challenges & solutions",
          type: "features",
          items: [
            {
              title: "Rules across folds",
              description: "Face-local bases and a shared advance function keep geometric transitions inside the engine, away from React presentation code."
            },
            {
              title: "Legal state before presentation",
              description: "The Game engine validates and applies a move before the scene animates its path. Camera interaction remains a separate scene concern."
            },
            {
              title: "Team-aware safety",
              description: "Candidate moves are checked against all surviving kings on the moving team, making team rules part of move legality."
            }
          ]
        },
        {
          id: "verification",
          title: "Verification approach",
          type: "list",
          items: [
            "The README documents manual checks for player modes, CPU seats, selection, legal destinations, camera controls, and restarting a match.",
            "The package manifest defines development, Vite build, and preview commands.",
            "The repository has no automated test command. Engine edge cases and visual interaction remain important verification work."
          ]
        },
        {
          id: "deployment",
          title: "Build & deployment",
          type: "text",
          paragraphs: [
            "Vite and vite-plugin-singlefile produce a static dist/index.html with embedded application code and imported assets. The README describes deployment to a static host. A hosted demo URL is unverified."
          ]
        },
        {
          id: "limitations",
          title: "Rules & runtime limitations",
          type: "list",
          items: [
            "This is a cube-surface chess variant. Its board geometry is three-dimensional.",
            "Sliding movement is currently capped at 12 steps per direction.",
            "Castling, en passant, underpromotion, and standard repetition or move-count draws are not implemented.",
            "Games are local to the browser, with no online multiplayer or saved-game persistence. Refreshing starts a new game.",
            "The live game requires WebGL support. The portfolio uses a static screenshot of the local repository build."
          ]
        },
        {
          id: "lessons",
          title: "Engineering lessons",
          type: "list",
          items: [
            "Keep cube geometry and legal-move generation separate from interface and rendering code.",
            "Use a shared square representation for picking, move history, board state, and animation paths.",
            "Make team safety and elimination rules explicit before evaluating CPU moves.",
            "Treat renderer lifetime, resize handling, and motion preferences as part of the interactive experience."
          ]
        }
      ]
    }
  }
];
