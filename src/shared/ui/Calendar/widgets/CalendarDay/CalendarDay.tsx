import type { SortShift } from '@/entities/shifts/types/shifts.dto';
import styles from './CalendarDay.module.scss';
import React, { createElement } from 'react';
import { CalendarDateFactory } from '@/shared/ui/Calendar/widgets/CalendarDate/CalendarDate';
import { CalendarBrigadeBadgeFactory } from '@/shared/ui/Calendar/widgets/CalendarBrigadeBadge/CalendarBrigadeBadge';

interface PastOrFutureCard {
    date: string
};

interface EmptyCard {
    date: string;
    todayDate: string;
};

interface FilledCard {
    scheduleDate: string;
    todayDate: string;
    shifts: (SortShift | null)[];
    todayDateOrPast: boolean;
    date: string
}

export class CalendarDayFactory {

    static pastOrFuture(props: PastOrFutureCard) {
        return createElement(PastOrFutureCalendarDay, props);
    }

    static filled(props: FilledCard) {
        return createElement(FilledCalendarDay, props);
    }

    static empty(props: EmptyCard) {
        return createElement(EmptyCalendarDay, props);
    }
}

function FilledCalendarDay (
    {
        scheduleDate,
        todayDate,
        shifts,
        todayDateOrPast,
        date
    }:FilledCard
) {

    return (

        <li
            className={`
                ${styles['calendarDay']}
                ${scheduleDate >= todayDate && styles['calendarDay--isFuture']}
            `}
        >

            {
                CalendarDateFactory.filled({
                    todayDateOrPast: todayDateOrPast,
                    dateDay: date.slice(8, 10)
                })
            }

            <ul
                className={styles['calendar__days-brigades']}
            >
                
                {shifts.map((shift, index) => (

                    <React.Fragment key={index}>

                        {shift === null

                            ? CalendarBrigadeBadgeFactory.empty()

                            : CalendarBrigadeBadgeFactory.filled({

                                bg: shift.color,
                                brigadeNumber: shift.brigade.number_brigade,

                            })}

                    </React.Fragment>

                ))}

            </ul>

        </li>

    )
    
}

function PastOrFutureCalendarDay (
    {
        date
    }: PastOrFutureCard
) {
    return (

        <li
            className={`
                ${styles['calendarDay']}
                ${styles['calendarDay--empty']}
            `}
        >

            {CalendarDateFactory.empty({dateDay: date.slice(0,2)})}

        </li>
    )
}

function EmptyCalendarDay (
    {
        date,
        todayDate,
    }: EmptyCard
) {

    return (

        <li
            className={`
                ${styles['calendarDay']}
                ${date >= todayDate && styles['calendarDay--isFuture']}
            `}
        >

            {CalendarDateFactory.empty({dateDay: date.slice(8, 10)})}

        </li>
        
    )
}