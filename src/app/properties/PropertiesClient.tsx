'use client'
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
import {SafeListing} from "@/app/types/SafeListing";

interface PropertiesClientProps {
    listings:SafeListing[],
    currentUser?:SafeUser|null;
};
export const PropertiesClient: React.FC<PropertiesClientProps> = ({
                                                                      listings,
                                                          currentUser
                                                      }) => {
    const router = useRouter()
    const [deletingId,setDeletingId] = useState('')
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`).then(() => {
            toast.success('Listing Deleted')
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
                title="Properties"
                subTitle="Where you've been and where you're going"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing)=>(
                    <ListingCard key={listing.id}
                                 data={listing}
                                 currentUser={currentUser}
                                 onAction={onCancel}
                                 disabled={deletingId === listing.id}
                                 actionLabel="Delete properties"
                                 actionId={listing.id} />
                ))}
            </div>
        </Container>
    );
};