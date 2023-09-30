import EmptyState from '@/components/empty-state'
import { getCurrentUser } from '@/lib/get-current-user'
import { getListingById } from '@/lib/get-listing-by-id'
import ListingClient from './listing-client'
import { getReservations } from '@/lib/get-reservations'

type TParams = {
  listingId?: string
}

export default async function ListingPage({ params }: { params: TParams }) {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const user = await getCurrentUser()

  if (!listing) {
    return <EmptyState />
  }

  return (
    <div>
      <ListingClient listing={listing} user={user} reservations={reservations} />
    </div>
  )
}
