export interface CursorPaginationQuery {
  limit?: number
  cursor?: string
}

export function normalizeLimit(limit?: number, fallback = 20, max = 100) {
  if (!limit || Number.isNaN(Number(limit))) return fallback
  return Math.min(Number(limit), max)
}
