import prisma from './db'

type TParams = {
  listingId?: string
}

export const getListingById = async (params: TParams) => {
  try {
    const { listingId } = params

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    })

    if (!listing) {
      return null
    }

    return listing
  } catch (error) {
    return null
  }
}
