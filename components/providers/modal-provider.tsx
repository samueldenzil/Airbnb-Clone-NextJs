'use client'

import { useEffect, useState } from 'react'

import RegisterModal from '@/components/modals/register-modal'
import LoginModal from '@/components/modals/login-modal'
import RentModal from '@/components/modals/rent-modal'

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
    </>
  )
}
