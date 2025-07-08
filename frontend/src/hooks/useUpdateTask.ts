// src/hooks/useUpdateTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '../api/taskApi'
import toast from 'react-hot-toast'

const useUpdateTask = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, updatedData }: { taskId: string; updatedData: any }) => updateTask(taskId, updatedData),
    onSuccess: () => {
      toast.success('Task updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] }) // ✅ Ensure correct key
    },
    onError: () => {
      toast.error('Failed to update task')
    }
  })
}

export default useUpdateTask
