"use client"

import { useEffect, useState } from 'react'

export default function useRemote(resource: string, initial: any = null) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(!initial)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch(`/api/data?resource=${encodeURIComponent(resource)}`)
      .then((r) => r.json())
      .then((payload) => {
        if (!mounted) return
        if (payload.ok) setData(payload.data)
        else setError(new Error(payload.error || 'Unknown'))
      })
      .catch((err) => {
        if (!mounted) return
        setError(err)
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [resource])

  return { data, loading, error }
}
