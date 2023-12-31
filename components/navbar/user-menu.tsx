'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AiOutlineMenu } from 'react-icons/ai'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'

import { useModalStore } from '@/hooks/use-modal-store'
import Avatar from '@/components/avatar'
import MenuItem from '@/components/navbar/menu-item'

type UserMenuProps = {
  currentUser?: User | null
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const router = useRouter()
  const { onOpen, onClose } = useModalStore()

  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return onOpen('loginModal')
    }

    // Open Rent modal
    onOpen('rentModal')
  }, [currentUser, onOpen])

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-gray-100 md:block"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleIsOpen}
          className="flex cursor-pointer items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem label="My trips" onClick={() => router.push('/trips')} />
                <MenuItem label="My favorites" onClick={() => router.push('/favorites')} />
                <MenuItem label="My reservations" onClick={() => router.push('/reservations')} />
                <MenuItem label="My properties" onClick={() => router.push('/properties')} />
                <MenuItem
                  label="Airbnb my home"
                  onClick={() => {
                    onOpen('rentModal')
                  }}
                />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    signOut()
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={() => onOpen('loginModal')} />
                <MenuItem label="Sign up" onClick={() => onOpen('registerModal')} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
