import EmptyState from '@/components/empty-state'
import { getCurrentUser } from '@/lib/get-current-user'
import { getListingById } from '@/lib/get-listing-by-id'
import ListingClient from './listing-client'

type TParams = {
  listingId?: string
}

export default async function ListingPage({ params }: { params: TParams }) {
  const listing = await getListingById(params)
  const user = await getCurrentUser()

  if (!listing) {
    return <EmptyState />
  }

  return (
    <div>
      <ListingClient listing={listing} user={user} />
    </div>
  )
}
