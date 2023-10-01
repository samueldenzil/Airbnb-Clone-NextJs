import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import { ModalProvider } from '@/components/providers/modal-provider'
import { ToasterProvider } from '@/components/providers/toaster-provider'
import Navbar from '@/components/navbar/navbar'
import { getCurrentUser } from '@/lib/get-current-user'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'A Fullstack Airbnb Clone with Next.js 13, React, Prisma, Tailwind, PostgreSQL.',
  icons: {
    icon: '/assets/airbnb-icon.svg',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <ModalProvider />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
