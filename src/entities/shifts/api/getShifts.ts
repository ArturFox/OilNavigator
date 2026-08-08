//src/api/shifts.api.ts

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AddShiftDto, ShiftDto } from "../types/shifts.dto";
import { supabase } from "../../../shared/api/supabase/client";

export const getShiftsApi = createApi({
    reducerPath: 'getShiftsApi',
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
        }),

        addShift: builder.mutation<ShiftDto, AddShiftDto>({

            queryFn: async (newShift) => {

                const { data, error } = await supabase
                .from('shift_pattern')
                .insert(newShift)
                .select()
                .single();

                if (error) return { error }

                return { data }

            },

            invalidatesTags: ['Shifts']

        })
    })
})

export const {useGetShiftsQuery, useAddShiftMutation} = getShiftsApi