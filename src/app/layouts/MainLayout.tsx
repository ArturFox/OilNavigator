import { Link, Outlet, useLocation } from "react-router-dom";
import { AlignVerticalJustifyStartIcon, ArrowBigLeft, ArrowBigRight, CalendarCheck, Highlighter, UserPen } from "lucide-react";
import styles from "../layouts/mainLayout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeDay, type RootState } from "../store/store";
import type { UserRole } from "../../features/auth/model/auth.types";
import { useRef } from "react";

interface Props {
  role: UserRole;
}

export function MainLayout({role}: Props) {

  const dispatch = useDispatch(); 

  const location = useLocation();
  const isCalendar: boolean = location.pathname === "/";
  const isProfile: boolean = location.pathname === "/profile";
  const isVacation: boolean = location.pathname === '/createVacation'
  const isScheduleChange: boolean = location.pathname === '/scheduleChangePage'
  const userChange: boolean = location.pathname === '/userChange'

  // получаем дату из стора 
  // управляет датой две стрелки, которые в этом файле,
  // а так же в следующем файле widget "CalendarAdmin"
  // если пользователь нажал на карточку даты в widget "CalendarAdmin", то в сторе меняется дата
  // и засчёт этого динамически отображаются какие бригады работают и отдыхают в widget "BrigadeDropdown" 
  const dateStore: string = useSelector((state: RootState) => state.date.day);
  
  // детруктуризация из string в number для создания Date
  const [y,m]: number[] = dateStore.split('-').map(Number);
  const selectedDate: Date = new Date(y, m - 1, 1);

  // всегда получаем первый день месяца для того чтобы отображать на верху экрана название выбранного месяца
  const firstDaySelectedDate: Date = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );

  // создаем это название месяца, где первая буква большая
  const month: string = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(firstDaySelectedDate);
  const monthToUpperCase: string = month[0].toUpperCase() + month.slice(1);

  // если пользователь нажал на одну из кнопок 
  // стрелка влево "Предедущий месяц" или срелка вперед "Следующий месяц" 
  // меняем дату допустим с "2026-08-04" на "2026-09-01"
  // то есть всегда новый месяц или предедущий или если вернемся обратно на текущий месяц всегда начало даты с 1 числа
  function changeMonth(step: -1 | 1): void {

    const nextDate: Date = new Date(
      firstDaySelectedDate.getFullYear(),
      firstDaySelectedDate.getMonth() + step,
      1
    );

    const stringNextDate: string = `${nextDate.getFullYear()}-${String(nextDate.getMonth()+1).padStart(2,'0')}-01`;

    dispatch(changeDay(stringNextDate));
    
  }

  const heightHeaderRef = useRef<HTMLElement>(null);

  return (

    <div className={styles["mainLayout"]}>

      

      {userChange === true || isScheduleChange
        ? null
        : <header
            ref={heightHeaderRef} 
            className={styles["mainLayout__header"]}
          >

            <button
              className={styles["mainLayout__headerButton"]}
              onClick={() => changeMonth(-1)}
              aria-label="Предыдущий месяц"
              type="button"
            >
              <ArrowBigLeft aria-hidden="true"/>
            </button>

            <span
              className={styles["mainLayout__headerTitle"]}
            >
              {monthToUpperCase}
            </span>

            <button 
              className={styles["mainLayout__headerButton"]}
              onClick={() => changeMonth(1)}
              aria-label="Следующий месяц"
              type="button"
            >
              <ArrowBigRight aria-hidden="true"/>
            </button>        

          </header>
      }
    
      
      <Outlet />
      

      <footer className={styles["mainLayout__bottomBar"]}>
        
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

            <li
              className={`
                ${styles["mainLayout__navigateItem"]}
                ${userChange && styles["mainLayout__navigateItem--active"]}  
              `}
            >

              <Link
                to="/profile"
                className={`
                  ${styles["mainLayout__link"]}
                  ${userChange && styles["mainLayout__link--active"]}  
                `}
                aria-label="Профиль"
                aria-current={userChange ? "page" : undefined}
              >

                <UserPen
                  className={userChange 
                    ? styles["mainLayout__icone"] 
                    : ""
                  }
                  aria-hidden="true"
                />

              </Link>

            </li>

          </ul>

        </nav>

      </footer>
      
    </div>
  );
}