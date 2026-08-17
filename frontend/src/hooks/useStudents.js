import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'

export function useStudents(status, options = {}) {
  return useQuery({
    queryKey: ['students', status],
    queryFn: () => api.getStudents(status),
    refetchInterval: 5000,
    ...options,
  })
}

export function useDashboard(options = {}) {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api.getDashboard(),
    refetchInterval: 5000,
    ...options,
  })
}

export function useUploadCSV() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (file) => api.uploadCSV(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['students'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useSendMessages() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (studentIds) => api.sendMessages(studentIds),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['students'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useDeleteStudent() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (studentId) => api.deleteStudent(studentId),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['students'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useCreateStudent() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data) => api.createStudent(data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['students'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useUpdateStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ studentId, status }) => api.updateStatus(studentId, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['students'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}