import EmptyState from '@/components/empty-state'
import { getCurrentUser } from '@/lib/get-current-user'
import PropertiesClient from './properties-client'
import { getListings } from '@/lib/get-listings'

export default async function PropertiesPage() {
  const user = await getCurrentUser()

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const listings = await getListings({ userId: user.id })

  if (!listings || listings.length === 0) {
    return <EmptyState title="No properties found" subtitle="Looks like you have no properties." />
  }

  return <PropertiesClient listings={listings} user={user} />
}
