export type DefaultResponseType<T = any> = {
  status: number
  message: string
  data: Array<T>
}
