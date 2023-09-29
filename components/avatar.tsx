import Image from 'next/image'

export default function Avatar({ src }: { src?: string | null }) {
  return (
    <Image
      src={
        src
          ? src
          : 'https://raw.githubusercontent.com/AntonioErdeljac/next13-airbnb-clone/master/public/images/placeholder.jpg'
      }
      height={30}
      width={30}
      className="rounded-full"
      alt="Avatar"
    />
  )
}
