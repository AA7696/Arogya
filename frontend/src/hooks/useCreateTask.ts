import {useQueryClient, useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {createTask} from '../api/taskApi';
import {useUserProfile} from './useUserProfile';

export default function useCreateTask() {
        const { data: profile } = useUserProfile()
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success('Task created successfully');
      queryClient.invalidateQueries({
        queryKey: ['tasks', profile?._id], // Invalidate the tasks query to refetch the updated list
        // Optionally, you can include the user ID if needed
        // queryKey: ['tasks', profile?._id],
      }); // Invalidate the tasks query to refetch the updated list
    },
    onError: (error) => {
      toast.error(`Error creating task: ${error.message}`);
    },
  });
}