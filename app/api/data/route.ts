import { NextResponse } from 'next/server'
import { getResource } from '@/lib/data'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const resource = url.searchParams.get('resource') || ''
  try {
    const data = await getResource(resource)
    return NextResponse.json({ ok: true, data })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
