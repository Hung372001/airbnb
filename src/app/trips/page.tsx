import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import {TripClient} from "@/app/trips/TripClient";

const TripsPage = async ()=> {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }
    const reservations = await getReservations({
        userId: currentUser.id
    });
    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                title="No tríps found"
                subtitle="Look like you havent reserved any trips"
                />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <TripClient
                reservations = {reservations}
                currentUser = {currentUser}
                />
        </ClientOnly>
    )
}
export default TripsPage;
