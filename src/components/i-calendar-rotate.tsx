import { OctagonAlert } from 'lucide-react'
import styles from '../styles/blocks/calendar.module.scss'
import { useDispatch } from 'react-redux'
import { addDate } from '../store/new-store'

interface BrigadeShift {
  id: string
  code: string
  label: string
  color: string
  startDate: string
  brigade: string
  startTime: string | null
  endTime: string | null
}

interface BrigadeDropdownProps {

  arrSortDates: BrigadeShift[]
  dateS: string
  
}

export function ICalendarRotate ({arrSortDates, dateS}: BrigadeDropdownProps) {

    const dispatch = useDispatch();

    const nowDate = new Date();

    const monthNow = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        1
    ).getDay();

    const startOffset = (firstDayOfMonth + 6) % 7;


    const todayNumber = nowDate.getDate();

    const prevMonthDays = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        0
    ).getDate();
    console.log(prevMonthDays)

    const nextMonthDays = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() + 2,
        0
    ).getDate();
    console.log(nextMonthDays)

    const totalCells = startOffset + monthNow;

    const extraNextDays = (7 - (totalCells % 7)) % 7;


    const days = Array.from({ length: totalCells + extraNextDays }, (_, i) => {

        let dayNumber;
        let isCurrentMonth = true;

        if (i < startOffset) {

            dayNumber = prevMonthDays - startOffset + i + 1;
            isCurrentMonth = false;

        } else if (i < startOffset + monthNow) {
        
            dayNumber = i - startOffset + 1;

        } else {
            
            dayNumber = i - (startOffset + monthNow) + 1;
            isCurrentMonth = false;
        }
        
        const date = new Date(
            nowDate.getFullYear(),
            isCurrentMonth ? nowDate.getMonth() : i < startOffset
            ? nowDate.getMonth() - 1
            : nowDate.getMonth() + 1,
        dayNumber
        );

        const formattedDate = `${String(date.getDate()).padStart(2,'0')}.${String(date.getMonth()+1).padStart(2,'0')}.${date.getFullYear()}`;

        const shiftss = arrSortDates.filter(shift => shift.startDate === formattedDate);

        const shifts = shiftss.filter(sort => sort.code !== 'О')

        return {
            day: dayNumber,
            dayOfWeek: date.toLocaleDateString('ru-RU', { weekday: 'short' }),
            currentMonth: isCurrentMonth,
            formattedDate,
            shifts
        };
    });


    function fn (arr: BrigadeShift[]) {
       
        const date = arr[0].startDate;

        dispatch(addDate(date))

    }


const todayFormatted = `${String(nowDate.getDate()).padStart(2,'0')}.${String(nowDate.getMonth()+1).padStart(2,'0')}.${nowDate.getFullYear()}`;

    

    return(

        <article className={styles["article"]}>

            {days.map((day, index) => (
                <div 
                    key={index}
                    className={styles["article__block"]}
                    onClick={() => fn(day.shifts)}
                >

                    <span className={styles["article__dayOfWeek"]}>
                        {day.dayOfWeek}
                    </span>

                    <div 
                        className={`${styles.article__blockDayAndExclamation} 
                        ${
                            (dateS && dateS === day.formattedDate) ||
                            (!dateS && day.formattedDate === todayFormatted)
                            ? styles['article__blockDayAndExclamation_open']
                            : ''
                        }`}
                    >


                            <span className={styles["article__day"]}>{day.day}</span>
                            <span className={styles["article__exclamation"]}><OctagonAlert/></span>
                    
                    </div>

                </div>
            ))}            

        </article>
    )
}