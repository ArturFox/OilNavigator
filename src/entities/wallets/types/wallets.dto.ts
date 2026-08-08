//src/api/wallet/wallet.dto.ts

export interface ExpensesDto {
    id: string,
    user_id: string,
    category_id: string,
    amount: number,
    created_at: string
}

export interface CategoriesDto {
    id: string,
    user_id: string,
    name: string,
    budget: number,
    created_at: string
    color?: string 
}

export interface InComeDto {
    id: string,
    user_id: string,
    name: string,
    created_at: string,
    color?: string
}

export interface EarningsDto {
    id: string,
    user_id: string,
    income_id: string,
    amount: number,
    created_at: string
}