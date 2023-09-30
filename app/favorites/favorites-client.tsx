import { Listing, User } from '@prisma/client'

import Container from '@/components/container'
import Heading from '@/components/heading'
import ListingCard from '@/components/listings/listing-card'

type FavoritesClientProps = {
  listings: Listing[]
  user: User
}

export default function FavoritesClient({ listings, user }: FavoritesClientProps) {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you have favorited!" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} user={user} />
        ))}
      </div>
    </Container>
  )
}
