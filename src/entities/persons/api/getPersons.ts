//src/api/persons/persons.api.ts

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PersonsDto } from "../types/persons.dto";
import { supabase } from "../../../shared/api/supabase/client";

export const getPesonsApi = createApi({
    reducerPath: 'getPersonsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Persons'],
    endpoints: (builder) => ({

        getPesons: builder.query<PersonsDto[], void>({
            
            queryFn: async () => {

                console.log("🔥 GET PERSON REPLACEMENT ЗАПРОС");

                const { data, error } = await supabase
                .from("persons")
                .select(`
                    *,
                    brigade_name:brigades (
                        number_brigade
                    )
                `);

                console.log("🔥 GET PERSON REPLACEMENT DATA:", data);


                if (error) {
                    return { error };
                }

                return { data: data ?? [] };
            },

            providesTags: ['Persons']
        }),

        deletPersonBrigade: builder.mutation<void, string>({

            queryFn: async (personId) => {

                const { error } = await supabase
                    .from('persons')
                    .update({ brigade_id: null })
                    .eq('id', personId);

                if (error) {
                    return { error };
                }

                return { data: undefined };
            },

            invalidatesTags: ['Persons'],

        }),

        changePersonBrigade: builder.mutation<void, {idPerson: string, idClickNewBrigade: string}>({

            queryFn: async (obj) => {

                const {error} = await supabase
                    .from('persons')
                    .update({brigade_id: obj.idClickNewBrigade})
                    .eq('id', obj.idPerson);

                if(error){
                    return {error}
                }

                return {data: undefined}
            },

            invalidatesTags: ['Persons'],
        })
    })
})

export const {useGetPesonsQuery, useDeletPersonBrigadeMutation, useChangePersonBrigadeMutation} = getPesonsApi;