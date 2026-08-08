//src/api/brigades/brigades.api.ts

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../shared/api/supabase/client";
import type { BrigadesDto, CreateBrigadeDto } from "../types/brigades.dto";


export const getBrigadeApi = createApi({
  reducerPath: 'getBrigadesApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Brigades'],
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
      },

      providesTags: ['Brigades']
    }),

    addBrigade: builder.mutation<BrigadesDto[], CreateBrigadeDto>({

      queryFn: async (newUserSend) => {

        const { data, error } = await supabase
          .from('brigades')
          .insert([newUserSend])
          .select()

        if (error) return { error }

        return { data }

      },

      invalidatesTags: ['Brigades']
      
    }),

    deletBrigade: builder.mutation({
      queryFn: async (id: string) => {
        const { data, error } = await supabase
        .from('brigades')
        .delete()
        .eq('id', id)
        .select();

        if(error) return { error };

        return { data };

      },

      invalidatesTags: ['Brigades'],
    })

  })
});

export const {useGetBrigadesQuery, useAddBrigadeMutation, useDeletBrigadeMutation} = getBrigadeApi