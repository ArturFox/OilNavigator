import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../shared/api/supabase/client";
import type { DefaultScheduleTemplatesDto } from "../types/defaultScheduleTemplates.dto";

export const getDefaultScheduleTemplatesApi = createApi({

    reducerPath: 'getDefaultScheduleTemplates',

    baseQuery: fakeBaseQuery(),

    endpoints: (builder) => ({

        getDefaultScheduleTemplates: builder.query<DefaultScheduleTemplatesDto[], void>({

            queryFn: async () => {
    const { data: userData, error: userError } =
        await supabase.auth.getUser();

    console.log("USER:", userData.user?.id);
    console.log("USER ERROR:", userError);

    const { data, error } = await supabase
        .from("default_schedule_templates")
        .select("*");

    console.log("TEMPLATES:", data);
    console.log("TEMPLATES ERROR:", error);

    if (error) {
        return { error };
    }

    return { data: data ?? [] };
}
        })
    })
})

export const {useGetDefaultScheduleTemplatesQuery} = getDefaultScheduleTemplatesApi;