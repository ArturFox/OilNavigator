import { createElement } from 'react';
import styles from './CalendarBrigadeBadge.module.scss';

interface FilledCard {
    bg: string;
    brigadeNumber: number;
}


export class CalendarBrigadeBadgeFactory {

    static empty() {
        return createElement(EmptyCalendarBrigadeBadge);
    }

    static filled(props: FilledCard) {
        return createElement(FilledCalendarBrigadeBadge, props);
    }
}

function FilledCalendarBrigadeBadge (
    {
        bg,
        brigadeNumber
    }: FilledCard
) {

    return (

        <li
            className={styles['calendarBrigadeBadge']}
            style={{ background: bg }}
        >
            {brigadeNumber}
        </li>
        
    )
}

function EmptyCalendarBrigadeBadge () {

    return (

        <li
            className={styles['calendarBrigadeBadge--empty']}
        />
        
    );

}