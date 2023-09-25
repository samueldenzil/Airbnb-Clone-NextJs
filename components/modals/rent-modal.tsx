import { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { useModalStore } from '@/hooks/use-modal-store'
import Modal from './modal'
import Heading from '@/components/heading'
import { categories } from '@/components/navbar/categories'
import CategoryInput from '@/components/inputs/category-input'
import CountrySelect from '@/components/inputs/country-select'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal() {
  const { isOpen, onClose, type } = useModalStore()

  const isModalOpen = isOpen && type === 'rentModal'

  const form = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: '',
    },
  })

  const category = form.watch('category')
  const location = form.watch('location')

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
      <div>
        <Heading title="Where is your place located?" subtitle="Help guests find you!" />
        <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
      </div>
    )
  }

  return (
    <Modal
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={onNext}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      isOpen={isModalOpen}
      onClose={onClose}
      body={bodyContent}
    />
  )
}
