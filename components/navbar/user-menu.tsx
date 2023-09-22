'use client'

import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import Avatar from '@/components/avatar'
import MenuItem from '@/components/navbar/menu-item'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer transition"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleIsOpen}
          className="p-4 md:px-2 md:py-1 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md md:w-3/4 overflow-hidden right-0 top-12 text-sm bg-white w-[40vw]">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem label="Login" onClick={() => {}} />
              <MenuItem label="Sign up" onClick={() => {}} />
            </>
          </div>
        </div>
      )}
    </div>
  )
}
