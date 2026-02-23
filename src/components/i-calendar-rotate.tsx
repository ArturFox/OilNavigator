import { OctagonAlert } from 'lucide-react'
import styles from '../styles/blocks/calendar.module.scss'
import type { BrigadeShift, Person } from '../types/schedule';
import { useDispatch } from 'react-redux';
import { changeDay } from '../store/new-store';
import { useState } from 'react';

interface peopleMapeProps {
    peopleMap: Map<string, Person[]>
    arrSortDates: Map<string, BrigadeShift[]>
    stringDateProps: string
}

export function ICalendarRotate ({peopleMap, arrSortDates, stringDateProps}: peopleMapeProps) {

    const dispatch = useDispatch();

    const today = new Date();



    const dateToday= new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    )

    const yearToday = dateToday.getFullYear();
    const monthToday = dateToday.getMonth();
    const dayToday = dateToday.getDate();

    const strigDateToday = `${String(dayToday).padStart(2,'0')}.${String(monthToday + 1).padStart(2,'0')}.${yearToday}`;




    const [dayPlus, setDayPlus] = useState(0);
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




    const days = Array.from({ length: daysMonth }, (_, i) => {

        const dayWeek = new Date(
            stringMonth.getFullYear(),
            stringMonth.getMonth(),
            i + 1
        );

        const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(dayWeek);

        const year = new Date(
            stringMonth.getFullYear(),
            stringMonth.getMonth() + monthP,
            1
        ).getFullYear();

        const month = new Date(
            stringMonth.getFullYear(),
            stringMonth.getMonth(),
            1
        ).getMonth();

        const stringDate = `${String(i + 1).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}`;
        console.log(stringDate)

        const shiftsForDay = arrSortDates.get(stringDate) ?? [];
        const activeShifts = shiftsForDay.filter(f => f.code !== 'О');

        const hasProblem = activeShifts.some(shift => {

            const people = peopleMap.get(shift.brigade) ?? [];

            return people.some(person => {

                const todayDate = new Date(
                    stringMonth.getFullYear(),
                    stringMonth.getMonth(),
                    i+1
                );

                const parseDate = (dateStr?: string) => {
                    if (!dateStr) return null;
                    const [day, month, year] = dateStr.split('.').map(Number);
                    return new Date(year, month - 1, day);
                };

                const startVacation = parseDate(person.vacationStart);
                const endVacation = parseDate(person.vacationEnd);
                const startSick = parseDate(person.sickStart);
                const endSick = parseDate(person.sickEnd);

                const inVacation = startVacation && endVacation &&
                    todayDate >= startVacation && todayDate <= endVacation;

                const inSick = startSick && endSick &&
                    todayDate >= startSick && todayDate <= endSick;

                return inVacation || inSick;
            });

        }) || activeShifts.some(shift => {
            const people = peopleMap.get(shift.brigade) ?? [];
            return people.length < 7;
        });

        return {
            day: i + 1,
            weekDay: weekday,
            hasProblem,
            stringDate
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
                <span onClick={g}>Назад</span>
                <span onClick={f}>Следующий</span>
            </div>

            <div className={styles["article__blockDays"]}>

                {days.map((day, index) => {

                    const isSelected = stringDateProps === day.stringDate;
                    const isToday = strigDateToday === day.stringDate;
                
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

                                    <span className={styles["article__day"]}>{day.day}</span>
                                    <span className={
                                        day.hasProblem
                                            ? styles["article__exclamation_red"]
                                            : styles["article__exclamation"]
                                    }><OctagonAlert/></span>
                            
                            </div>

                        </div>
                    )
                   
                })}   
            </div>         

        </article>
    )
}