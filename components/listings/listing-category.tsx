import { IconType } from 'react-icons'

type ListingCategoryProps = {
  label: string
  icon: IconType
  description: string
}

export default function ListingCategory({ label, icon: Icon, description }: ListingCategoryProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-x-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="font-lights text-neutral-500">{description}</div>
        </div>
      </div>
    </div>
  )
}
