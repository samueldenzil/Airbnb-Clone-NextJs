'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Listing } from '@prisma/client'
import axios from 'axios'
import toast from 'react-hot-toast'

import Container from '@/components/container'
import Heading from '@/components/heading'
import ListingCard from '@/components/listings/listing-card'

type PropertiesClientProps = {
  listings: Listing[]
  user: User
}

export default function PropertiesClient({ listings, user }: PropertiesClientProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted')
          router.refresh()
        })
        .catch((error) => {
          const errorMessage = error?.response?.data
            ? error?.response?.data
            : 'Something went wrong'
          toast.error(errorMessage)
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router]
  )

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={listing.id === deletingId}
            actionLabel="Delete property"
            user={user}
          />
        ))}
      </div>
    </Container>
  )
}
