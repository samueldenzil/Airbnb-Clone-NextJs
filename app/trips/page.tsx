import EmptyState from '@/components/empty-state'
import { getCurrentUser } from '@/lib/get-current-user'
import { getReservations } from '@/lib/get-reservations'
import TripsClient from './trips-client'

export default async function TripsPage() {
  const user = await getCurrentUser()

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const reservations = await getReservations({ userId: user.id })

  if (!reservations || reservations.length === 0) {
    return (
      <EmptyState title="No trips found" subtitle="Looks like you haven't reserved any trips." />
    )
  }
  return <TripsClient reservations={reservations} user={user} />
}
