'use client'

import * as z from 'zod'
import { UseFormReturn } from 'react-hook-form'

import { registerFormSchema } from '@/components/modals/register-modal'
import { BiDollar } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

type InputProps = {
  id: keyof z.infer<typeof registerFormSchema>
  label: string
  type?: 'text' | 'email' | 'password'
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  form: UseFormReturn<z.infer<typeof registerFormSchema>>
}

export default function Input({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  required,
  form,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="relative w-full">
      {formatPrice && <BiDollar size={24} className="absolute left-2 top-5 text-neutral-700" />}
      <input
        id={id}
        {...register(id, { required })}
        disabled={disabled}
        type={type}
        placeholder=" "
        className={twMerge(
          'peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70',
          formatPrice ? 'pl-9' : 'pl-4',
          errors[id]
            ? 'border-rose-500 focus:border-rose-500'
            : 'border-neutral-300 focus:border-black'
        )}
      />
      <label
        htmlFor={id}
        className={twMerge(
          'absolute top-5 z-10 origin-[0] -translate-y-3 transform text-sm duration-150',
          formatPrice ? 'left-9' : 'left-4',
          'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75',
          errors[id] ? 'text-rose-500' : 'text-zinc-400'
        )}
      >
        {label}
      </label>
    </div>
  )
}
