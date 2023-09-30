import prisma from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: { listingId: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { listingId } = params

    if (!listingId) {
      return new NextResponse('ListingId missing', { status: 400 })
    }

    const listing = await prisma.listing.delete({
      where: {
        id: listingId,
        userId: user.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error: any) {
    console.log('[LISTINGID_DELETE_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
