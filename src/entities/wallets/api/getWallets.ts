//src/api/wallet/wallet.api.ts

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CategoriesDto, EarningsDto, ExpensesDto, InComeDto } from "../types/wallets.dto";
import { supabase } from "../../../shared/api/supabase/client";

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

        getIncome: builder.query<InComeDto[], void>({
            
            queryFn: async () => {
                
                const { data, error} = await supabase.from('income').select('*');

                if(error){
                    return {error: error.message}
                }

                return { data: data ?? [] };
            
            }

        }),

        getEarnings: builder.query<EarningsDto[], string>({

            async queryFn(date) {

                const [year, month] = date.split('-').map(Number);

                const firstDay = `${year}-${String(month).padStart(2, '0')}-01`;
                const lastDay = `${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}`;

                const { data, error } = await supabase
                .from('earnings')
                .select('*')
                .gte('created_at', `${firstDay}T00:00:00`)
                .lte('created_at', `${lastDay}T23:59:59`);

                if(error) {
                    return {error: error.message};
                }

                return { data: data ?? [] };

            }

        }),
    })
})

export const { useGetCategoriesQuery, useGetExpensesQuery, useGetIncomeQuery,  useGetEarningsQuery } = getWalletsApi;