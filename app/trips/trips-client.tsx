'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Reservation, User, Listing } from '@prisma/client'
import axios from 'axios'
import toast from 'react-hot-toast'

import Container from '@/components/container'
import Heading from '@/components/heading'
import ListingCard from '@/components/listings/listing-card'
import { ReservationWithListings } from '@/types'

type TripsClientProps = {
  reservations: ReservationWithListings[]
  user: User
}

export default function TripsClient({ reservations, user }: TripsClientProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled')
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
      <Heading title="Trips" subtitle="Where you've been and where you're going" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={reservation.id === deletingId}
            actionLabel="Cancel reservation"
            user={user}
          />
        ))}
      </div>
    </Container>
  )
}
