import prisma from './db'

export type TListingsParams = {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

export const getListings = async (params: TListingsParams) => {
  try {
    const {
      userId,
      bathroomCount,
      category,
      endDate,
      guestCount,
      locationValue,
      roomCount,
      startDate,
    } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      }
    }

    if (category) {
      query.category = category
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: endDate } },
              { startDate: { lte: endDate }, endDate: { gte: startDate } },
            ],
          },
        },
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      }
    }

    if (locationValue) {
      query.locationValue = locationValue
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      }
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
