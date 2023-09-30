import prisma from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { totalPrice, startDate, endDate, listingId } = body

    if (!totalPrice || !startDate || !endDate || !listingId) {
      return new NextResponse('Some fields are missing', { status: 400 })
    }

    const listing = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: user.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.log('[RESERVATION_POST_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
