import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { CalendarCheck, CalendarClock, Highlighter, UserPen } from 'lucide-react';
import type { UserRole } from '../../../../features/auth/model/auth.types';
import { BottomSheetModal } from '../../../../pages/AdminScheduleChange/widgets/BottomSheetModal/BottomSheetModal';

interface Props {
    isCalendar: boolean;
    isProfile: boolean;
    isScheduleChange: boolean;
    isCalendarBrigadeChange: boolean;
    role: UserRole;
}

export function Footer (
    {
        isCalendar,
        isProfile,
        isScheduleChange,
        isCalendarBrigadeChange,
        role
    }: Props
) {

    return (
        <footer
            className={styles["footer"]}
        >

            <section className={styles["mainLayout__bottomBar"]}>
            
                <nav 
                aria-label="Нижняя навигация"
                >

                <ul className={styles["mainLayout__navigateList"]}>

                    <li
                    className={`
                        ${styles["mainLayout__navigateItem"]}
                        ${isCalendar && styles["mainLayout__navigateItem--active"]}  
                    `}
                    >

                    <Link
                        to="/"
                        className={`
                        ${styles["mainLayout__link"]}
                        ${isCalendar && styles["mainLayout__link--active"]}  
                        `}
                        aria-label="Календарь"
                        aria-current={isCalendar ? "page" : undefined}
                        
                    >

                        <CalendarCheck
                        className={isCalendar 
                            ? styles["mainLayout__icone"] 
                            : ""
                        }
                        aria-hidden="true"
                        
                        />

                    </Link>

                    </li>

                    {role === 'admin' && (
                    <li
                        className={`
                        ${styles["mainLayout__navigateItem"]}
                        ${isCalendarBrigadeChange && styles["mainLayout__navigateItem--active"]}  
                        `}
                    >

                        <Link
                        to="/calendarBrigadeChange"
                        className={`
                            ${styles["mainLayout__link"]}
                            ${isCalendarBrigadeChange && styles["mainLayout__link--active"]}  
                        `}
                        aria-label="Изменить расписание бригад"
                        aria-current={isCalendarBrigadeChange ? "page" : undefined}
                        >
                        
                        <CalendarClock
                            className={isCalendarBrigadeChange
                            ? styles["mainLayout__icone"] 
                            : ""
                            } 
                            aria-hidden="true"
                        />
                        </Link>

                    </li>
                    )}

                    {role === 'admin' && (
                    <li
                        className={`
                        ${styles["mainLayout__navigateItem"]}
                        ${isScheduleChange && styles["mainLayout__navigateItem--active"]}  
                        `}
                    >

                        <Link 
                        to="/scheduleChangePage"
                        className={`
                            ${styles["mainLayout__link"]}
                            ${isScheduleChange && styles["mainLayout__link--active"]}  
                        `}
                        aria-label="Изменить расписание"
                        aria-current={isScheduleChange ? "page" : undefined}
                        >

                        <Highlighter
                            className={isCalendar 
                            ? styles["mainLayout__icone"] 
                            : ""
                            } 
                            aria-hidden="true"
                        />

                        </Link>

                    </li>
                    )}

                    

                    <li
                    className={`
                        ${styles["mainLayout__navigateItem"]}
                        ${isProfile && styles["mainLayout__navigateItem--active"]}  
                    `}
                    >

                    <Link
                        to="/profile"
                        className={`
                        ${styles["mainLayout__link"]}
                        ${isProfile && styles["mainLayout__link--active"]}  
                        `}
                        aria-label="Профиль"
                        aria-current={isProfile ? "page" : undefined}
                    >

                        <UserPen
                        className={isCalendar 
                            ? styles["mainLayout__icone"] 
                            : ""
                        }
                        aria-hidden="true"
                        />

                    </Link>

                    </li>

                </ul>

                </nav>

            </section>

         
            {isCalendarBrigadeChange && <BottomSheetModal/>}
    

        </footer>
    )
}