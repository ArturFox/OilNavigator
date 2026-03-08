//src/api/shifts.api.ts

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../supabase";
import type { ShiftDto } from "./shifts.dto";

export const getShiftsApi = createApi({
    reducerPath: 'getShiftPattern',
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Shifts"],
    endpoints: (builder) => ({
        
        getShifts: builder.query<ShiftDto[], void>({

            queryFn: async () => {

                const {data, error} = await supabase.from("shift_pattern").select("*");

                if(error){
                    return {error}
                }

                return { data: data ?? []};
            },

            providesTags: ["Shifts"]
        })
    })
})

export const {useGetShiftsQuery} = getShiftsApi