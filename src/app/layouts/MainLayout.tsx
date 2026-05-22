import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowBigLeft, ArrowBigRight, CalendarCheck, UserPen, Wallet } from "lucide-react";
import styles from "../../styles/blocks/home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeDay, type RootState } from "../../store/new-store";

export function MainLayout() {

  const dispatch = useDispatch(); 
  const location = useLocation();

  const isCalendar: boolean = location.pathname === "/";
  const isProfile: boolean = location.pathname === "/profile";
  const isWallet: boolean = location.pathname === '/wallet'

  // получили сегодняшнию дату
  const todayString: string = useSelector((state: RootState) => state.date.day);
  
  const [y,m,d]: number[] = todayString.split('-').map(Number);
  const today: Date = new Date(y, m - 1, d);

  // всегда получаем первый день месяца для того чтобы отображать месяц
  const currentMonthDate: Date = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const month: string = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(currentMonthDate);
  const monthToUpperCase: string = month[0].toUpperCase() + month.slice(1);


  function changeMonth(step: -1 | 1) {

    const nextDate: Date = new Date(
      currentMonthDate.getFullYear(),
      currentMonthDate.getMonth() + step,
      1
    );

    const stringNextDate: string = `${nextDate.getFullYear()}-${String(nextDate.getMonth()+1).padStart(2,'0')}-01`;

    dispatch(changeDay(stringNextDate));
    
  }

  return (

    <main className={styles["main"]}>

      <header className={styles["article__month"]}>

        <span>{monthToUpperCase}</span>

        <div className={styles["article__arrow"]}>

            <span onClick={() => changeMonth(-1)}><ArrowBigLeft/></span>
            <span onClick={() => changeMonth(1)}><ArrowBigRight/></span>

        </div>

      </header>

      <Outlet />

      <footer className={styles["main__bottomBar"]}>
        <Link to="/" className={styles["main__bottomIcone"]}>
          <CalendarCheck className={isCalendar ? styles["main__active"] : ""} />
        </Link>
        <Link to="/wallet" className={styles["main__bottomIcone"]}>
          <Wallet className={isWallet ? styles["main__active"] : ""}/>
        </Link>
        <Link to="/profile" className={styles["main__bottomIcone"]}>
          <UserPen className={isProfile ? styles["main__active"] : ""} />
        </Link>
      </footer>
      
    </main>
  );
}