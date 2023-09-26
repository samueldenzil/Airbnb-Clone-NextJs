import prisma from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      category,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      title,
      description,
      price,
    } = body

    if (
      !category ||
      !location ||
      !guestCount ||
      !roomCount ||
      !bathroomCount ||
      !imageSrc ||
      !title ||
      !description ||
      !price
    ) {
      return new NextResponse('Some fields are missing', { status: 400 })
    }

    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.log('[LISTING_POST_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
