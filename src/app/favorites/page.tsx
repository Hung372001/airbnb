import React from 'react';
import getFavoriteListing from "@/app/actions/getFavorites";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import {ReservationClient} from "@/app/reservations/ReservationClient";
import FavoritesClient from "@/app/favorites/FavoritesClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

const FavoritesPage = async () => {
    const listings = await getFavoriteListing()
    const currentUser = await getCurrentUser()
    if (listings === 0) {
        return (
            <ClientOnly>
                <EmptyState
                 title="No favorites found"
                 subtitle="Looks like you have no favorite listings'"
                />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <FavoritesClient
                listings = {listings}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )

};

export default FavoritesPage;