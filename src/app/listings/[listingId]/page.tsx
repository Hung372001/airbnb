import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "@/app/components/listings/ListingClient";
import getReservations from "@/app/actions/getReservations";
interface IParams{
    listingId?: string;
}
const ListingPage = async ({params}:{params:IParams})=>{
    const  listing = await getListingById(params)
    const reservation = await getReservations(params)
    const currentUser = await getCurrentUser()

    if(!listing){
        return(
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <ListingClient listing={listing} reservation={reservation} currentUser={currentUser}/>
        </ClientOnly>
    )
}
export default ListingPage