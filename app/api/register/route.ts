import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import prisma from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return new NextResponse('Missing info', { status: 400 })
    }

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      return new NextResponse('Email already exisits', { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        emailVerified: new Date(),
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.error(error, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
