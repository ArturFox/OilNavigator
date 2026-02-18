import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios-base-query";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export interface Painting {
  id: number
  name: string
  created: string
  imageUrl: string
  authorId: number
  locationId: number
}

export const getPaintingsApi = createApi({
    reducerPath: "getPaintingsApi",
    baseQuery: axiosBaseQuery({baseUrl: BASE_URL}),
    keepUnusedDataFor: 120,
    endpoints: (builder) => ({
        getPaintingsApi: builder.query<
        { data: Painting[], totalCount: number },
        { page: number, limit: number, q: string }
        >({
            query: ({ page = 1, limit = 6, q = '' }) => ({
                url: `/paintings?_page=${page}&_limit=${limit}${q ? `&q=${q}` : ''}`,
            }),
            transformResponse: (response: Painting[], meta) => {
                const totalHeader = meta?.headers?.['x-total-count'] || meta?.headers?.['X-Total-Count']
                const totalCount = totalHeader ? Number(totalHeader) : response.length

                return { data: response, totalCount }
            },
        })
    })
})