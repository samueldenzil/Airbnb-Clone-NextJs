'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Listing, Reservation, User } from '@prisma/client'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Range } from 'react-date-range'

import { categories } from '@/components/navbar/categories'
import ListingHead from '@/components/listings/listing-head'
import Container from '@/components/container'
import ListingInfo from '@/components/listings/listing-info'
import { useModalStore } from '@/hooks/use-modal-store'
import ListingReservation from '@/components/listings/listing-reservation'

type ListingClientProps = {
  reservations?: Reservation[]
  listing: Listing & { user: User }
  user?: User | null
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

export default function ListingClient({ listing, user, reservations = [] }: ListingClientProps) {
  const { onOpen } = useModalStore()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.map((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates.push(...range)
    })

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(() => {
    if (!user) {
      return onOpen('loginModal')
    }

    setIsLoading(true)
    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success('Listing reserved!')
        setDateRange(initialDateRange)
        // redirect to /trips
        router.refresh()
      })
      .catch((error) => {
        const errorMessage = error?.response?.data ? error.response.data : 'Something went wrong.'
        toast.error(errorMessage)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [dateRange.endDate, dateRange.startDate, listing.id, onOpen, router, totalPrice, user])

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price])

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
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
