import prisma from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: { listingId: string } }) {
  try {
    let user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { listingId } = params

    if (!listingId) {
      return new NextResponse('ListingId missing', { status: 400 })
    }

    let favoriteIds = [...(user.favoriteIds || [])]
    favoriteIds = favoriteIds.filter((id) => id !== listingId)

    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favoriteIds,
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.log('[FAVOURITES_DELETE_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { listingId: string } }) {
  try {
    let user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { listingId } = params

    if (!listingId) {
      return new NextResponse('ListingId missing', { status: 400 })
    }

    let favoriteIds = [...(user.favoriteIds || [])]
    favoriteIds.push(listingId)

    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favoriteIds,
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.log('[FAVOURITES_PATCH_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
