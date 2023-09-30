'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import { ReservationWithListings } from '@/types'
import Container from '@/components/container'
import Heading from '@/components/heading'
import ListingCard from '@/components/listings/listing-card'

type ReservationsClientProps = {
  reservations: ReservationWithListings[]
  user: User
}

export default function ReservationsClient({ reservations, user }: ReservationsClientProps) {
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
        .catch((error: any) => {
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
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={reservation.id === deletingId}
            actionLabel="Cancel guest reservation"
            user={user}
          />
        ))}
      </div>
    </Container>
  )
}
