'use client'

// import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useModalStore } from '@/hooks/use-modal-store'
import Modal from '@/components/modals/modal'
import Heading from '@/components/heading'
import Input from '@/components/inputs/input'
import Button from '@/components/button'

export default function LoginModal() {
  const router = useRouter()
  const { isOpen, onClose, type } = useModalStore()

  const isModalOpen = isOpen && type === 'loginModal'

  const form = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    signIn('credentials', { ...values, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error)
      }
      console.log(callback)
      if (callback?.ok && !callback?.error) {
        toast.success('Welcome back')
        router.refresh()
        onClose()
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input id="email" form={form} label="Email" type="email" disabled={isLoading} required />
      <Input
        id="password"
        form={form}
        label="Password"
        type="password"
        disabled={isLoading}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t bg-neutral-300" />
        </div>
        <div className="relative text-center">
          <span className="bg-white px-2 text-sm text-zinc-400">or</span>
        </div>
      </div>
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />
      <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => {}} />
      <div className="mt-2 text-center font-light text-neutral-500">
        <div className="flex items-center justify-center gap-2">
          <div>Already have an account?</div>
          <span
            onClick={onClose}
            className="cursor-pointer text-neutral-800 transition hover:underline"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={isModalOpen}
      title="Login"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
