import { createFileRoute } from '@tanstack/react-router'
import { Store } from '@tanstack/store'
import { useSyncExternalStore } from 'react'

interface CounterState {
  count: number
  history: number[]
}

const counterStore = new Store<CounterState>({ count: 0, history: [] })

function increment() {
  counterStore.setState((s) => ({
    count: s.count + 1,
    history: [...s.history, s.count + 1],
  }))
}

function decrement() {
  counterStore.setState((s) => ({
    count: s.count - 1,
    history: [...s.history, s.count - 1],
  }))
}

function reset() {
  counterStore.setState(() => ({ count: 0, history: [] }))
}

function useStoreSelector<T, R>(store: Store<T>, selector: (state: T) => R): R {
  return useSyncExternalStore(
    (listener) => {
      const sub = store.subscribe({ next: listener })
      return () => sub.unsubscribe()
    },
    () => selector(store.state),
    () => selector(store.state),
  )
}

export const Route = createFileRoute('/demo/store')({
  component: StoreDemo,
})

function StoreDemo() {
  const count = useStoreSelector(counterStore, (s) => s.count)
  const history = useStoreSelector(counterStore, (s) => s.history)

  return (
    <main className="demo-page demo-center">
      <section className="demo-panel w-full max-w-2xl">
        <header className="mb-8">
          <p className="island-kicker mb-2">TanStack Store</p>
          <h1 className="demo-title">Store Demo</h1>
          <p className="demo-muted text-sm mt-1">
            Framework-agnostic reactive state via <code>useSyncExternalStore</code>.
            Store lives outside React; updates propagate automatically.
          </p>
        </header>

        <div className="demo-card mb-6 flex flex-col items-center gap-4 py-8">
          <span className="text-6xl font-bold text-[var(--sea-ink)]">{count}</span>
          <div className="flex gap-3">
            <button onClick={decrement} className="demo-button">−</button>
            <button
              onClick={reset}
              className="demo-button"
              style={{ background: 'transparent', border: '1px solid var(--line)' }}
            >
              Reset
            </button>
            <button onClick={increment} className="demo-button">+</button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="demo-card">
            <h3 className="demo-section-title mb-2">History</h3>
            <p className="demo-muted text-sm font-mono">{history.join(' → ')}</p>
          </div>
        )}
      </section>
    </main>
  )
}
