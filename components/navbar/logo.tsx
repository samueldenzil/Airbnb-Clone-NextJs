'use client'

import Image from 'next/image'
// import { useRouter } from "next/navigation";

export default function Logo() {
  // const router = useRouter();

  return (
    <Image
      src="https://raw.githubusercontent.com/AntonioErdeljac/next13-airbnb-clone/master/public/images/logo.png"
      height={100}
      width={100}
      alt="logo"
      className="hidden cursor-pointer md:block"
    />
  )
}
