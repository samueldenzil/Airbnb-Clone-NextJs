import { useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

import { useModalStore } from '@/hooks/use-modal-store'
import Modal from './modal'
import Heading from '@/components/heading'
import Map from '@/components/map'
import { categories } from '@/components/navbar/categories'
import CategoryInput from '@/components/inputs/category-input'
import CountrySelect from '@/components/inputs/country-select'
import Counter from '@/components/inputs/counter'
import ImageUpload from '@/components/inputs/image-upload'
import Input from '@/components/inputs/input'
import toast from 'react-hot-toast'
import supabase from '@/lib/supabase'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal() {
  const router = useRouter()

  const { isOpen, onClose, type } = useModalStore()

  const isModalOpen = isOpen && type === 'rentModal'

  const form = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageProperty: null,
      title: '',
      description: '',
      price: 1,
    },
  })

  const isLoading = form.formState.isSubmitting

  const category = form.watch('category')
  const location = form.watch('location')
  const guestCount = form.watch('guestCount')
  const roomCount = form.watch('roomCount')
  const bathroomCount = form.watch('bathroomCount')
  const imageProperty = form.watch('imageProperty')

  const setCustomValue = (id: string, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const [step, setStep] = useState(STEPS.CATEGORY)

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    // Uploading image file to supabase storage
    const path = `airbnb/listings/${uuidv4()}.${values?.imageProperty?.image?.name
      .split('.')
      .pop()}`
    const { data: supabaseImageData, error } = await supabase.storage
      .from('images')
      .upload(path, values?.imageProperty?.image)
    if (error) {
      console.error('Error uploading image:', error)
      return
    }

    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(path)

    const data = { ...values, imageSrc: publicUrlData.publicUrl }
    // console.log(data)

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!')
        router.refresh()
        form.reset()
        setStep(STEPS.CATEGORY)
        onClose()
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data ? error.response.data : 'Something went wrong'
        toast.error(`Error: ${errorMessage}`)
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-y-8">
      <Heading title="Which of these best describes your place?" subtitle="Pick a category" />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="">
            <CategoryInput
              label={item.label}
              icon={item.icon}
              onClick={(category) => setCustomValue('category', category)}
              selected={item.label === category}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-y-8">
        <Heading title="Where is your place located?" subtitle="Help guests find you!" />
        <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-y-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How may guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How may rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How may bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-y-8">
        <Heading
          title="Add photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageProperty}
          onChange={(value) => setCustomValue('imageProperty', value)}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-y-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input id="title" label="Title" form={form} disabled={isLoading} required />
        <hr />
        <Input id="description" label="Description" form={form} disabled={isLoading} required />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-y-8">
        <Heading title="Now, set your price" subtitle="How much do you charge per night?" />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          form={form}
          disabled={isLoading}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={form.handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      isOpen={isModalOpen}
      onClose={onClose}
      body={bodyContent}
    />
  )
}
