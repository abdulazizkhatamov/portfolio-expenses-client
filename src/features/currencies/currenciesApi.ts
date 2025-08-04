import type { CurrencyType } from '@/types/currency'
import type { DefaultResponseType } from '@/types/response'
import axiosInstance from '@/lib/axiosInstance'

export const get_Currencies = async () => {
  const { data } =
    await axiosInstance.get<DefaultResponseType<CurrencyType>>(
      '/api/currencies',
    )
  return data
}
