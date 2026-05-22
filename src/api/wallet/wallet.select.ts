import { createSelector } from "@reduxjs/toolkit";
import { getWalletsApi } from "./wallet.api";
import type { CategoriesDto, ExpensesDto } from "./wallet.dto";

export function categoriesMap () {
    
    return createSelector(

        getWalletsApi.endpoints.getCategories.select(),

        (result) => {

            const map = new Map<string, CategoriesDto[]>()

            result.data?.forEach((e) => {

                if(!map.has(e.id)){
                    map.set(e.id, [])
                }

                map.get(e.id)?.push(e)
                
            })

            return map
        }

    )

}


export function expensesMap (selectedDate: string) {

    return createSelector(

        getWalletsApi.endpoints.getExpenses.select(selectedDate),

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

}


export function categoriestTotalSum (selectedDate: string) {

    return createSelector(

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
    
}