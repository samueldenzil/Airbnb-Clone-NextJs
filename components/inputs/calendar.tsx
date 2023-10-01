import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange, Range, RangeKeyDict } from 'react-date-range'

type CalendarProps = {
  value: Range
  disabledDates?: Date[]
  onChange: (value: RangeKeyDict) => void
}

export default function Calendar({ value, disabledDates, onChange }: CalendarProps) {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}
