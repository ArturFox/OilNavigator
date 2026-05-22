interface CardOneDayProps {
    day: {
        day: number
        weekDay: string
        stringDate: string
        isWorkingDay: boolean
    }
}

export function CardOneDay({ day }: CardOneDayProps) {

    return(


        <>

            <div>{day.day}</div>
            <div>Часов-8</div>
            <div>Бр-2</div>

        </>
    )
}