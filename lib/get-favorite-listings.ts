import prisma from './db'
import { getCurrentUser } from './get-current-user'

export const getFavoriteListings = async () => {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return []
    }

    const favorite = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user.favoriteIds || [])],
        },
      },
    })

    return favorite
  } catch (error: any) {
    throw new Error(error)
  }
}
