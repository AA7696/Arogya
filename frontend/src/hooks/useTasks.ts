import { useQuery } from "@tanstack/react-query";
import { useUserProfile } from "./useUserProfile";
import { getTasks } from "../api/taskApi";


export default function useTasks() {
    const { data: profile } = useUserProfile();
  return useQuery({
    queryKey: ["tasks", profile?._id],
    queryFn: () => getTasks(profile?._id),
    
    enabled: !!profile?._id, // Only run this query if the user profile is available
  });
}