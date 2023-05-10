'use client'
import {SafeReservation} from "@/app/types/SafeReservation";
import {SafeUser} from "@/app/types/SafeUser";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import toast from "react-hot-toast";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import ListingCard from "@/app/components/listings/ListingCard";

interface ReservationClientProps {
    reservations:SafeReservation[],
    currentUser?:SafeUser|null;
};
export const ReservationClient: React.FC<ReservationClientProps> = ({
                                                          reservations,
                                                          currentUser
                                                      }) => {
    const router = useRouter()
    const [deletingId,setDeletingId] = useState('')
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`).then(() => {
            toast.success('Reservation cancelled')
            router.refresh()
        })
            .catch(err => {
                toast.error(err?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('')
            })
    },[router])
    return (
        <Container>
            <Heading
                title="Reservation"
                subTitle="Bookings on your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation)=>(
                    <ListingCard key={reservation.id}
                                 data={reservation.listing}
                                 currentUser={currentUser}
                                 onAction={onCancel}
                                 disabled={deletingId === reservation.id}
                                 actionLabel="Cancel reservation"
                                 reservation={reservation}
                                 actionId={reservation.id} />
                ))}
            </div>
        </Container>
    );
};