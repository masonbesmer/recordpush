import { createFileRoute } from '@tanstack/react-router'
import { createCollection, localOnlyCollectionOptions } from '@tanstack/db'
import { useEffect, useState } from 'react'

interface Item {
  id: string
  label: string
  done: boolean
}

const itemsCollection = createCollection(
  localOnlyCollectionOptions<Item, string>({
    id: 'demo-items',
    getKey: (item) => item.id,
  }),
)

let _seq = 1

function addItem(label: string) {
  itemsCollection.insert({ id: String(_seq++), label, done: false })
}

function toggleItem(id: string) {
  itemsCollection.update(id, (draft) => {
    draft.done = !draft.done
  })
}

function useCollection<T extends object>(collection: typeof itemsCollection) {
  const [items, setItems] = useState<T[]>([...collection.toArray] as T[])

  useEffect(() => {
    const sub = collection.subscribeChanges(
      () => setItems([...collection.toArray] as T[]),
      { includeInitialState: true },
    )
    return () => sub.unsubscribe()
  }, [collection])

  return items
}

export const Route = createFileRoute('/demo/db')({
  component: DbDemo,
})

function DbDemo() {
  const items = useCollection<Item>(itemsCollection)
  const sorted = [...items].sort((a, b) => a.label.localeCompare(b.label))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const label = fd.get('label') as string
    if (!label) return
    addItem(label)
    e.currentTarget.reset()
  }

  return (
    <main className="demo-page demo-center">
      <section className="demo-panel w-full max-w-2xl">
        <header className="mb-8">
          <p className="island-kicker mb-2">TanStack DB</p>
          <h1 className="demo-title">DB Demo</h1>
          <p className="demo-muted text-sm mt-1">
            Client-side reactive collection with typed mutations.{' '}
            <code>localOnlyCollectionOptions</code> — no server required.
            Wire in Electric for Postgres sync.
          </p>
        </header>

        <ul className="space-y-3 mb-6">
          {sorted.map((item) => (
            <li
              key={item.id}
              className="demo-list-item flex items-center gap-3 cursor-pointer"
              onClick={() => toggleItem(item.id)}
            >
              <span
                className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs transition-colors flex-shrink-0 ${
                  item.done
                    ? 'bg-[var(--lagoon-deep)] border-[var(--lagoon-deep)] text-white'
                    : 'border-[var(--sea-ink-soft)]'
                }`}
              >
                {item.done ? '✓' : ''}
              </span>
              <span className={item.done ? 'line-through demo-muted' : 'font-medium'}>
                {item.label}
              </span>
            </li>
          ))}
          {items.length === 0 && (
            <li className="demo-list-item text-center demo-muted">
              No items. Add one below.
            </li>
          )}
        </ul>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            name="label"
            placeholder="New item…"
            className="demo-input min-w-0 flex-1"
          />
          <button type="submit" className="demo-button whitespace-nowrap">
            Add Item
          </button>
        </form>

        <div className="demo-card mt-6">
          <p className="demo-muted text-sm">
            <code>createCollection</code> + <code>localOnlyCollectionOptions</code> keeps
            data in-memory with optimistic mutations. Swap <code>localOnlyCollectionOptions</code>{' '}
            for <code>electricSync()</code> from <code>@electric-sql/client</code> to sync
            live from Postgres. See <a href="/demo/electric" className="underline">Electric demo</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
