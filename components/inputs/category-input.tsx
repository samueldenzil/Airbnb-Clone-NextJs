import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

type CategoryInputProps = {
  label: string
  icon: IconType
  onClick: (value: string) => void
  selected?: boolean
}

export default function CategoryInput({
  label,
  icon: Icon,
  onClick,
  selected,
}: CategoryInputProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={twMerge(
        'flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-black',
        selected ? 'border-black' : 'border-neutral-200'
      )}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  )
}
