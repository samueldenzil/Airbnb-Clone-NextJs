import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { User } from '@prisma/client'

import { useModalStore } from './use-modal-store'

type TUseFavorite = {
  listingId: string
  user?: User | null
}

const useFavorite = ({ listingId, user }: TUseFavorite) => {
  const router = useRouter()

  const { onOpen } = useModalStore()

  const hasFavorited = useMemo(() => {
    const list = user?.favoriteIds || []
    return list.includes(listingId)
  }, [listingId, user?.favoriteIds])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!user) {
        return onOpen('loginModal')
      }

      try {
        let request

        let successMessage

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
          successMessage = 'Removed from favorite'
        } else {
          request = () => axios.patch(`/api/favorites/${listingId}`)
          successMessage = 'Add to favorite'
        }

        await request()
        router.refresh()
        toast.success(successMessage)
      } catch (error: any) {
        const errorMessage = error?.response?.data ? error.response.data : 'Something went wrong'
        toast.error(errorMessage)
      }
    },
    [hasFavorited, listingId, onOpen, router, user]
  )

  return { hasFavorited, toggleFavorite }
}

export default useFavorite
