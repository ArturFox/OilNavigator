import { useState } from "react";
import { useSelector } from "react-redux";
import styles from './AdminHomePage.module.scss';
import { useGetPesonsQuery } from "../../../entities/persons/api/getPersons";
import { useGetBrigadesQuery } from "../../../entities/brigades/api/getBrigades";
import { useGetShiftsQuery } from "../../../entities/shifts/api/getShifts";
import { personsMap } from "../../../entities/persons/model/selectors/persons";
import { brigadesMap } from "../../../entities/brigades/model/selectors/brigades";
import { shiftMap } from "../../../entities/shifts/model/selectors/shifts";
import type { SortShift } from "../../../entities/shifts/types/shifts.dto";
import type { BrigadesDto } from "../../../entities/brigades/types/brigades.dto";
import type { Persons } from "../../../entities/persons/types/persons.dto";
import type { RootState } from "../../../app/store/store";
import { SceletonAdmin } from "./sceleton/SceletonAdmin";
import { useGetPersonReplacementQuery } from "../../../entities/personReplacement/api/getPersonReplacement";
import { BrigadeDropdown } from "./widgets/BrigadeDropdown/BrigadeDropdown";
import { CalendarAdmin } from "./widgets/CalendarAdmin/CalendarAdmin";

export function AdminHomePage() {

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const shiftsQuery = useGetShiftsQuery();
    const personsReplacement = useGetPersonReplacementQuery();

    // состояние для открытия карточек бригад которые отдыхают
    const [flagArrslakers, setFlagArrslakers] = useState<boolean>(false);

    // получаем дату из стора 
    // эту дату отдаем в widget "CalendarAdmin" и "BrigadeDropDown"
    // управляет датой две стрелки в файле "MainLayout",
    // а так же widget "CalendarAdmin"
    // если пользователь нажал на карточку даты в widget "CalendarAdmin", то в сторе меняется дата
    // и засчёт этого динамически отображаются какие бригады работают и отдыхают в widget "BrigadeDropdown" 
    const dateStore: string = useSelector((state: RootState) => state.date.day);
 
    // люди где они уже отсортированы кто в какой бригаде 
    const personsMapApp = useSelector(personsMap) as Map<string, Persons[]>;

    // бригады какие вообще есть
    const brigadesApp = useSelector(brigadesMap) as Map<string, BrigadesDto>;

    // расписание в нем алгоритм записывает по дням какая бригада
    // работает утром, вечером, ночью, отдыхает всё в одном дне 
    const shiftsMapApp = useSelector(shiftMap);

    // вытащили расписание бригад в конкретный день
    // если пользователь нажал на две стрелки в файле "MainLayout" покажется на первое число
    // либо нажал на карточку даты в widget "CalendarAdmin", покажатся бригады в выбраный день
    const shiftsToday: SortShift[] = shiftsMapApp.get(dateStore) ?? [];

    // отсортировали кто работает 
    const shiftsWhoWorkToday: SortShift[] = shiftsToday.filter(s => s.code !== "О");

    // отсортировали кто отдыхает
    const shiftsWhoRestToday: SortShift[] = shiftsToday.filter(s => s.code === "О");

    // узнаем реальную дату и превращаем в string
    const realDateToday: Date = new Date();
    const stringRealDateToday: string = `${realDateToday.getFullYear()}-${String(realDateToday.getMonth()+1).padStart(2, '0')}-${String(realDateToday.getDate()).padStart(2,'0')}`;

    // сравниваем пользователь в widget CalendarAdmin 
    // выбрал дату которая ровна сегодняшней или больше тогда true
    // если выбрал не сегодня а меньше тогда false и будет серый цвет
    const isFutureDate: boolean = dateStore >= stringRealDateToday;

    // пока от хуков не придет ответ показываем скелетон
    if(personsQuery.isLoading || brigadesQuery.isLoading || shiftsQuery.isLoading){
    
        return (
            <>
                <SceletonAdmin/>
            </>
        )
        
    }

    return(

        <main className={styles["main"]}>
            
            <section>

                <CalendarAdmin
                    personsMapProps={personsMapApp} 
                    shiftsMapProps={shiftsMapApp} 
                    dateStore={dateStore}
                    stringRealDateToday={stringRealDateToday}
                />

            </section>

            <section 
                className={styles["main__changeShift"]}
            >
            
                <button 
                    onClick={() => setFlagArrslakers(!flagArrslakers)}
                    className={`
                        ${styles["main__buttonChangeShift"]}
                        ${flagArrslakers && styles["main__buttonChangeShift--open"]}
                        ${!isFutureDate && styles["main__buttonChangeShift--gray"]}    
                    `}
                    type="button"
                    aria-expanded={flagArrslakers}
                    aria-controls="rest-brigades"
                    aria-label="Показать все бригады"
                >
                    Все бригады
                </button>

            </section>

            <section
                className={styles['main__list']}
            >

                <ul className={styles["main__dropdown"]}>

                    {shiftsWhoWorkToday.map((s) => (
                        
                        <BrigadeDropdown
                            key={s.id} 
                            shift={s} 
                            dateStore={dateStore} 
                            brigadeProps={brigadesApp.get(s.brigadeId)}
                            isFutureDate={isFutureDate}
                        />

                    ))}

                </ul>

                <ul
                    className={`
                        ${styles["main__shadow"]}
                        ${flagArrslakers && styles['main__shadow--open']}    
                    `}
                >

                    {shiftsWhoRestToday.map((s) => (

                        <BrigadeDropdown
                            key={s.id}
                            shift={s}
                            dateStore={dateStore}
                            brigadeProps={brigadesApp.get(s.brigadeId)}
                            isFutureDate={isFutureDate}
                        />
                        
                    ))}

                </ul>

            </section>

        </main>
    )
}