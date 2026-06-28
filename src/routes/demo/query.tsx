import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from '#/db'

const fetchTodos = createServerFn({ method: 'GET' }).handler(() =>
  prisma.todo.findMany({ orderBy: { createdAt: 'desc' } }),
)

const addTodo = createServerFn({ method: 'POST' })
  .validator((d: { title: string }) => d)
  .handler(({ data }) => prisma.todo.create({ data }))

export const Route = createFileRoute('/demo/query')({
  component: QueryDemo,
})

function QueryDemo() {
  const qc = useQueryClient()

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  })

  const mutation = useMutation({
    mutationFn: (title: string) => addTodo({ data: { title } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const title = fd.get('title') as string
    if (!title) return
    mutation.mutate(title)
    e.currentTarget.reset()
  }

  return (
    <main className="demo-page demo-center">
      <section className="demo-panel w-full max-w-2xl">
        <header className="mb-8">
          <p className="island-kicker mb-2">TanStack Query</p>
          <h1 className="demo-title">Query Demo</h1>
          <p className="demo-muted text-sm mt-1">
            Server functions + useQuery + useMutation with automatic cache invalidation.
          </p>
        </header>

        {isLoading ? (
          <p className="demo-muted">Loading…</p>
        ) : (
          <ul className="space-y-3 mb-6">
            {todos.map((t) => (
              <li key={t.id} className="demo-list-item">
                <span className="font-medium">{t.title}</span>
                <span className="demo-muted text-xs">#{t.id}</span>
              </li>
            ))}
            {todos.length === 0 && (
              <li className="demo-list-item text-center demo-muted">No todos yet.</li>
            )}
          </ul>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            name="title"
            placeholder="New todo…"
            className="demo-input min-w-0 flex-1"
          />
          <button type="submit" disabled={mutation.isPending} className="demo-button whitespace-nowrap">
            {mutation.isPending ? 'Adding…' : 'Add Todo'}
          </button>
        </form>
      </section>
    </main>
  )
}
