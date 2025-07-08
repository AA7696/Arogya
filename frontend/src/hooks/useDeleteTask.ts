// src/hooks/useDeleteTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '@/api/taskApi'
import toast from 'react-hot-toast'
import { useUserProfile } from './useUserProfile'

 const useDeleteTask = () => {
  const queryClient = useQueryClient()
    const { data: profile } = useUserProfile()

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      toast.success('Task deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['tasks', profile?._id] }) // Invalidate the tasks query to refetch the updated list
    },
    onError: () => {
      toast.error('Failed to delete task')
    }
  })
}
export default useDeleteTask
