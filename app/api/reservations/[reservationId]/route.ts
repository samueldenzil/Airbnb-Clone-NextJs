import { NextResponse } from 'next/server'

import prisma from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

export async function DELETE(request: Request, { params }: { params: { reservationId: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { reservationId } = params

    if (!reservationId) {
      return new NextResponse('ReservationId missing', { status: 400 })
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [{ userId: user.id }, { listing: { userId: user.id } }],
      },
    })

    return NextResponse.json(reservation)
  } catch (error: any) {
    console.log('[RESERVATIONID_DELETE_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
