import styles from './WeekDays.module.scss';

export function WeekDays () {

    return (

        <ul
            className={styles['weekDays']}
        >

            {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((dayWeek, index) => (

                <li
                    key={`weekDays-${index}`}
                    className={`
                        ${styles['weekDays_dayWeek']}
                        ${(dayWeek === 'сб' || dayWeek === 'вс') && 
                            styles['weekDays_dayWeek--weekend']
                        }
                    `}
                >
                    {dayWeek}
                </li>

            ))}

        </ul>
        
    )
}