import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'
import { AiOutlineClose } from 'react-icons/ai'

type ImageUploadProps = {
  value: { image: File | null; imageUrl: string }
  onChange: (value: { image: File | null; imageUrl: string }) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return
    }

    const file = e.target.files[0]
    onChange({ image: file, imageUrl: URL.createObjectURL(file) })
  }

  if (value?.imageUrl) {
    return (
      <div className="relative">
        <Image
          src={value?.imageUrl}
          width={1000}
          height={1000}
          className="h-80 w-full rounded-lg object-cover object-center"
          alt="image"
        />
        <div
          onClick={() => onChange({ image: null, imageUrl: '' })}
          className="absolute -right-3 -top-3 cursor-pointer rounded-full bg-rose-500 p-2 text-white transition hover:bg-rose-400"
        >
          <AiOutlineClose />
        </div>
      </div>
    )
  }

  return (
    <label
      htmlFor="dropzone-image"
      className="flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
    >
      <div className="flex flex-col items-center justify-center pb-6 pt-5 text-neutral-600">
        <TbPhotoPlus size={50} />
        <p className="mt-4 text-sm font-semibold">Click to upload</p>
        <p className="mt-2 text-xs">SVG, PNG, JPG or GIF (MAX. 5mb)</p>
      </div>
      <input
        id="dropzone-image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleChange(e)
        }}
      />
    </label>
  )
}
