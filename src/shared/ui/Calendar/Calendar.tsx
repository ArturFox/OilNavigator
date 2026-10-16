import type { Brigade } from '@/entities/brigades/types/brigades.dto';
import styles from './Calendar.module.scss';
import type { Shift, SortShift } from '@/entities/shifts/types/shifts.dto';
import { WeekDays } from '@/shared/ui/Calendar/widgets/WeekDays/WeekDays';
import { CalendarDayFactory } from '@/shared/ui/Calendar/widgets/CalendarDay/CalendarDay';
import React from 'react';

interface Props {
    selectBrigade: Brigade[];
    entries: [string, SortShift[]][];
    todayDate: string;
    uniqueObjectArr: Shift[];
    date: Date;
}

export function Calendar (
    {
        selectBrigade,
        entries,
        todayDate,
        uniqueObjectArr,
        date
    }:Props
) { 

    // Рассчитываем количество пустых ячеек 
    // перед первым днём месяца, чтобы неделя начиналась с понедельника
    let pastEmptyDaysCount = 0;
        
    const firstDayIndex: number = date.getDay(); 

    pastEmptyDaysCount = firstDayIndex === 0
    ? 6 
    : firstDayIndex - 1;
    

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const pastEmptyDays: string[] = Array.from(
        { length: pastEmptyDaysCount }, 
        (_, index) => (daysInMonth - pastEmptyDaysCount + index + 1).toString()
    );


    // Рассчитываем количество пустых ячеек 
    // после последнего дня месяца, чтобы календарная сетка заканчивалась в воскресенье
    let futureEmptyDaysCount = 0;

    const year = date.getFullYear();
    const month = date.getMonth();

    const lastDayIndex = new Date(year, month + 1, 0).getDay();

    futureEmptyDaysCount = lastDayIndex === 0
    ? 0
    : 7 - lastDayIndex

    

    const futureEmptyDays: string[] = Array.from(
        { length: futureEmptyDaysCount},
        (_, index) => (index + 1).toString()
    );

    //
    const filteredEntries = entries.map(([date, shifts]) => [
        date,
        shifts.filter((shift) => {

            if (shift.code === 'О') return false;

            const isSelected: boolean = 
                selectBrigade.length === 0 ||
                selectBrigade.some(
                    (brigade) => brigade.id === shift.brigade.id
                )
            ;

            return isSelected;
        })
    ] as [string, SortShift[]]);

    const filterUniqueShiftWithOutRest = uniqueObjectArr
        .filter((uniqueShift) => uniqueShift.code !== 'О')
    ;

    const sortedShift: [string, (SortShift | null)[]][] = filteredEntries.map(([date, shifts]) => [
        date,
        filterUniqueShiftWithOutRest.map((uniqueShift) =>
            shifts.find((shift) => {

                return (
                    shift.startTime === uniqueShift.start_time?.slice(0, 5) &&
                    shift.endTime === uniqueShift.end_time?.slice(0, 5)
                );
            }) ?? null
        ),
    ]);

    return(

        <section
            className={styles['calendar']}
        >  

            <WeekDays/>

            <ul
                className={styles['calendar__days']}
            >

                {pastEmptyDays.map((day, index) => (

                    <React.Fragment key={index}>

                        {CalendarDayFactory.pastOrFuture({date: day})}
                        
                    </React.Fragment>

                ))}

                {sortedShift.map(([date, shifts]) => {

                    const testShifts = date === '2026-10-28' ? [] : shifts;

                    return (
                        <React.Fragment key={date}>
                            {testShifts.some((shift) => shift !== null)
                                ? CalendarDayFactory.filled({
                                    scheduleDate: date,
                                    todayDate: todayDate,
                                    shifts: testShifts,
                                    todayDateOrPast: date === todayDate,
                                    date: date
                                })
                                : CalendarDayFactory.empty({ 
                                    date: date,
                                    todayDate: todayDate
                                })
                            }
                        </React.Fragment>
                    );
                })}

                {futureEmptyDays.map((day, index) => (

                    <React.Fragment key={index}>

                        {CalendarDayFactory.pastOrFuture({date: day})}
                        
                    </React.Fragment>

                ))}

            </ul>
            
        </section>
    )
}