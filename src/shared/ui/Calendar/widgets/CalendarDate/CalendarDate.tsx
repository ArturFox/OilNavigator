import { createElement } from 'react';
import styles from './CalendarDate.module.scss';

interface EmptyCard {
    dateDay: string;
}

interface FilledCard {
    todayDateOrPast: boolean
    dateDay: string;
}

export class CalendarDateFactory {

    static empty(props: EmptyCard) {
        return createElement(EmptyCalendarDate, props)
    }

    static filled(props: FilledCard) {
        return createElement(FilledCalendarDate, props)
    }
    
}

function FilledCalendarDate (
    {
        todayDateOrPast,
        dateDay
    }: FilledCard
) {

    return (
        <span
            className={`
                ${styles['calendarDate']}
                ${todayDateOrPast
                    ? styles['calendarDate--todayDate']
                    : styles['calendarDate--isPast']
                }
            `}
        >

            {dateDay}

        </span>
    )
}

function EmptyCalendarDate(
    {
        dateDay
    }: EmptyCard
) {
    return (

        <span
            className={`
                ${styles['calendarDate']}
            `}
        >

            {dateDay}

        </span>

    )

}