import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from '../../supabase';
import type { CategoriesDto, ExpensesDto } from "./wallet.dto";

export const getWalletsApi = createApi({
    reducerPath: 'getWalletApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({

        getCategories: builder.query<CategoriesDto[], void>({
            
            queryFn: async () => {
                
                const { data, error} = await supabase.from('categories').select('*');

                if(error){
                    return {error: error.message}
                }

                return { data: data ?? [] };
            
            }

        }),

        getExpenses: builder.query<ExpensesDto[], string>({

            async queryFn(date) {

                const [year, month] = date.split('-').map(Number);

                const firstDay = `${year}-${String(month).padStart(2, '0')}-01`;
                const lastDay = `${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}`;


                const { data, error } = await supabase
                .from('expenses')
                .select('*')
                .gte('created_at', `${firstDay}T00:00:00`)
                .lte('created_at', `${lastDay}T23:59:59`);

                if (error) {
                    return { error: error.message };
                }

                return { data: data ?? [] };

            }

        }),
    })
})

export const { useGetCategoriesQuery, useGetExpensesQuery } = getWalletsApi;