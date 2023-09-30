import prisma from './db'

export type TListingsParams = {
  userId?: string
}

export const getListings = async (params: TListingsParams) => {
  try {
    const { userId } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return listings
  } catch (error: any) {
    throw new Error(error)
  }
}
