import { useSelector } from "react-redux"
import { sortShiftMap } from "../../../Home/adminPage/model/selectorsAdminPage"
import styles from './Calendar.module.scss';
import type { SortShift } from "../../../../entities/shifts/types/shifts.dto";

export function Calendar () {

    const shiftMap: Map<string, SortShift[]> = useSelector(sortShiftMap);

    const entries = [...shiftMap.entries()];

    let emptyDaysCount = 0;

    if (entries.length > 0) {
        
        const firstDateStr: string = entries[0][0]; 
        const firstDate: Date = new Date(firstDateStr);
              
        const firstDayIndex: number = firstDate.getDay(); 

        emptyDaysCount = firstDayIndex === 0 
        ? 6 
        : firstDayIndex - 1;
    }

    const emptyDays = Array.from({ length: emptyDaysCount });

    return(

        <section
            className={styles['calendar']}
        >

            <ul
                className={styles['calendar__daysOfTheWeek']}
            >

                {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((dayWeek, index) => (

                    <li
                        key={`dayWeek-${index}`}
                        className={`
                            ${styles['calendar__daysOfTheWeek-dayWeek']}
                            ${(dayWeek === 'сб' || dayWeek === 'вс') && 
                                styles['calendar__daysOfTheWeek-dayWeek--weekend']
                            }
                        `}
                    >
                        {dayWeek}
                    </li>

                ))}

            </ul>

            <ul
                className={styles['calendar__days']}
            >

                {emptyDays.map((_, index) => (

                    <li 
                        key={`empty-${index}`} 
                        className={styles['calendar__days-day--empty']}
                    />

                ))}

                {[...shiftMap.entries()].map(([_, shifts]) => (

                    <li
                        className={styles['calendar__days-day']}
                    >

                        <span
                            className={styles['calendar__days-date']}
                        >

                            {shifts[0].russianDate.slice(0,2)}

                        </span>

                        <ul
                            className={styles['calendar__days-brigades']}
                        >
                            
                            {shifts.map((shift) => {

                                if(shift.code === 'О'){
                                    return null
                                }

                                return(
                                    <li
                                        className={styles['calendar__days-brigades-brigade']}
                                        style={{background: shift.color}}
                                    >
                                        {shift.brigade.number_brigade}
                                    </li>
                                )
                            })}

                        </ul>
                    </li>
                ))}

            </ul>

        </section>
    )
}