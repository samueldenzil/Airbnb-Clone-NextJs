'use client'

import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Loader() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <AiOutlineLoading3Quarters size={50} className="animate-spin fill-rose-500" />
    </div>
  )
}
