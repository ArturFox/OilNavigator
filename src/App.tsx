import { useSelector } from "react-redux";
import { type RootState } from "./store/new-store";
import { BrigadeDropdown } from "./components/brigade-dropdown";
import { useMemo, useState } from "react";
import { ICalendarRotate } from "./components/i-calendar-rotate";
import type { BrigadeShift } from "./types/schedule";
import styles from './styles/blocks/home.module.scss'
import { InfoAboutPerson } from "./components/infoAboutPerson";
import { ArrowDown, Bus, CalendarCheck, CookingPot, GraduationCap, UserPen } from "lucide-react";

type BrigadesMap = {
  brigadeOneState: BrigadeShift[];
  brigadeTwoState: BrigadeShift[];
  brigadeThreeState: BrigadeShift[];
  brigadeFourState: BrigadeShift[];
  brigadeFiveState: BrigadeShift[];
};

export default function App() {

    const brigadeOneState = useSelector((state: RootState) => state.allBrigades.brigadeOneState);
    const brigadeTwoState = useSelector((state: RootState) => state.allBrigades.brigadeTwoState);
    const brigadeThreeState = useSelector((state: RootState) => state.allBrigades.brigadeThreeState);
    const brigadeFourState = useSelector((state: RootState) => state.allBrigades.brigadeFourState);
    const brigadeFiveState = useSelector((state: RootState) => state.allBrigades.brigadeFiveState);

    const brigadeOnePeople = useSelector((state: RootState) => state.allPeople.brigadeOnePeople);
    const brigadeTwoPeople = useSelector((state: RootState) => state.allPeople.brigadeTwoPeople);
    const brigadeThreePeople = useSelector((state: RootState) => state.allPeople.brigadeThreePeople);
    const brigadeFourPeople = useSelector((state: RootState) => state.allPeople.brigadeFourPeople);
    const brigadeFivePeople = useSelector((state: RootState) => state.allPeople.brigadeFivePeople);

    const dateS = useSelector((state: RootState) => state.date.d);
    const personFlag = useSelector((state: RootState) => state.date.personFlag)

    const [open, setOpen] = useState<boolean>(false);
    const [viewFilter, setViewFilter] = useState<boolean>(false);

    const brigadeSchedule = useMemo( () =>
      [brigadeOneState, brigadeTwoState, brigadeThreeState, brigadeFourState, brigadeFiveState],
      [brigadeOneState, brigadeTwoState, brigadeThreeState, brigadeFourState, brigadeFiveState]
    );

    const brigadePeople = useMemo ( () => 
      [brigadeOnePeople, brigadeTwoPeople, brigadeThreePeople, brigadeFourPeople, brigadeFivePeople],
      [brigadeOnePeople, brigadeTwoPeople, brigadeThreePeople, brigadeFourPeople, brigadeFivePeople],
    )

    
    const addOneDay = (dateStr: string) => {

      const [day, month, year] = dateStr.split('.').map(Number);
      const daysInMonth = new Date(year, month, 0).getDate();
      let newDay = day + 1;
      let newMonth = month;
      let newYear = year;

      if (newDay > daysInMonth) {
        newDay = 1;
        newMonth += 1;
        if (newMonth > 12) {
          newMonth = 1;
          newYear += 1;
        }
      }

      return `${String(newDay).padStart(2,'0')}.${String(newMonth).padStart(2,'0')}.${newYear}`;
    };


    const allDates = useMemo(() => {

      const arr: BrigadesMap = {
        brigadeOneState: [],
        brigadeTwoState: [],
        brigadeThreeState: [],
        brigadeFourState: [],
        brigadeFiveState: [],
      };

      const keys = Object.keys(arr) as (keyof typeof arr)[];

      for(let i = 0; i < brigadeSchedule.length; i++){

        const key = keys[i];

        const arrObjects = brigadeSchedule[i];
        
        for(let j = 0; j < 18; j++){
          
          for(let k = 0; k < arrObjects.length; k++){

            const baseDate = arrObjects[0].startDate;

            let newDate = baseDate;

            const offset = j * arrObjects.length + k;

            for (let d = 0; d < offset; d++) {
              newDate = addOneDay(newDate);
            }

            arr[key].push({
              ...arrObjects[k],
              id: `${i}-${j}-${k}`,
              startDate: newDate,
            });
          }

        }

      }

      return arr;
      
    }, [brigadeSchedule]);

    const schedule: BrigadeShift[][] = Object.values(allDates);

    const arrSortDates: BrigadeShift[] = schedule
    .flat()
    .sort((a,b) => {
        
        const [dayA, monthA, yearA] = a.startDate.split('.').map(Number);
        const [dayB, monthB, yearB] = b.startDate.split('.').map(Number);

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        if (dateA.getTime() !== dateB.getTime()) {
            return dateA.getTime() - dateB.getTime();
        }

        const order = { "Н": 0, "У": 1, "В": 2, "О": 3 };

        return order[a.code as "Н" | "У" | "В" | "О"] - order[b.code as "Н" | "У" | "В" | "О"];

    })

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }

    const today = new Date();
    const todayHours = today.getHours();
    const formattedToday = formatDate(today);

    const getCurrentPeriod = (hour: number) => {
        if (hour >= 8 && hour < 16) return "morning";   
        if (hour >= 16 && hour < 24) return "evening"; 
        return "night";                                
    };

    const currentPeriod = getCurrentPeriod(todayHours);

    const periodToCode: Record<string, string> = {
        morning: "У",
        evening: "В",
        night: "Н",
    };

    const startIndex = arrSortDates.findIndex( shift => (
        
      
          shift.startDate === formattedToday 
                &&
               shift.code === periodToCode[currentPeriod]
      

    ));

    let start;

    if(dateS){
      start = arrSortDates.findIndex((shift) => (
        shift.startDate === dateS
      ))
    }

    const p: BrigadeShift[] = [];

    if (dateS && start) {
      for (let i = start; i < arrSortDates.length && p.length < 3; i++) {
        if (arrSortDates[i].startDate === dateS) {
          p.push(arrSortDates[i]);
        }
      }
    }

    const g: BrigadeShift[] = [];

    if (startIndex !== -1) {
      
      for (let i = startIndex; i < arrSortDates.length && g.length < 3; i++) {
        if (arrSortDates[i].code !== 'О') {
          g.push(arrSortDates[i]);
        }
      }

    }

    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('.').map(Number);
      return new Date(year, month - 1, day);
    };

    const todayDate = parseDate(formattedToday);

    const alarmPeople = brigadePeople
    .flat()
    .filter((f) => {

      const start = parseDate(f.vacationStart);
      const end = parseDate(f.vacationEnd);

      return todayDate >= start && todayDate <= end;

    })

    let gp: BrigadeShift[] = [];

    if(!dateS){
      gp = g
    } else if (dateS === formattedToday) {
      gp = g
    } else {
      gp = p
    }

   const text: string[] = [
    'Сейчас бригада №',
    'Следующая бригада №',
    'Далее бригада №'
  ]

  return (

    <main className={styles["main"]}>

      <section className={styles["main__topBar"]}>
        <ICalendarRotate arrSortDates={arrSortDates} dateS={dateS}/>
      </section>

      <section className={styles["main__dropdown"]}>

        {viewFilter && (
          <div className={styles["main__filter"]} onClick={() => setOpen(!open)}>
            < ArrowDown size={16}  style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s",  }}/> 
            Кто в этот день
          </div>
        )}

        {gp.map((s, index) => (
          <BrigadeDropdown key={s.id} shift={s} people={brigadePeople} text={text[index]}/>
        ))}

      </section>

      {personFlag && (
        <InfoAboutPerson/>
      )}

      <section className={styles["main__bottomBar"]}>
        <div className={styles["main__bottomIcone"]}><CalendarCheck/>Календарь</div>
        <div className={styles["main__bottomIcone"]}><Bus/>Транспорт</div>
        <div className={styles["main__bottomIcone"]}><GraduationCap/>Учеба</div>
        <div className={styles["main__bottomIcone"]}><CookingPot/>Питание</div>
        <div className={styles["main__bottomIcone"]}><UserPen/>Профиль</div>
      </section>
      
      
    </main>

  );

}
