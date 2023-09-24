import { User } from '@prisma/client'

import Container from '@/components/container'
import Logo from '@/components/navbar/logo'
import Search from '@/components/navbar/search'
import UserMenu from '@/components/navbar/user-menu'
import Categories from '@/components/navbar/categories'

type NavbarProps = {
  currentUser?: User | null
}

export default function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}
