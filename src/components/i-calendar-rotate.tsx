import { ArrowBigLeft, ArrowBigRight, OctagonAlert } from 'lucide-react'
import styles from '../styles/blocks/calendar.module.scss'
import { useDispatch } from 'react-redux';
import { changeDay } from '../store/new-store';
import { useEffect, useRef, useState } from 'react';
import type { PersonsDto } from '../api/persons/persons.dto';
import type { SortShift } from '../api/shifts/shifts.dto';

interface peopleMapeProps {
    peopleMap: Map<string, PersonsDto[]>
    arrSortDates: Map<string, SortShift[]>
    stringDateProps: string
}

export function ICalendarRotate ({peopleMap, arrSortDates, stringDateProps}: peopleMapeProps) {

    const dispatch = useDispatch();

    const today = new Date();
    const dateToday = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

    const [dayPlus] = useState(0);
    const [monthPlus, setMonthPlus] = useState(1);

    const daysMonth = new Date(
        today.getFullYear(),
        today.getMonth() + monthPlus,
        dayPlus
    ).getDate();



    const [monthP, setMonthP] = useState(0);

    const stringMonth = new Date(
        today.getFullYear(),
        today.getMonth() + monthP,
        1
    )
    const month = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(stringMonth);
    const monthToUpperCase = month[0].toUpperCase() + month.slice(1);
    
    const todayRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        todayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, []);

    const days = Array.from({ length: daysMonth }, (_, i) => {

        const dayWeek = new Date(
            stringMonth.getFullYear(),
            stringMonth.getMonth(),
            i + 1
        );

        const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(dayWeek);

        
        const stringDate = `${stringMonth.getFullYear()}-${String(stringMonth.getMonth()+1).padStart(2,'0')}-${String(dayWeek.getDate()).padStart(2,'0')}`;

        const shiftsForDay = arrSortDates.get(stringDate) ?? [];
        const activeShifts = shiftsForDay.filter(f => f.code !== 'О');

        const isFutureOrToday = stringDate >= dateToday;

        const hasProblem = isFutureOrToday && (
            
            activeShifts.some(shift => {

                const people = peopleMap.get(shift.brigade) ?? [];

                return people.some(person => {

                    const inVacation =
                        person.vacation_start &&
                        person.vacation_end &&
                        stringDate >= person.vacation_start &&
                        stringDate <= person.vacation_end;

                    const inSick =
                        person.sick_start &&
                        person.sick_end &&
                        stringDate >= person.sick_start &&
                        stringDate <= person.sick_end;


                    return inVacation || inSick;
                });

                }) || activeShifts.some(shift => {
                    const people = peopleMap.get(shift.brigade) ?? [];
                    return people.length < 7;
            })
        )

        const soonVacation = activeShifts.some(shift => {

            const people = peopleMap.get(shift.brigade) ?? [];

            return people.some(person => {

                const currentDay = new Date(stringDate);

                const sevenDayPlus = new Date(
                    currentDay.getFullYear(),
                    currentDay.getMonth(),
                    currentDay.getDate() + 7
                );

                const stringDateSeven = `${sevenDayPlus.getFullYear()}-${String(sevenDayPlus.getMonth()+1).padStart(2,'0')}-${String(sevenDayPlus.getDate()).padStart(2,'0')}`;                

                const vacationSoon = 
                    person.vacation_start &&
                    person.vacation_start > stringDate &&
                    person.vacation_start <= stringDateSeven;

                return vacationSoon
            })
        })

        return {
            day: i + 1,
            weekDay: weekday,
            hasProblem,
            stringDate,
            soonVacation
        };
    });

    function fn (day: string) {
        dispatch(changeDay(day))
    }

    function f () {
        setMonthP(monthP+1)
        setMonthPlus(monthPlus+1)
    }

    function g () {
        setMonthP(monthP-1)
        setMonthPlus(monthPlus-1)
    }

    return(

        <article className={styles["article"]}>

            <div className={styles["article__month"]}>
                <span>{monthToUpperCase}</span>
                <div className={styles["article__arrow"]}>
                    <span onClick={g}><ArrowBigLeft/></span>
                    <span onClick={f}><ArrowBigRight/></span>
                </div>
            </div>

            <div className={styles["article__blockDays"]}>

                {days.map((day, index) => {

                    const isSelected = stringDateProps === day.stringDate;
                    const isToday = dateToday === day.stringDate;
                
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
        day.hasProblem
            ? styles["article__exclamation_red"]
            : day.soonVacation
                ? styles["article__exclamation_yellow"]
                : styles["article__exclamation"]
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