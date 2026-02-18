import axios, { AxiosError } from "axios";

interface QueryParams {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: unknown
  params?: unknown
}

export function axiosBaseQuery({ baseUrl }: { baseUrl: string } = { baseUrl: '' }) {
  return async ({ url, method = 'GET', data, params }: QueryParams) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })

      return { data: result.data, meta: result }
    }
    catch (axiosError) {
      const err = axiosError as AxiosError

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
}