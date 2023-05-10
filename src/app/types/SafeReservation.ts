import {Reservation} from "@prisma/client";
import {SafeListing} from "@/app/types/SafeListing";

export  type SafeReservation = Omit< Reservation,"createdAt"|"startDate"|"endDate"|"listingId">&{
    createdAt:string,
    startDate:string,
    endDate:string,
    listing:SafeListing

}