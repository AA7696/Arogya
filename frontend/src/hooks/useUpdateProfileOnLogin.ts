import { useMutation } from "@tanstack/react-query"
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"



import axios from "axios"

export const useUpdateProfileOnLogin = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const email = user?.primaryEmailAddress?.emailAddress

    return useMutation({
        mutationFn: async (data: any) => {
            const res = await axios.put(`http://localhost:8000/api/v1/users/${email}`, data)
            return res.data
        },
        onSuccess: () => {
            toast.success("Form submitted successfully!")
            navigate("/form-complete")
        },
        onError: () => {
            toast.error("Error submitting form")
        }

    })
}
