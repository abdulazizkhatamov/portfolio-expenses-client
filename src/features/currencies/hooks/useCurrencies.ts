import { useQuery } from '@tanstack/react-query'

import { get_Currencies } from '@/features/currencies/currenciesApi'

export const useFetchCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: () => get_Currencies(),
  })
}
