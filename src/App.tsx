import { useSelector } from "react-redux";
import { type RootState } from "./store/new-store";
import { BrigadeDropdown } from "./components/brigade-dropdown";
import { useMemo } from "react";
import { ICalendarRotate } from "./components/i-calendar-rotate";
import type { BrigadeShift, Person } from "./types/schedule";
import styles from './styles/blocks/home.module.scss'
import { InfoAboutPerson } from "./components/infoAboutPerson";
import { Bus, CalendarCheck, CookingPot, GraduationCap, UserPen } from "lucide-react";
import { AlarmPeople } from "./components/alarm-people";

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

  const personFlag = useSelector((state: RootState) => state.date.personFlag);
  const stringDateUserChange = useSelector((state: RootState) => state.date.day);

  const brigadeSchedule = useMemo( () =>
    [brigadeOneState, brigadeTwoState, brigadeThreeState, brigadeFourState, brigadeFiveState],
    [brigadeOneState, brigadeTwoState, brigadeThreeState, brigadeFourState, brigadeFiveState]
  );

  const brigadePeople = useMemo ( () => 
    [brigadeOnePeople, brigadeTwoPeople, brigadeThreePeople, brigadeFourPeople, brigadeFivePeople],
    [brigadeOnePeople, brigadeTwoPeople, brigadeThreePeople, brigadeFourPeople, brigadeFivePeople],
  )

  const peopleMap = useMemo(() => {
    
    const map = new Map<string, Person[]>();

    brigadePeople.flat().forEach((person) => {
      
      if(!map.has(person.brigade)){

        map.set(person.brigade, []);

      }

      map.get(person.brigade)!.push(person);

    });

    return map;

  }, [brigadePeople]) 

  const peopleAlarm = useMemo(() => {

    const todayDate = new Date();

    const parseDate = (dateStr: string) => {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split('.').map(Number);
      return new Date(year, month - 1, day);
    };

    const sortPeopleAlarm = Array.from(peopleMap.values())
    .flat()
    .map(f => {
      const startVacation = parseDate(f.vacationStart);
      const endVacation = parseDate(f.vacationEnd);
      const startSick = parseDate(f.sickStart);
      const endSick = parseDate(f.sickEnd);

      const status: string[] = [];

      if (startVacation && endVacation && todayDate >= startVacation && todayDate <= endVacation) {
          status.push('В отпуске');
      }

      if (startSick && endSick && todayDate >= startSick && todayDate <= endSick) {
          status.push('Больничный');
      }

      return {...f, status}
    })

    const filterAlarm = sortPeopleAlarm.filter(f => f.status.length > 0);

    const sortfilterAlarm = filterAlarm.sort((a, b) => {

      const aDates = [
        parseDate(a.vacationEnd),
        parseDate(a.sickEnd)
      ].filter(Boolean) as Date[]

      const bDates = [
        parseDate(b.vacationEnd),
        parseDate(b.sickEnd)
      ].filter(Boolean) as Date[]

      const aMin = aDates.length ? Math.min(...aDates.map(d => d.getTime())) : Infinity
      const bMin = bDates.length ? Math.min(...bDates.map(d => d.getTime())) : Infinity

      return aMin - bMin
    })

    return sortfilterAlarm

  }, [peopleMap]);


  const brigadesMap = useMemo(() => {

    function addOneD (startDate: string, index: number){
    
      const [day, month, year] = startDate.split('.').map(Number);

      const date = new Date(year, month - 1, day);

      date.setDate(date.getDate() + index);

      const newDay = String(date.getDate()).padStart(2, '0');
      const newMonth = String(date.getMonth() + 1).padStart(2, '0');
      const newYear = date.getFullYear()

      return `${newDay}.${newMonth}.${newYear}`;

    }

    const map = new Map<string, BrigadeShift[]>();

    brigadeSchedule.forEach((brigade) => {

      if(brigade.length === 0) return;

      const baseDate = brigade[0].startDate;

      for(let day = 0; day < 180; day++){

        const template = brigade[day % brigade.length];

        if (!map.has(template.brigade)) {
          map.set(template.brigade, []);
        }

        const newDate = addOneD(baseDate, day);

        map.get(template.brigade)!.push({
          ...template,
          startDate: newDate,
          id: `${newDate}-${template.brigade}-${template.label}`
        });
      }

    });

    return map;

  }, [brigadeSchedule])

  const arrSortDates = useMemo(() => {

    const sorted = Array.from(brigadesMap.values())
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

      }
    );

    const map = new Map<string, BrigadeShift[]>();

    for (const shift of sorted) {

      if (!map.has(shift.startDate)) {

        map.set(shift.startDate, []);
      
      }

      map.get(shift.startDate)!.push(shift);
    }

    return map;

  }, [brigadesMap]);


  const today = new Date();

  const f = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
  );

  const year = f.getFullYear();
  const month = f.getMonth();
  const day = f.getDate();
  
  const stringDate =  stringDateUserChange
                        ? stringDateUserChange 
                        : `${String(day).padStart(2,'0')}.${String(month + 1).padStart(2,'0')}.${year}`
                        

  const arr = arrSortDates.get(stringDate) ?? [];

  const arrSort = arr.filter(f => f.code !== 'О');
  console.log(arrSort)

  return (

    <main className={styles["main"]}>

      <section className={styles["main__topBar"]}>

        <ICalendarRotate peopleMap={peopleMap} arrSortDates={arrSortDates} stringDateProps={stringDate}/>
      
      </section>

      <section className={styles["main__dropdown"]}>

        {arrSort.map((shift) => (
          <BrigadeDropdown key={shift.id} shift={shift} people={peopleMap.get(shift.brigade) ?? []}/>
        ))}

      </section>

      <section className={styles["main__alarmPeople"]}>

        <article className={styles["main__alarmPeopleArticle"]}>

          <h3 className={styles["main__h3"]}>
            Отсутствуют
          </h3>

          {peopleAlarm.map((alarm) => (
            <AlarmPeople 
              key={`${alarm.id}-${stringDate}`}
              alarm={alarm} 
            />
          ))}
        
        </article>
        
        <article className={styles["main__alarmPeopleArticle"]}>
          
          <h3 className={styles["main__h3"]}>
            Изменить
          </h3>
        
        </article>
      
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
