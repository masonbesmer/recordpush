# AGENTS.md — Project Context

## Scaffold Command

```
npx @tanstack/cli@latest create my-tanstack-app \
  --agent --package-manager pnpm --tailwind \
  --add-ons sentry,prisma,neon
```

Scaffolded in `../my-tanstack-app`, then merged into this repo.
Follow-up: `npx @tanstack/intent@latest install && npx @tanstack/intent@latest list`

<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `pnpm dlx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

---

## Stack

| Layer | Choice |
|---|---|
| Framework | TanStack Start (React, SSR) |
| Routing | TanStack Router (file-based, `src/routes/`) |
| Data fetching | TanStack Query (`@tanstack/react-query`) |
| Client state | TanStack Store (`@tanstack/store`) |
| Client DB | TanStack DB (`@tanstack/db`) |
| AI context | TanStack Intent (`@tanstack/intent`) |
| ORM | Prisma 7 (adapter pattern via `@prisma/adapter-pg`) |
| Database | Neon (serverless Postgres) |
| Sync | Electric SQL (`@electric-sql/client`) — **not wired, see below** |
| Error monitoring | Sentry (`@sentry/tanstackstart-react`) |
| Styling | Tailwind CSS v4 |
| Bundler | Vite 8 |
| Package manager | pnpm |

---

## Key Files

```
src/
  db.ts                    Prisma + Neon client exports
  routes/
    __root.tsx             Root layout, QueryClientProvider, Devtools
    index.tsx              Home page
    about.tsx              About page
    demo/
      prisma.tsx           Prisma CRUD demo (server functions → Prisma → Neon)
      neon.tsx             Raw Neon SQL demo
      query.tsx            TanStack Query demo (useQuery + useMutation)
      store.tsx            TanStack Store demo (useSyncExternalStore bridge)
      db.tsx               TanStack DB demo (localOnlyCollectionOptions)
      electric.tsx         Electric integration guide + setup checklist
      sentry.testing.tsx   Sentry error testing
  generated/
    prisma/                Auto-generated Prisma client (DO NOT EDIT)
prisma/
  schema.prisma            Prisma schema (Prisma 7: no url in datasource block)
  seed.ts                  DB seed script
prisma.config.ts           Prisma 7 config (datasource URL lives here)
instrument.server.mjs      Sentry server-side instrumentation
```

---

## Environment Variables

### Required

```env
# .env.local
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require
```

Get from: https://console.neon.tech → your project → Connection Details → Connection string

### Optional

```env
# Sentry — from https://sentry.io → Settings → Projects → Client Keys
VITE_SENTRY_DSN=
VITE_SENTRY_ORG=
VITE_SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=

# Electric SQL — your Electric service endpoint
VITE_ELECTRIC_URL=http://localhost:3000
```

---

## First-Time Setup

### Local Postgres (Docker)

```bash
# 1. Start Postgres
docker compose up -d

# 2. Push Prisma schema (creates "Todo" table)
pnpm db:push

# 3. (Optional) Seed
pnpm db:seed

# 4. Start dev server
pnpm dev
```

`docker-compose.yml` auto-runs `db/init.sql` on first start, creating the `todos` table (used by the Neon raw-SQL demo).

### Neon (remote/production)

```bash
# 1. Set DATABASE_URL in .env.local to your Neon connection string
# 2. pnpm db:push
# 3. pnpm dev
```

---

## Architectural Decisions

### Prisma 7 Adapter Pattern
Prisma 7 removed `url` from the `datasource` block in `schema.prisma`. The URL is now only in `prisma.config.ts` (for migrations) and passed via `new PrismaPg({ connectionString })` to the client constructor. `src/db.ts` follows this pattern.

### TanStack Store without React adapter
`@tanstack/store` v0.11 doesn't include `useStore`. The Store's `subscribe` takes an `Observer<T>` and returns a `Subscription` with `.unsubscribe()`. `store.tsx` bridges this via `useSyncExternalStore`.

### TanStack DB — local-only for demo
`@tanstack/db` v0.6 requires a `sync` config. `localOnlyCollectionOptions` provides a no-op sync for purely client-side collections. Swapping to `electricSync()` from `@electric-sql/client` enables server sync — see `src/routes/demo/electric.tsx`.

### Electric SQL — thin scaffolding, no live wiring
Electric is a platform-level service, not a drop-in library. It requires a running Electric instance pointed at your Postgres. The `@electric-sql/client` package is installed. Wiring is documented in `src/routes/demo/electric.tsx` and `src/routes/demo/db.tsx`. No code runs until `VITE_ELECTRIC_URL` is set and an Electric service is live.

### QueryClientProvider in root
`QueryClientProvider` wraps children in `__root.tsx`'s `RootDocument`. The `QueryClient` instance lives at module scope (single instance, shared across navigations).

---

## Known Gotchas

- `pnpm-workspace.yaml` must have `allowBuilds` set for `@prisma/engines`, `@sentry/cli`, `esbuild`, `prisma`. Already configured.
- `pnpm` field in `package.json` for `onlyBuiltDependencies` is deprecated in pnpm v11 — config moved to `pnpm-workspace.yaml`.
- Prisma 7 `prisma generate` requires `DATABASE_URL` to be set (for `prisma.config.ts` resolution), even though it doesn't connect to the DB.
- Route tree (`src/routeTree.gen.ts`) is auto-generated. Run `pnpm generate-routes` after adding/removing route files.

---

## Demo Routes

| Route | Demonstrates |
|---|---|
| `/` | TanStack Start home |
| `/demo/prisma` | Prisma v7 + server functions |
| `/demo/neon` | Raw Neon serverless SQL |
| `/demo/query` | TanStack Query (useQuery + useMutation) |
| `/demo/store` | TanStack Store (framework-agnostic reactive state) |
| `/demo/db` | TanStack DB (local-only reactive collection) |
| `/demo/electric` | Electric SQL setup guide |
| `/demo/sentry/testing` | Sentry error capture |
