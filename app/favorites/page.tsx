import EmptyState from '@/components/empty-state'
import FavoritesClient from './favorites-client'
import { getCurrentUser } from '@/lib/get-current-user'
import { getFavoriteListings } from '@/lib/get-favorite-listings'

export default async function FavoritesPage() {
  const user = await getCurrentUser()

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const listings = await getFavoriteListings()

  if (!listings || listings.length === 0) {
    return (
      <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings." />
    )
  }

  return <FavoritesClient listings={listings} user={user} />
}
