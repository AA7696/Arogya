import { useMutation } from "@tanstack/react-query"
import { useUser } from "@clerk/clerk-react";

import axios from "axios"

export const useUpdateProfile = () => {
    const { user } = useUser()
        const email = user?.primaryEmailAddress?.emailAddress

  return useMutation({
    mutationFn: async (data:any) => {
      const res = await axios.put(`/api/v1/users/${email}`, data)
      return res.data
    },

  })
}
