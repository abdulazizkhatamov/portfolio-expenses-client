import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  post_loginAccount,
  post_registerAccount,
} from '@/features/auth/authApi'
import { getAxiosErrorMessage } from '@/utils/getAxiosError'

export const useLogin = () => {
  return useMutation({
    mutationFn: post_loginAccount,
    onSuccess: () => {
      window.location.href = '/'
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error)
      toast.error(message, {
        position: 'top-center',
      })
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: post_registerAccount,
    onSuccess: () => {
      window.location.href = '/'
    },
    onError: (error) => {
      const message = getAxiosErrorMessage(error)
      toast.error(message, {
        position: 'top-center',
      })
    },
  })
}
