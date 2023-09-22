import Container from '@/components/container'
import Logo from '@/components/navbar/logo'
import Search from '@/components/navbar/search'
import UserMenu from '@/components/navbar/user-menu'

export default function Navbar() {
  return (
    <div className="fixed w-full bg-white shadow-sm z-10">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}
