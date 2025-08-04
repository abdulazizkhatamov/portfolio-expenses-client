import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  delete_AdditionalCurrency,
  get_Settings,
  post_AdditionalCurrency,
  put_BaseCurrency,
} from '@/features/settings/settingsApi'
import { getAxiosErrorMessage } from '@/utils/getAxiosError'

export const useFetchSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: get_Settings,
  })
}

export const useUpdateBaseCurrency = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: put_BaseCurrency,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
      await queryClient.refetchQueries({ queryKey: ['settings'] })
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error)
      toast.error(message, {
        position: 'top-center',
      })
    },
  })
}

export const useAddAdditionalCurrency = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: post_AdditionalCurrency,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
      await queryClient.refetchQueries({ queryKey: ['settings'] })
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error)
      toast.error(message, {
        position: 'top-center',
      })
    },
  })
}

export const useDeleteAdditionalCurrency = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: delete_AdditionalCurrency,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
      await queryClient.refetchQueries({ queryKey: ['settings'] })
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error)
      toast.error(message, {
        position: 'top-center',
      })
    },
  })
}
