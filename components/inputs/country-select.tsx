import Select from 'react-select'

import useCountries from '@/hooks/use-countries'

export type CountrySelectValue = {
  value: string
  label: string
  flag: string
  latlng: [number, number]
  region: string
}

type CountrySelectProps = {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const { getAll } = useCountries()

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className="flex items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},<span className="ml-1 text-neutral-500">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: { ...theme.colors, primary: 'black', primary25: '#ffe4e6' },
        })}
      />
    </div>
  )
}
