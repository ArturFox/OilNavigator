import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../shared/api/supabase/client";
import type { PersonReplacementDto } from "../types/personReplacement.dto";

export const getPersonReplacementApi = createApi({
    reducerPath: "getPersonReplacementApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Replacement"],

    endpoints: (builder) => ({

        getPersonReplacement: builder.query<PersonReplacementDto[], void>({

            queryFn: async () => {

                const { data, error } = await supabase
                    .from("person_replacements")
                    .select("*");

                if (error) {
                    return { error };
                }

                console.log(data)

                return { data: data ?? [] };

            },

            providesTags: ["Replacement"],

        }),

    }),

});

export const {useGetPersonReplacementQuery} = getPersonReplacementApi;