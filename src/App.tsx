import { useDispatch, useSelector } from "react-redux";
import { changeDay, type RootState } from "./store/new-store";
import { BrigadeDropdown } from "./components/brigade-dropdown";
import { ICalendarRotate } from "./components/i-calendar-rotate";
import styles from './styles/blocks/home.module.scss'
import { InfoAboutPerson } from "./components/infoAboutPerson";
import { Bus, CalendarCheck, CookingPot, GraduationCap, UserPen } from "lucide-react";
import { NowIDont } from "./components/nowIDont";
import { useGetPesonsQuery } from "./api/persons/persons.api";
import { personsMap } from "./api/persons/persons.selector";
import { useGetBrigadesQuery } from "./api/brigades/brigades.api";
import { useGetShiftsQuery } from "./api/shifts/shifts.api";
import { shiftSortDates } from "./api/shifts/shifts.selectors";
import { brigades } from "./api/brigades/brigades.selectors";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";


export default function App() {

  const dispatch = useDispatch();

  useGetPesonsQuery(undefined, { refetchOnMountOrArgChange: false });
  useGetBrigadesQuery(undefined, { refetchOnMountOrArgChange: false });
  useGetShiftsQuery(undefined, { refetchOnMountOrArgChange: false });

  const personFlag = useSelector((state: RootState) => state.date.personFlag);
  const personsMapApp = useSelector(personsMap);
  const brigadesApp = useSelector(brigades);
  const arrSortDates = useSelector(shiftSortDates);

  const [flagArrslakers, setFlagArrslakers] = useState<boolean>(false);

  const location = useLocation();
  const isCalendar = location.pathname === "/";
  const isTransport = location.pathname === "/transport";
  const isStudy = location.pathname === "/study";
  const isFood = location.pathname === "/food";
  const isProfile = location.pathname === "/profile";


  
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const stringDate = useSelector((state: RootState) => state.date.day);

  useEffect(() => {
    if (!stringDate) {
      dispatch(changeDay(dateString));
    } 
  }, [stringDate, dateString, dispatch]);
  

  const arr = arrSortDates.get(stringDate) ?? [];

  const arrSort = arr.filter(f => f.code !== 'О');
  const whoRest = arr.filter(f => f.code === 'О');

  return (

    
    <main className={styles["main"]}>

    <Routes>

      <Route path="/" element={
        <>
          <section className={styles["main__topBar"]}>
            <ICalendarRotate 
              peopleMap={personsMapApp} 
              arrSortDates={arrSortDates} 
              stringDateProps={stringDate}
            />
          </section>

          <section className={styles["main__changeShift"]}>
            <button 
              onClick={() => setFlagArrslakers(!flagArrslakers)}
              className={styles["main__buttonChangeShift"]}
            >
              Все бригады
            </button>
            <Link to='/changeShift'>
              <button className={styles["main__buttonChangeShift"]}>
                Изменить расписание
              </button>
            </Link>
          </section>

          <section className={styles["main__dropdown"]}>
            {arrSort.map((shift) => (
              <BrigadeDropdown 
                key={shift.id} 
                shift={shift} 
                people={personsMapApp.get(shift.brigade) ?? []} 
                stringDate={stringDate}
                brigadesProps={brigadesApp}
              />
            ))}

            {flagArrslakers && (
              <div className={styles["main__block"]}>
                <div className={styles["main__line"]}></div>
                <span className={styles["main__rest"]}>Отдыхают</span>
              </div>
            )}

            {flagArrslakers && (
              whoRest.map((shift) => (
                <BrigadeDropdown 
                  key={shift.id}
                  shift={shift}
                  people={personsMapApp.get(shift.brigade) ?? []}
                  stringDate={stringDate}
                  brigadesProps={brigadesApp}
                />
              ))
            )}
          </section>

          {personFlag && <InfoAboutPerson />}
        </>
      } />

      <Route path="/transport" element={<div>Транспорт</div>} />
      <Route path="/study" element={<div>Учёба</div>} />
      <Route path="/food" element={<div>Питание</div>} />
      <Route path="/profile" element={<div>Профиль</div>} />
      <Route path="/changeShift" element={<NowIDont brigadesProps={brigadesApp}/>}/>

    </Routes>

    <section className={styles["main__bottomBar"]}>
      <Link to="/" className={styles["main__bottomIcone"]}>
        <CalendarCheck className={isCalendar ? styles["main__active"] : ""}/>Календарь
      </Link>

      <Link to="/transport" className={styles["main__bottomIcone"]}>
        <Bus className={isTransport ? styles["main__active"] : ""}/>Транспорт
      </Link>

      <Link to="/study" className={styles["main__bottomIcone"]}>
        <GraduationCap className={isStudy ? styles["main__active"] : ""}/>Учёба
      </Link>

      <Link to="/food" className={styles["main__bottomIcone"]}>
        <CookingPot className={isFood ? styles["main__active"] : ""}/>Питание
      </Link>

      <Link to="/profile" className={styles["main__bottomIcone"]}>
        <UserPen className={isProfile ? styles["main__active"] : ""}/>Профиль
      </Link>
    </section>
      
      
    </main>

    
  );

}
