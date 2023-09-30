'use client'

import { useCallback, useMemo } from 'react'
import Image from 'next/image'
import { Listing, Reservation, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

import useCountries from '@/hooks/use-countries'
import HeartButton from '@/components/heart-button'
import Button from '../button'

type ListingCardProps = {
  data: Listing
  user?: User | null
  reservation?: Reservation
  actionId?: string
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
}

export default function ListingCard({
  data,
  user,
  reservation,
  actionId,
  actionLabel,
  disabled,
  onAction,
}: ListingCardProps) {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId!)
    },
    [disabled, onAction, actionId]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }
    return data.price
  }, [data.price, reservation])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)
    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            fill
            alt="listing"
            className="h-full w-full object-cover transition group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} user={user} />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">{reservationDate || data.category}</div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
        )}
      </div>
    </div>
  )
}
