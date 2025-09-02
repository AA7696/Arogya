import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useUserProfile =  () =>{
    const { user } = useUser();

    const email = user?.primaryEmailAddress?.emailAddress

    return useQuery({
        queryKey: ['user-profile', email],
        queryFn: async () => {
            const {data} = await axios.get(`/api/v1/users/${email}`);
            return data;
        },
        // If the user is not logged in, return null
        enabled: !!user,


    })

}

