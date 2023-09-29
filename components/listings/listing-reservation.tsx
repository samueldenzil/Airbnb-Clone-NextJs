import { Range } from 'react-date-range'
import Calendar from '../inputs/calendar'
import Button from '../button'

type ListingReservationProps = {
  price: number
  totalPrice: number
  onChangeDate: (value: Range) => void
  dateRange: Range
  onSubmit: () => void
  disabled: boolean
  disabledDates: Date[]
}

export default function ListingReservation({
  dateRange,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
}: ListingReservationProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="flex items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  )
}
