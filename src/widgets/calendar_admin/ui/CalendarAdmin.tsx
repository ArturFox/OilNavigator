import { OctagonAlert } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { DayItem } from '../model/types';
import { generateCalendarDays } from '../model/lib/generateCalendarDays';
import styles from '../ui/calendarAdmin.module.scss';
import type { PersonsDto } from '../../../entities/persons/types/persons.dto';
import type { SortShift } from '../../../entities/shifts/types/shifts.dto';
import { changeDay } from '../../../app/store/store';


interface peopleMapeProps {
    personsMapProps: Map<string, PersonsDto[]>
    shiftsMapProps: Map<string, SortShift[]>
    dateStore: string;
    stringRealDateToday: string;
}

export function CalendarAdmin ({personsMapProps, shiftsMapProps, dateStore, stringRealDateToday}: peopleMapeProps) {

    const dispatch = useDispatch();
    
    const [userSelect, onUserSelect] = useState<string>(stringRealDateToday);
    
    const [y,m] = dateStore.split('-').map(Number);

    const dateStoreLocal: Date = new Date(y, m - 1, 1);

    const daysMonth: number = new Date(
        dateStoreLocal.getFullYear(),
        dateStoreLocal.getMonth() + 1,
        0
    ).getDate();

    const year: number = dateStoreLocal.getFullYear();
    const month: number = dateStoreLocal.getMonth();
    
    const days: DayItem[] = useMemo(() => {
        
        return generateCalendarDays({
            year,
            month,
            daysMonth,
            shiftsMapProps,
            personsMapProps,
            stringRealDateToday
        });

    }, [year, month, daysMonth, shiftsMapProps, personsMapProps])

    const todayRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {

        const [_, month] = stringRealDateToday.split('-').map(Number);

        if(m === month){
            onUserSelect(stringRealDateToday)
            dispatch(changeDay(stringRealDateToday))
        } else{
            onUserSelect(dateStore)
        }

        todayRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'center' 
        }); 
        
    }, [m]);

    return(

        <ul className={styles['calendar']}>

            {days.map((day, index) => (

                <li
                    key={index}
                    className={styles["calendar__item"]}
                >

                    <span className={styles["calendar__dayOfWeek"]}>

                        {day.weekDay}
                    
                    </span>

                    <button
                        type='button'
                        className={`
                            ${styles["calendar__button"]}
                            ${day.checkRealMonth
                                
                                ? userSelect === stringRealDateToday
                                    ? stringRealDateToday === day.stringDate
                                        ? styles["calendar__button--todaySelected"]
                                        : ''
                                    : userSelect === day.stringDate
                                        ? styles["calendar__button--todaySelected"]
                                        : stringRealDateToday === day.stringDate
                                            ? styles["calendar__button--todayNotSelected"]
                                            : ''

                                : dateStore === day.stringDate
                                    ? styles["calendar__button--todaySelected"]
                                    : ''
                            }
                        `}
                        onClick={() => {
                            dispatch(changeDay(day.stringDate));
                            onUserSelect(day.stringDate);
                        }}
                        aria-label={`День ${day.day}, ${day.weekDay}`}
                    >

                        <span 
                            className={styles["calendar__day"]}
                            ref={
                                
                                day.checkRealMonth 
                                    ? stringRealDateToday === day.stringDate
                                        ? todayRef
                                        : undefined
                                    : dateStore === day.stringDate
                                        ? todayRef
                                        : undefined
                            }
                        >
                            {day.day}
                        </span>

                        <span 
                            className={`
                                ${styles["calendar__exclamation"]}
                                ${
                                    day.hasProblem && day.soonVacation
                                        ? styles["calendar__exclamation--blink"]
                                        : day.hasProblem
                                            ? styles["calendar__exclamation--red"]
                                            : day.soonVacation
                                                ? styles["calendar__exclamation--yellow"]
                                                : ""
                                }
                            `}
                        >

                            <OctagonAlert/>

                        </span>
                    
                    </button>

                </li>
                
            ))}          

        </ul>
    )
}