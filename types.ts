import { Listing, Reservation } from '@prisma/client'

export type ReservationWithListings = Reservation & {
  listing: Listing
}
