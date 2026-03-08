import { useSelector } from "react-redux";
import { type RootState } from "./store/new-store";
import { BrigadeDropdown } from "./components/brigade-dropdown";
import { ICalendarRotate } from "./components/i-calendar-rotate";
import styles from './styles/blocks/home.module.scss'
import { InfoAboutPerson } from "./components/infoAboutPerson";
import { CalendarCheck, UserPen } from "lucide-react";
import { NowIDont } from "./components/nowIDont";
import { useGetPesonsQuery } from "./api/persons/persons.api";
import { personsMap } from "./api/persons/persons.selector";
import { useGetBrigadesQuery } from "./api/brigades/brigades.api";
import { useGetShiftsQuery } from "./api/shifts/shifts.api";
import { shiftMap } from "./api/shifts/shifts.selectors";
import { brigades } from "./api/brigades/brigades.selectors";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { supabase } from "./supabase";
import type { Session } from "@supabase/supabase-js";
import { SignIn } from "./components/signIn/signIn.index";
import { PersonCart } from './components/personCart/personCart.index'


export default function App() {

  const stringDate = useSelector((state: RootState) => state.date.day);
  const [session, setSession] = useState<Session | null>(null);
  const [flagArrslakers, setFlagArrslakers] = useState<boolean>(false);

  useGetPesonsQuery(undefined, {skip: !session });
  useGetBrigadesQuery(undefined, {skip: !session });
  useGetShiftsQuery(undefined, {skip: !session });

  const personFlag = useSelector((state: RootState) => state.date.personFlag);
  const personsMapApp = useSelector(personsMap);
  const brigadesApp = useSelector(brigades);
  const shiftsMapApp = useSelector(shiftMap);

  const location = useLocation();
  const isCalendar = location.pathname === "/";
  const isProfile = location.pathname === "/profile";

  const arr = shiftsMapApp.get(stringDate) ?? [];

  const arrSort = arr.filter(f => f.code !== 'О');
  const whoRest = arr.filter(f => f.code === 'О');
  
  // ====== ПРОВЕРКА СЕССИИ ======
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    return (
      <Routes>
        <Route path="*" element={<SignIn />} />
      </Routes>
    )
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (

    
    <main className={styles["main"]}>

    <Routes>

      <Route path="/" element={
        <>
          <section className={styles["main__topBar"]}>
            <ICalendarRotate 
              personsMapProps={personsMapApp} 
              shiftsMapProps={shiftsMapApp} 
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
      
      <Route path="/profile" 
        element={
          <main>
            Профиль
            <button onClick={handleLogout}>выйти</button>
          </main>
        } 
      />

      <Route path="/changeShift" element={<NowIDont brigadesProps={brigadesApp}/>}/>
      <Route path="/allPersons" element={<PersonCart personsMapProps={personsMapApp} brigadesMapProps={brigadesApp}/>} />

    </Routes>

    <section className={styles["main__bottomBar"]}>
      <Link to="/" className={styles["main__bottomIcone"]}>
        <CalendarCheck className={isCalendar ? styles["main__active"] : ""}/>
      </Link>

      

      <Link to="/profile" className={styles["main__bottomIcone"]}>
        <UserPen className={isProfile ? styles["main__active"] : ""}/>
      </Link>
    </section>
      
      
    </main>

    
  );

}
