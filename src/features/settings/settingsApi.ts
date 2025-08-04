import type { SettingsResponseType } from '@/features/settings/types'
import axiosInstance from '@/lib/axiosInstance'

export const get_Settings = async () => {
  const { data } =
    await axiosInstance.get<SettingsResponseType>('/api/settings')
  return data
}

export const put_BaseCurrency = async ({ currency }: { currency: string }) => {
  const { data } = await axiosInstance.put('/api/settings/base-currency', {
    currency,
  })
  return data
}

export const post_AdditionalCurrency = async ({
  currency,
}: {
  currency: string
}) => {
  const { data } = await axiosInstance.post(
    '/api/settings/additional-currency',
    { currency },
  )
  return data
}

export const delete_AdditionalCurrency = async ({
  currency,
}: {
  currency: string
}) => {
  const { data } = await axiosInstance.delete(
    `/api/settings/additional-currency/${currency}`,
  )
  return data
}
