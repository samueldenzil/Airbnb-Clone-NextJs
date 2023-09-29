'use client'

import { useMemo } from 'react'
import { Listing, Reservation, User } from '@prisma/client'

import { categories } from '@/components/navbar/categories'
import ListingHead from '@/components/listings/listing-head'
import Container from '@/components/container'
import ListingInfo from '@/components/listings/listing-info'

type ListingClientProps = {
  reservations?: Reservation[]
  listing: Listing & { user: User }
  user?: User | null
}

export default function ListingClient({ listing, user }: ListingClientProps) {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-y-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            user={user}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
