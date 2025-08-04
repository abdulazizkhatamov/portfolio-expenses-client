import axiosInstance from '@/lib/axiosInstance'

// Login request
export const post_loginAccount = async (user: {
  email: string
  password: string
}) => {
  const { data } = await axiosInstance.post('/api/auth/login', user)
  return data
}

// Register request
export const post_registerAccount = async (user: {
  first_name: string
  last_name: string
  email: string
  password: string
}) => {
  const { data } = await axiosInstance.post('/api/auth/register', user)
  return data
}
