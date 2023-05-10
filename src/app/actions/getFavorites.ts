import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getFavoriteListing(){
    try{
        const currentUser = await getCurrentUser()
        if(!currentUser){
            return []
        }
        const favorites = await prisma?.listing.findMany({
            where:{
                id:{
                    in:[...(currentUser.favoriteIds|| [])]
                }
            }
        })
        const  safeFavorites = favorites.map(f =>({
            ...f,
            createdAt: f.createdAt.toISOString()

        }))
        return safeFavorites;
    }catch(err:any){
        throw new Error(err)
    }
}