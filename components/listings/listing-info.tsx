import dynamic from 'next/dynamic'
import { IconType } from 'react-icons'
import { User } from '@prisma/client'

import useCountries from '@/hooks/use-countries'
import Avatar from '@/components/avatar'
import ListingCategory from '@/components/listings/listing-category'
const Map = dynamic(() => import('../map'), { ssr: false })

type ListingInfoProps = {
  user: User
  category:
    | {
        label: string
        icon: IconType
        description: string
      }
    | undefined
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  locationValue: string
}

export default function ListingInfo({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}: ListingInfoProps) {
  const { getByValue } = useCountries()

  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}
