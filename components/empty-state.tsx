'use client'

import { useRouter } from 'next/navigation'
import Heading from './heading'
import Button from './button'

type EmptyStateProps = {
  title?: string
  subtitle?: string
  showReset?: boolean
}

export default function EmptyState({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}: EmptyStateProps) {
  const router = useRouter()

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4 w-48">
        {showReset && (
          <Button label="Remove all filters" onClick={() => router.push('/')} outline />
        )}
      </div>
    </div>
  )
}
