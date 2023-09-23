'use client'

import { useEffect, useState } from 'react'

import RegisterModal from '@/components/modals/register-modal'

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
    </>
  )
}
