import { OctagonAlert } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';
import type { PersonsDto } from '../../../api/persons/persons.dto';
import type { SortShift } from '../../../api/shifts/shifts.dto';
import { changeDay, type RootState } from '../../../store/new-store';
import type { DayItem } from '../model/types';
import { generateCalendarDays } from '../model/lib/generateCalendarDays';
import styles from '../../../styles/blocks/calendar.module.scss';


interface peopleMapeProps {
    personsMapProps: Map<string, PersonsDto[]>
    shiftsMapProps: Map<string, SortShift[]>
}

export function CalendarAdmin ({personsMapProps, shiftsMapProps}: peopleMapeProps) {

    const dispatch = useDispatch();

    const realDateToday: Date = new Date();
    const stringRealDateToday: string = `${realDateToday.getFullYear()}-${String(realDateToday.getMonth()+1).padStart(2, '0')}-${String(realDateToday.getDate()).padStart(2,'0')}`;
    
    const dateStore: string = useSelector((state: RootState) => state.date.day);
    
    const [y,m,d]: number[] = dateStore.split('-').map(Number);

    const dateStoreLocal: Date = new Date(y, m - 1, d);

    const daysMonth: number = new Date(
        dateStoreLocal.getFullYear(),
        dateStoreLocal.getMonth() + 1,
        0
    ).getDate();

    const year: number = dateStoreLocal.getFullYear();
    const month: number = dateStoreLocal.getMonth();
    
    const days: DayItem[] = useMemo(() => {
        console.log(`Я вызвался`)
        return generateCalendarDays({
            year,
            month,
            daysMonth,
            shiftsMapProps,
            personsMapProps
        });
    }, [year, month, daysMonth, shiftsMapProps, personsMapProps])

    function fn (day: string): void {
        dispatch(changeDay(day))
    }

    const todayRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        todayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, []);

    return(

        <article className={styles["article"]}>

            <div className={styles["article__blockDays"]}>

                {days.map((day, index) => {

                    const isSelected = dateStore === day.stringDate;
                    
                    const isToday = stringRealDateToday === day.stringDate;
                
                    return(
                        <div 
                            key={index}
                            className={styles["article__block"]}
                        >

                            <span className={styles["article__dayOfWeek"]}>

                                {day.weekDay}
                            
                            </span>

                            <div 
                                className={`
                                    ${styles["article__dayAndIcone"]}
                                    ${isSelected 
                                        ? styles["article__dayAndIcone_alarm"] 
                                        : isToday 
                                            ? styles["article__dayAndIcone_today"] 
                                            : ''
                                    }
                                `}

                                onClick={() => fn(day.stringDate)}
                            >

                                    <span 
                                        className={styles["article__day"]}
                                        ref={isToday ? todayRef : undefined}
                                    >
                                            {day.day}
                                    </span>

                                    <span 
                                        className={
                                            day.hasProblem && day.soonVacation
                                                ? styles["article__exclamation_redAndYellow"]
                                                : day.hasProblem
                                                    ? styles["article__exclamation_red"]
                                                    : day.soonVacation
                                                        ? styles["article__exclamation_yellow"]
                                                        : styles['article__exclamation']
                                        }
                                    >
                                        <OctagonAlert/>
                                    </span>
                            
                            </div>

                        </div>
                    )
                   
                })}   
            </div>         

        </article>
    )
}