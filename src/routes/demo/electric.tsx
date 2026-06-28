import { createFileRoute } from '@tanstack/react-router'

// TODO: Electric sync wiring
//
// Electric is a platform-level sync layer, not a drop-in component.
// Full setup requires a running Electric service (self-hosted or Electric Cloud)
// pointed at your Postgres database. Steps:
//
// 1. Start Electric alongside your Postgres:
//    docker run -e DATABASE_URL=... electricsql/electric:latest
//    Or sign up at https://electric-sql.com for managed hosting.
//
// 2. Add ELECTRIC_URL to .env.local (e.g. http://localhost:3000).
//
// 3. Wire TanStack DB collection to Electric sync:
//
//    import { createCollection } from '@tanstack/db'
//    import { electricSync } from '@electric-sql/client'
//
//    export const todosCollection = createCollection<Todo>({
//      id: 'todos',
//      sync: electricSync({
//        url: `${import.meta.env.VITE_ELECTRIC_URL}/v1/shape`,
//        params: { table: 'todos' },
//      }),
//    })
//
// 4. Use useQuery(todosCollection, ...) anywhere — data streams in real-time
//    from Postgres through Electric into the client collection.
//
// 5. For writes, continue using createServerFn → Prisma → Postgres.
//    Electric detects the change and pushes it to all connected clients.
//
// See: https://electric-sql.com/docs/guides/tanstack

export const Route = createFileRoute('/demo/electric')({
  component: ElectricInfo,
})

function ElectricInfo() {
  const electricUrl = import.meta.env.VITE_ELECTRIC_URL as string | undefined

  return (
    <main className="demo-page demo-center">
      <section className="demo-panel w-full max-w-2xl">
        <header className="mb-8">
          <p className="island-kicker mb-2">Electric SQL</p>
          <h1 className="demo-title">Electric Integration</h1>
          <p className="demo-muted text-sm mt-1">
            Platform-level Postgres sync. Streams shape subscriptions to TanStack DB collections.
          </p>
        </header>

        <div className="demo-card mb-4">
          <h3 className="demo-section-title mb-2">Service Status</h3>
          {electricUrl ? (
            <p className="text-sm">
              <span className="text-green-600 font-medium">VITE_ELECTRIC_URL</span> is set →{' '}
              <code>{electricUrl}</code>
            </p>
          ) : (
            <p className="demo-muted text-sm">
              <span className="text-amber-500 font-medium">VITE_ELECTRIC_URL not set.</span>{' '}
              Add it to <code>.env.local</code> to enable sync.
            </p>
          )}
        </div>

        <div className="demo-card">
          <h3 className="demo-section-title mb-3">Setup Checklist</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm demo-muted">
            <li>
              Start Electric service pointing at your Neon/Postgres DB
            </li>
            <li>
              Set <code>VITE_ELECTRIC_URL</code> in <code>.env.local</code>
            </li>
            <li>
              Replace <code>getInitialData</code> in TanStack DB collections with{' '}
              <code>electricSync(...)</code> from <code>@electric-sql/client</code>
            </li>
            <li>
              Writes still go through Prisma server functions → Electric auto-propagates
            </li>
          </ol>
        </div>

        <div className="demo-card mt-4">
          <p className="demo-muted text-xs">
            Electric cannot be represented as a small in-page demo — it requires an
            external service with a live Postgres connection. The integration code lives in
            <code className="mx-1">src/routes/demo/electric.tsx</code> and{' '}
            <code>src/routes/demo/db.tsx</code>.
          </p>
        </div>
      </section>
    </main>
  )
}
