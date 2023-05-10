import Image from 'next/image'
import {Inter} from 'next/font/google'
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import getListings, {IListingParams} from "@/app/actions/getListings";
import ListingCard from "@/app/components/listings/ListingCard";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface HomeProps {
    searchParams: IListingParams
}
const inter = Inter({subsets: ['latin']})

export default async function Home({searchParams}:HomeProps) {
    const listings = await getListings(searchParams)
    const currentUser = await getCurrentUser()
    if (listings?.length === 0) {
        return (    
            <ClientOnly>
                <EmptyState showReset/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <Container>
                <div className="
               pt-24
               grid
               grid-cols-1
               sm:grid-cols-2
               md:grid-cols-3
               lg:grid-cols-4
               xl:grid-cols-5
               2xl:grid-cols-6
               gap-8
               ">
                    {listings.map((el:any) => {
                        return (
                            <ListingCard
                                currentUser={currentUser}
                                key={el.id}
                                data={el}
                            />
                        )
                    })}

                </div>
            </Container>
        </ClientOnly>
    )
}
