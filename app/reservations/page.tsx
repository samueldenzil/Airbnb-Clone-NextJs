import EmptyState from '@/components/empty-state'
import { getCurrentUser } from '@/lib/get-current-user'
import { getReservations } from '@/lib/get-reservations'
import ReservationsClient from './reservations-client'

export default async function ReservationsPage() {
  const user = await getCurrentUser()

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const reservations = await getReservations({ authorId: user.id })

  if (!reservations || reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    )
  }

  return <ReservationsClient reservations={reservations} user={user} />
}
