//src/api/wallet/wallet.select.ts

import { createSelector } from "@reduxjs/toolkit";
import { getWalletsApi } from "../../api/getWallets";
import type { Categories, EarningsDto, ExpensesDto, InComeDto } from "../../types/wallets.dto";
import { mapperCategories } from "../mapper/mapperWallets";

export const categoriesMapper = createSelector(

    getWalletsApi.endpoints.getCategories.select(),

    (rusult): Categories[] => {

        const categories = rusult.data?.map((category) => mapperCategories(category)) ?? [];

        return categories;
    }
)

export const categoriesMap = createSelector(

    categoriesMapper,

    (categories) => {

        const map = new Map<string, Categories[]>()

        categories.forEach((e) => {

            if(!map.has(e.id)){
                map.set(e.id, [])
            }

            map.get(e.id)?.push(e)
            
        })

        return map
    }

)



export const incomeMap = createSelector(

    getWalletsApi.endpoints.getIncome.select(),

    (result) => {

        const map = new Map<string, InComeDto[]>()

        result.data?.forEach((e) => {

            if(!map.has(e.id)){
                map.set(e.id, [])
            }

            map.get(e.id)?.push(e)
            
        })

        return map
    }

)

export const expensesMap = (date: string) => createSelector(

    getWalletsApi.endpoints.getExpenses.select(date),

    (result) => {

        const arrSorted = [...(result.data ?? [])].sort(
            (a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        const map = new Map<string, ExpensesDto[]>();

        arrSorted.forEach((e) => {

            if(!map.has(e.category_id)){
                map.set(e.category_id, [])
            }

            map.get(e.category_id)?.push(e)
        })

        return map;

    }

)

export const earningsMap = ( selectedDate: string ) => createSelector(

    getWalletsApi.endpoints.getEarnings.select(selectedDate),

    (result) => {

        const arrSorted = [...(result.data ?? [])].sort(
            (a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        const map = new Map<string, EarningsDto[]>();

        arrSorted.forEach((e) => {

            if(!map.has(e.income_id)){
                map.set(e.income_id, [])
            }

            map.get(e.income_id)?.push(e)
        })

        return map;
    }
)


export const categoriestTotalSum = (selectedDate: string) => createSelector(

    expensesMap(selectedDate),

    (result) => {

        const totals = new Map<string, number>();

        result.forEach((expenses, categoryId) => {
            const sum = expenses.reduce((acc, curr) => acc + curr.amount, 0);
            totals.set(categoryId, sum)
        })

        return totals;
    }

)

export const incomeTotalSum = (selectedDate: string) => createSelector(

    earningsMap(selectedDate),

    (result) => {

        const totals = new Map<string, number>();

        result.forEach((earnings, incomeId) => {
            const sum = earnings.reduce((acc, curr) => acc + curr.amount, 0);
            totals.set(incomeId, sum)
        })

        return totals;
    }
)