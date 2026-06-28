import { neon, type NeonQueryFunction } from '@neondatabase/serverless'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '#/generated/prisma/client'

const isNeonUrl = (url: string) => url.includes('.neon.tech')

// Raw SQL client — compatible query() API for both Neon and local Postgres
type RawClient = {
  query(text: string, values?: unknown[]): Promise<{ rows: Record<string, unknown>[] }>
}

let _neonClient: NeonQueryFunction<false, false>
let _pgPool: Pool

export function getClient(): RawClient | undefined {
  const url = process.env.DATABASE_URL
  if (!url) return undefined

  if (isNeonUrl(url)) {
    if (!_neonClient) _neonClient = neon(url)
    return _neonClient as unknown as RawClient
  }

  if (!_pgPool) _pgPool = new Pool({ connectionString: url })
  return _pgPool
}

// Prisma client (uses pg adapter for both Neon and local Postgres)
function createPrismaClient() {
  const url = process.env.DATABASE_URL ?? 'postgresql://localhost/placeholder'
  const adapter = new PrismaPg({ connectionString: url })
  return new PrismaClient({ adapter })
}

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

export const prisma = globalThis.__prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}
