import { OctagonAlert } from 'lucide-react'
import styles from './CalendarDays.module.scss';
import type { CalendarDayProps } from '@/shared/ui/Calendar/CalendarDay/types/typesCalendarDay';

export function CalendarDay (
    {  
        weekDay,
        checkRealMonth,
        stringDate,
        isFutureDate,
        isPastDate,
        isToday,
        day,
        hasRedAlarm,
        hasYellowAlarm,

        dateStore, 
        stringRealDateToday,

        selectedDateRef,

        isUserSelectDate,
        selectDate
    }: CalendarDayProps
) {

    return(

        <li
            className={styles["calendar__item"]}
        >

            <span className={styles["calendar__dayOfWeek"]}>

                {weekDay}
            
            </span>

            <button
                type='button'
                className={`
                    ${styles["calendar__button"]}
                    ${checkRealMonth
                        
                        ? isUserSelectDate === stringRealDateToday

                            ? stringRealDateToday === stringDate
                                ? styles["calendar__button--todaySelected"]
                                : ''

                            : isUserSelectDate === stringDate

                                ? isFutureDate

                                    ? styles["calendar__button--isFutureDate"]

                                    : isPastDate
                                        ? styles["calendar__button--isPastDate"]
                                        : ''

                                : isToday
                                    ? styles["calendar__button--isToday"]
                                    : ''

                        : dateStore === stringDate
                            ? styles["calendar__button--todaySelected"]
                            : ''
                    }
                `}
                onClick={() => {
                    selectDate(stringDate)
                }}
            >

                <span 
                    className={styles["calendar__day"]}
                    ref={
                        
                        checkRealMonth 
                            ? dateStore === stringDate
                                ? selectedDateRef
                                : undefined
                            : dateStore === stringDate
                                ? selectedDateRef
                                : undefined
                    }
                >
                    {day}
                </span>

                <span 
                    className={`
                        ${styles["calendar__exclamation"]}
                        ${(hasRedAlarm && hasYellowAlarm) && styles["calendar__exclamation--blink"]}
                        ${(hasRedAlarm && !hasYellowAlarm) && styles["calendar__exclamation--red"]}
                        ${(!hasRedAlarm && hasYellowAlarm) && styles["calendar__exclamation--yellow"]}
                    `}
                >

                    <OctagonAlert/>

                </span>
            
            </button>

        </li>
                    
    )
}