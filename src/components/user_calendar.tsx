import { useState } from "react";
import type { SortShift } from "../api/shifts/shifts.dto";
import type { PersonsDto } from "../api/persons/persons.dto";
import styles from '../styles/blocks/user_calendar.module.scss'
import { CardOneDay } from "./card_one_day";
import { useSelector } from "react-redux";
import { personsMap } from "../api/persons/persons.selector";
import { shiftMap } from "../api/shifts/shifts.selectors";

interface UserCalendarProps {
    personsMapProps: Map<string, PersonsDto[]>
    shiftsMapProps: Map<string, SortShift[]>
}

export function UserCalendar() {

    const personsMapProps = useSelector(personsMap)
    const shiftsMapProps = useSelector(shiftMap)

    const today = new Date();

    const [monthPlus] = useState(1);
    const [monthP] = useState(0);

    const daysMonth = new Date(
        today.getFullYear(),
        today.getMonth() + monthPlus,
        0
    ).getDate();

    const stringMonth = new Date(
        today.getFullYear(),
        today.getMonth() + monthP,
        1
    )

    const days = Array.from({ length: daysMonth }, (_, i) => {

        const dayWeek = new Date(
            stringMonth.getFullYear(),
            stringMonth.getMonth(),
            i + 1
        );

        const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(dayWeek);

        
        const stringDate = `${stringMonth.getFullYear()}-${String(stringMonth.getMonth()+1).padStart(2,'0')}-${String(dayWeek.getDate()).padStart(2,'0')}`;

        const shiftsForDay = shiftsMapProps.get(stringDate) ?? [];
        const activeShifts = shiftsForDay.filter(f => f.code !== 'О');

        const isWorkingDay = activeShifts.some(shift => {
            
            const people = personsMapProps.get(shift.brigade) ?? [];

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

                return !inVacation && !inSick;
            });
        });

        return {
            day: i + 1,
            weekDay: weekday,
            stringDate,
            isWorkingDay
        };
    });

    const arrWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const firstDayOfMonth = new Date(
        stringMonth.getFullYear(),
        stringMonth.getMonth(),
        1
    ).getDay();

    const startOffset = (firstDayOfMonth + 6) % 7;

    const emptyDays = Array.from({ length: startOffset });

    return(
        <section className={styles['section']}>

            <article className={styles['section__article']}>

                {arrWeek.map((day, i) => (
                    <div 
                        key={i}
                    >
                        {day}
                    </div>
                ))}

                {emptyDays.map((_, i) => (
                    <div 
                        key={`empty-${i}`}
                        className={styles['section__restBlock']} 
                    />
                ))}

                {days.map((day) => (
                    
                    <div
                        key={day.stringDate}
                        className={`${styles['section__oneDate']} ${
                            day.isWorkingDay
                                ? styles['section__oneDateWork']
                                : styles['section__restBlock']
                        }`}
                    >
                        <CardOneDay day={day} />
                    </div>
                
                ))}

            </article>

            <article>

                <div>
                    <span>Входные дни</span>
                    <span>10</span>
                </div>
                
                <div>
                    <span>Смены</span>
                    <span>10</span>
                </div>

                <div>
                    <span>Отработанные смены</span>
                    <span>10</span>
                </div>

                <div>
                    <span>Рабочих часов</span>
                    <span>10</span>
                </div>

                <div>
                    <span>Ночных часов</span>
                    <span>10</span>
                </div>

                <div>
                    <span>ЗП</span>
                    <span>10</span>
                </div>
            </article>

        </section>
    )
}