'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { Listing } from '@prisma/client'
import { useRouter } from 'next/navigation'

import useCountries from '@/hooks/use-countries'
import HeartButton from '@/components/heart-button'

type ListingCardProps = {
  data: Listing
}

export default function ListingCard({ data }: ListingCardProps) {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const price = useMemo(() => {
    return data.price
  }, [data.price])

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
            <HeartButton listingId={data.id} currentUser={null} />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">{data.category}</div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          <div className="font-light">night</div>
        </div>
      </div>
    </div>
  )
}
