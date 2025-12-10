# Fortune 500 Enterprise Architecture Audit
**Area 1 – Architecture & System Design**  
Date: 2025-12-10

## Scope & Methodology
- Reviewed every active application surface inside the monorepo: the React 18 core SPA (`/src`), the React 19 landing experience (`/mimicheck-landing`), the FastAPI BFF (`/backend`), and the Supabase project (SQL migrations and 15+ Edge Functions under `/supabase`).
- Cross-referenced canonical documentation such as `README.md`, `.kiro/specs/enterprise-quality-audit/ARCHITECTURE_DECISIONS.md`, `docs/reports/SUPABASE-SETUP.md`, `docs/reports/FORMS-API-README.md`, and `docs/reports/PRODUCTION-DEPLOYMENT.md` to understand intended behaviors, data models, and deployment runbooks.
- Inspected third-party integrations (Supabase, Stripe, OpenAI/Anthropic, Vercel/Netlify) directly in code (`src/api/functions.js`, `supabase/functions/*`, `netlify.toml`) to validate actual data flows, secrets usage, and runtime topology.

## Current State
### System Topology
- **Core SPA (React 18, Vite)** – Lives in `/src`, uses Supabase JS (`src/api/supabaseClient.ts`) for auth, reads/writes the Postgres schema defined in `supabase/migrations/001_initial_schema.sql`, and orchestrates eligibility as well as PDF autofill logic directly inside UI services such as `src/services/AntragsService.js`.
- **Landing Page (React 19, TypeScript)** – Separated in `/mimicheck-landing` with its own Express/tRPC server stubs and Vercel-focused deployment scripts (`mimicheck-landing/README.md`, `VERCEL_DEPLOYMENT.md`). Contact forms write straight into `public.contact_requests` in Supabase per the storage/location rules in `docs/reports/SUPABASE-SETUP.md`.
- **FastAPI Backend (BFF / Forms API)** – Declared in `/backend` with endpoints for upload, analyze, billing, and a dedicated PDF Forms API (`backend/README.md`, `backend/forms_api.py`). However, `backend/main.py` still exposes placeholder routes (lines 69-205) with TODOs, so production traffic currently bypasses this layer.
- **Supabase Platform** – Provides Auth, Postgres, Row-Level Security, Storage buckets, and all asynchronous logic. Functions like `analyze-nebenkosten`, `extract-document`, `chat-assistant`, `create-stripe-checkout`, and `stripe-webhook` (see `/supabase/functions`) encapsulate PDF parsing, Claude/OpenAI usage, and payment orchestration. Secrets are injected via `setup-supabase-secrets.sh`.

### Data Flows & Third-Party Integrations
1. **Auth + Data** – Both SPAs call Supabase directly for auth/session management and table CRUD (e.g., `src/api/integrations.js` line 117 loads `abrechnungen`, `supabase/functions/analyze-nebenkosten` writes analysis results back).
2. **AI/LLM** – The core SPA calls `InvokeLLM` which proxies through the `ai-chat` edge function to Anthropic (`src/api/integrations.js`, `supabase/functions/chat-assistant/index.ts`). The backend Forms API also references GPT-4o-mini per `docs/reports/FORMS-API-README.md`.
3. **Stripe** – Payments are fully handled in Edge Functions: `create-stripe-checkout` creates sessions with price IDs pulled from env vars, while `stripe-webhook` mutates the `public.users` table when invoices succeed or subscriptions change. CSP rules in `netlify.toml` explicitly whitelist `js.stripe.com` and `api.stripe.com`.
4. **Document Pipelines** – File uploads go straight into Supabase Storage using the anonymous key (`src/api/integrations.js`), after which the SPA invokes `extract-document` or `autofill-antrag` edge functions. Landing-page contact submissions hit Supabase anonymously via the public `contact_requests` policy in `supabase/migrations/001_initial_schema.sql` lines 403-410.
5. **Hosting** – Deployment guidance steers the landing page and SPA toward Vercel, with Netlify kept as a fallback (`docs/reports/PRODUCTION-DEPLOYMENT.md`, `netlify.toml`). No infrastructure-as-code captures these steps; they are manual checklists.

### Scalability, Boundaries & Cloud Readiness Observations
- Domain logic (eligibility scoring, autofill, persistence) resides in browser code (`src/services/AntragsService.js`), while payments, AI, and parsing live in Supabase functions—leaving the documented FastAPI BFF unused and creating inconsistent trust boundaries.
- Backend `README.md` assumes an independent Postgres + Redis deployment, yet the live schema and state live in Supabase. There is no replication or contract ensuring data parity between the two data stores.
- Deployments rely on shell scripts and manual CLI commands (`docs/reports/PRODUCTION-DEPLOYMENT.md`), with no Terraform/Pulumi definitions or automated promotions across staging → prod.
- API surfaces lack versioning. The SPA calls Supabase Edge endpoints directly with hard-coded project references (`src/api/functions.js`), and FastAPI routes are exposed under `/api/*` without `/v1/` prefixes or published OpenAPI clients.
- Event-driven capabilities are limited to a few Supabase triggers (e.g., `handle_new_user` in `supabase/migrations/001_initial_schema.sql` lines 463-482) and the Stripe webhook. There is no shared event bus or queue to decouple heavy workloads.

### Current vs. Target Architecture Diagram
```mermaid
flowchart LR
  subgraph Current_State["Current State"]
    user((End Users))
    landing[Landing SPA\n(mimicheck-landing)]
    core[Core SPA\n(src/)]
    backend[FastAPI BFF + Forms API\n(backend/)]
    supabase[(Supabase Auth + DB + Storage)]
    edge[Supabase Edge Functions\n(analyze, autofill, chat, stripe)]
    stripe[(Stripe)]
    ai[(OpenAI & Anthropic)]
    storage[(Buckets: abrechnungen/antraege/...)]
    hosting[Vercel / Netlify]
    user --> landing
    user --> core
    landing --> hosting
    landing --> supabase
    core --> hosting
    core --> supabase
    core --> edge
    core --> backend
    backend --> ai
    edge --> stripe
    edge --> ai
    supabase --> storage
    stripe --> supabase
  end

  subgraph Target_State["Target Fortune-500 State"]
    gateway[Versioned API Gateway\n(Kong/Apigee/tRPC BFF)]
    domains[[Domain Services\n(Billing, Documents, Eligibility)]]
    queue[[Event Bus / Queue\n(Supabase Realtime, SQS, Temporal)]]
    workers[[Async Workers\n(PDF, AI, Notifications)]]
    datahub[(Unified Postgres + Warehouse)]
    observability[(Central Observability\n(Otel + Grafana/Sentry))]
    gateway --> domains
    domains --> datahub
    domains --> queue
    queue --> workers
    workers --> datahub
    gateway --> observability
    domains --> observability
  end
```

## Gap Analysis vs. Fortune-500 Expectations
| Dimension | Fortune-500 Benchmark | Observed Gap | Severity |
| --- | --- | --- | --- |
| Domain boundaries & ownership | Modular monolith or clearly scoped services with shared contracts and anti-corruption layers. | Business logic lives in the React SPA and Supabase functions while the FastAPI BFF is a stub, so there is no enforceable domain boundary or shared DTOs (`src/services/AntragsService.js`, `backend/main.py`). | **High** |
| API governance & versioning | Central gateway, semantic versioning, generated clients, zero hard-coded endpoints. | Frontends call Supabase Edge URLs with hard-coded project IDs and anonymous headers (`src/api/functions.js`), and backend routes are `/api/*` without versions or OpenAPI specs. | **High** |
| Data & storage governance | Single source of truth with schema registry, aligned storage buckets, and documented migrations. | Supabase migrations create `abrechnungen/antraege/nachweise/avatars`, but the SPA writes to a non-existent `documents` bucket (`src/api/integrations.js`), risking runtime failures and orphaned files. | **Medium** |
| Scalability & cloud readiness | Automated IaC, repeatable environments, containerized workloads, controlled secrets. | Deployments follow manual checklists (`docs/reports/PRODUCTION-DEPLOYMENT.md`), FastAPI isn’t containerized, Supabase secrets are set via ad-hoc scripts, and there is no environment promotion pipeline. | **Medium-High** |
| Event-driven & observability | Event bus/queue, idempotent workers, centralized telemetry/alerts. | Only DB triggers and a Stripe webhook exist; no event bus connects document ingestion, payments, and AI workloads. Observability is limited to console prints. | **Medium** |

## Severity Level
Overall Severity: **High**. Mission-critical flows (eligibility, payments, AI) bypass server-side governance and rely on browser code + Supabase functions with hard-coded endpoints, which violates Fortune-500 expectations for controlled data planes, versioned APIs, and auditable payment handling.

## Concrete Findings
| ID | Finding | Evidence | Severity |
| --- | --- | --- | --- |
| ARCH-01 | Domain orchestration (eligibility scoring, autofill, persistence) runs entirely inside the React SPA, while the documented FastAPI BFF exposes TODO endpoints; no server-side contract protects data quality. | `src/services/AntragsService.js` lines 11-395 implement eligibility scores, Supabase inserts, and PDF generation; `backend/main.py` lines 69-205 return static placeholders with TODO comments. | **High** |
| ARCH-02 | API calls bypass any gateway and hard-code the Supabase project reference, preventing environment parity and versioning. | `src/api/functions.js` lines 41-55 set `const PROJECT_REF = 'yjjauvmjyhlxcoumwqlj'` and hand-craft fetch requests; there is no `/v1` namespace or generated client. | **High** |
| ARCH-03 | Storage governance drift: the SPA uploads to `storage.from('documents')`, but migrations only provision `abrechnungen`, `antraege`, `nachweise`, and `avatars`, so uploads will fail in production. | Compare `src/api/integrations.js` lines 25-70 with `supabase/migrations/002_storage_buckets.sql` lines 12-31. | **Medium** |
| ARCH-04 | Payment-critical edge functions both orchestrate Stripe and mutate `public.users` using service-role keys, returning raw stack traces to the browser. There is no audit or intermediary service. | `supabase/functions/create-stripe-checkout/index.ts` lines 45-135 log secrets and return `{ error, stack }` to clients; `supabase/functions/stripe-webhook/index.ts` lines 48-120 update subscription fields directly. | **High** |
| ARCH-05 | There is no event bus or IaC. Deployments are manual, and dual data stores (Supabase vs. the planned FastAPI Postgres) have no replication story, risking divergence. | `docs/reports/PRODUCTION-DEPLOYMENT.md` documents manual CLI steps; `backend/README.md` requires a standalone Postgres/Redis stack unrelated to the Supabase schema in `supabase/migrations/001_initial_schema.sql`. | **Medium** |

## Recommended Actions & Technologies
| Action ID | Recommendation & Target Technologies | Addresses | Severity |
| --- | --- | --- | --- |
| RA-01 | Refactor into a modular monolith: move eligibility/autofill/business rules from `src/services` into the FastAPI BFF (or a shared tRPC gateway), expose typed DTOs, and keep Supabase as the persistence layer via service accounts. Use Nx or Turborepo for shared contracts. | ARCH-01 | **Critical** |
| RA-02 | Introduce an API gateway/service mesh (Kong, Apigee, or a typed tRPC BFF) with explicit `/v1`/`/v2` namespaces. Generate REST/TypeScript clients, inject Supabase project refs via environment variables, and remove hard-coded URLs. | ARCH-02 | **High** |
| RA-03 | Align storage contracts: either provision a `documents` bucket via migration or re-point uploads to the existing `abrechnungen/antraege` buckets. Enforce signed uploads via Supabase Storage API + policy checks codified in Terraform. | ARCH-03 | **Medium** |
| RA-04 | Harden payment & AI services: run Stripe + Anthropic/OpenAI traffic through the FastAPI BFF (or a dedicated edge service) with Secrets Manager-backed credentials, add audit/event logging, and sanitize responses so no stack traces reach clients. | ARCH-04 | **High** |
| RA-05 | Establish an event backbone and infrastructure-as-code: use Supabase Realtime, Temporal, or SNS/SQS for `document.uploaded`, `analysis.completed`, and `subscription.updated` events; codify Supabase/Vercel/Stripe config in Terraform or Pulumi; consolidate on a single Postgres (Supabase) or set up logical replication for the FastAPI stack. | ARCH-05 | **Medium** |

## Estimated Remediation Effort
| Action ID | Effort (person-weeks) | Notes | Severity |
| --- | --- | --- | --- |
| RA-01 | 6–8 | Requires carving bounded contexts (Billing, Documents, Eligibility), migrating logic out of the SPA, and adding shared contract packages. | Critical |
| RA-02 | 3–4 | Stand up gateway, generate clients, retrofit env-driven endpoints across both SPAs. | High |
| RA-03 | 1–2 | Update storage migrations + client code, add signed upload helper, regression test uploads. | Medium |
| RA-04 | 4–5 | Move Stripe/AI to server-side, add audit tables, create runbooks, and harden secrets. | High |
| RA-05 | 4–6 | Design event schema, provision queue/Temporal workers, author Terraform modules for Supabase + Vercel + Stripe webhooks. | Medium |

## References
- `README.md` (project topology & deployment targets)
- `.kiro/specs/enterprise-quality-audit/ARCHITECTURE_DECISIONS.md`
- `docs/reports/SUPABASE-SETUP.md` (schema, storage, triggers)
- `docs/reports/FORMS-API-README.md` (FastAPI Forms service, AI plans)
- `docs/reports/PRODUCTION-DEPLOYMENT.md` (manual deployment steps)
- `src/services/AntragsService.js`, `src/api/functions.js`, `src/api/integrations.js`
- `backend/README.md`, `backend/main.py`
- `supabase/functions/*` (Stripe, AI, PDF pipelines)
- `netlify.toml` (CSP + third-party allow list)
