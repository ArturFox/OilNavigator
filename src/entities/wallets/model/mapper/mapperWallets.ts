import type { Categories, CategoriesDto, Earnings, EarningsDto, Expenses, ExpensesDto, InCome, InComeDto } from "../../types/wallets.dto";

export function mapperExpenses (expense: ExpensesDto):Expenses {

    return {
        id: expense.id,
        userId: expense.user_id,
        categoryId: expense.category_id,
        amount: expense.amount,
        createdAt: expense.created_at
    }
}

export function mapperCategories (category: CategoriesDto): Categories {

    return {
        id: category.id,
        userId: category.user_id,
        name: category.name,
        budget: category.budget,
        createdAt: category.created_at,
        color: category.color
    }
}

export function mapperInCome (inCome: InComeDto): InCome {

    return {
        id: inCome.id,
        userId: inCome.user_id,
        name: inCome.name,
        createdAt: inCome.created_at,
        color: inCome.color
    }
}

export function mapperEarnings (earnings: EarningsDto): Earnings {

    return {
        id: earnings.id,
        userId: earnings.user_id,
        incomeId: earnings.income_id,
        amount: earnings.amount,
        createdAt: earnings.created_at
    }
}