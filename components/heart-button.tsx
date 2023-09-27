'use client'

import { User } from '@prisma/client'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

type HeartButtonProps = {
  listingId: string
  currentUser?: User | null
}

export default function HeartButton({ listingId, currentUser }: HeartButtonProps) {
  const hasFavorited = false
  const toggleFavorite = () => {}

  return (
    <div onClick={toggleFavorite} className="relative cursor-pointer transition hover:opacity-80">
      <AiOutlineHeart size={28} className="absolute -right-[2px] -top-[2px] fill-white" />
      <AiFillHeart
        size={24}
        className={twMerge(hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70')}
      />
    </div>
  )
}
