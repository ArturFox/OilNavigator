//src/api/persons/persons.api.ts

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../supabase";
import type { PersonsDto } from "./persons.dto";

export const getPesonsApi = createApi({
    reducerPath: 'getBrigadesApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({

        getPesons: builder.query<PersonsDto[], void>({
            
            queryFn: async () => {
                const { data, error } = await supabase.from("persons").select("*")
                if (error) {
                    return { error };
                }

                return { data: data ?? [] };
            }
        })
    })
})

export const {useGetPesonsQuery} = getPesonsApi;