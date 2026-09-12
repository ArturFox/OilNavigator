import { OctagonAlert } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import type { SortShift } from '../../../../../entities/shifts/types/shifts.dto';
import { changeDay } from '../../../../../app/store/store';
import styles from './CalendarAdmin.module.scss';
import { generateCalendarDays } from '../../model/generateCalendarDays';
import type { DayItem } from '../../types/dayItem.type';


interface Props {
    shiftsMap: Map<string, SortShift[]>
    dateStore: string;
    stringRealDateToday: string;
}

export function CalendarAdmin ({ shiftsMap, dateStore, stringRealDateToday}: Props) {

    const dispatch = useDispatch();
    
    const [userSelect, onUserSelect] = useState<string>(stringRealDateToday);
    
    const days: DayItem[] = generateCalendarDays({
        shiftsMap,
        stringRealDateToday,
    });

    const todayRef = useRef<HTMLSpanElement | null>(null);

    const [, month] = stringRealDateToday.split('-').map(Number);
    const [, m] = dateStore.split('-').map(Number);

    useEffect(() => {

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
        
    }, [month, m]);


    return(

        <section>

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
                                        day.hasRedAlarm && day.hasYellowAlarm
                                            ? styles["calendar__exclamation--blink"]
                                            : day.hasRedAlarm
                                                ? styles["calendar__exclamation--red"]
                                                : day.hasYellowAlarm
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

        </section>
    )
}