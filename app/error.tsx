'use client'

import EmptyState from '@/components/empty-state'
import { useEffect } from 'react'

type ErrorStateProps = {
  error: Error
}

export default function Error({ error }: ErrorStateProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <EmptyState title="Uh Oh" subtitle="Something went wrong" />
}
