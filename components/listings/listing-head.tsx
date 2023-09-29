import Image from 'next/image'
import { User } from '@prisma/client'

import useCountries from '@/hooks/use-countries'
import Heading from '@/components/heading'
import HeartButton from '@/components/heart-button'

type ListingHeadProps = {
  id: string
  imageSrc: string
  locationValue: string
  title: string
  user?: User | null
}

export default function ListingHead({
  id,
  imageSrc,
  locationValue,
  title,
  user,
}: ListingHeadProps) {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image src={imageSrc} fill alt="Image" className="w-full object-cover" />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} user={user} />
        </div>
      </div>
    </>
  )
}
