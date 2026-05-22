//src/api/brigades/brigades.api.ts

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../supabase";
import type { BrigadesDto } from "./brigades.dto";

export const getBrigadeApi = createApi({
  reducerPath: 'getBrigadesApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getBrigades: builder.query<BrigadesDto[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("brigades")
          .select("*");

        if (error) {
          return { error };
        }

        return { data: data ?? [] };
      }
    })
  })
});

export const {useGetBrigadesQuery} = getBrigadeApi