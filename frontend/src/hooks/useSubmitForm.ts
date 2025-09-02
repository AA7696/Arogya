// hooks/useSubmitForm.ts
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const useSubmitForm = () => {
    const navigate = useNavigate()
  return useMutation({
    mutationFn: async (formData: any) => {
      const res = await axios.post("/api/v1/users", formData)
      return res.data
    },
     onSuccess: () => {
      toast.success("Form submitted successfully!")
      navigate("/form-complete")
    },
    onError: () =>{
        toast.error("Error submitting form")
    }
        
  })
}
