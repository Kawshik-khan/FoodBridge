import { promises as fs } from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'mock-data.json')

export async function getMockData() {
  const raw = await fs.readFile(DATA_PATH, 'utf8')
  return JSON.parse(raw)
}

export async function getResource(resourcePath: string) {
  const data = await getMockData()
  if (!resourcePath) return data
  const parts = resourcePath.split('.')
  let cur: any = data
  for (const p of parts) {
    if (cur == null) return null
    cur = cur[p]
  }
  return cur
}
