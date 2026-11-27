import { useSelector } from "react-redux";
import styles from './AdminHomePage.module.scss';
import { useGetPesonsQuery } from "../../../entities/persons/api/getPersons";
import { useGetBrigadesQuery } from "../../../entities/brigades/api/getBrigades";
import { useGetShiftsQuery } from "../../../entities/shifts/api/getShifts";
import type { SortShift, SortShiftDay } from "../../../entities/shifts/types/shifts.dto";
import type { RootState } from "../../../app/store/store";
import { useGetPersonReplacementQuery } from "../../../entities/personReplacement/api/getPersonReplacement";
import { SceletonAdmin } from "./sceleton/SceletonAdmin";
import { BrigadeDropdown } from "./widgets/BrigadeDropdown/BrigadeDropdown";
import { sortShiftMap } from "./model/selectorsAdminPage";
import { useCalendarDays } from "@/pages/Home/adminPage/hooks/useCalendarDays";
import { CalendarDay } from "@/shared/ui/Calendar/CalendarDay/CalendarDay";

export function AdminHomePage() {

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const shiftsQuery = useGetShiftsQuery();
    const personsReplacementQuery = useGetPersonReplacementQuery();
    //const defaultScheduleTemplatesQuery = useGetDefaultScheduleTemplatesQuery();

    // получаем дату из стора 
    // эту дату отдаем в widget "CalendarAdmin" и "BrigadeDropDown"
    // управляет датой две стрелки в файле "MainLayout",
    // а так же widget "CalendarAdmin"
    // если пользователь нажал на карточку даты в widget "CalendarAdmin", то в сторе меняется дата
    // и засчёт этого динамически отображаются какие бригады работают и отдыхают в widget "BrigadeDropdown" 
    const dateStore: string = useSelector((state: RootState) => state.date.day);

    // расписание в нем алгоритм записывает по дням какая бригада
    // работает утром, вечером, ночью, отдыхает всё в одном дне 
    const shiftsMap: Map<string, SortShiftDay> = useSelector(sortShiftMap);

    // вытащили расписание бригад в конкретный день
    // если пользователь нажал на две стрелки в файле "MainLayout" покажется на первое число
    // либо нажал на карточку даты в widget "CalendarAdmin", покажатся бригады в выбраный день
    const shiftsToday: SortShiftDay | undefined = shiftsMap.get(dateStore);

    // отсортировали кто работает 
    const shiftsWhoWorkToday: SortShift[] = shiftsToday?.shifts.filter(
        s => s.code !== "О"
    ) ?? [];

    // узнаем реальную дату и превращаем в string
    const realDateToday: Date = new Date();
    const stringRealDateToday: string = `${realDateToday.getFullYear()}-${String(realDateToday.getMonth()+1).padStart(2, '0')}-${String(realDateToday.getDate()).padStart(2,'0')}`;

    const isLoading: boolean =
        personsQuery.isLoading ||
        brigadesQuery.isLoading ||
        shiftsQuery.isLoading ||
        personsReplacementQuery.isLoading
    ;

    const {
        selectedDateRef,
        isUserSelectDate,
        selectDate
    } = useCalendarDays({
        dateStore,
        stringRealDateToday,
        isLoading
    });

    // пока от хуков не придет ответ показываем скелетон
    if (isLoading) {
        return <SceletonAdmin />;
    }

    return(

        <main className={styles["main"]}>
            
             <section>

                <ul className={styles['calendar']}>

                    {[...shiftsMap.entries()].map(([stringDate, item]) => (

                        <CalendarDay

                            key={stringDate}

                            day={Number(stringDate.slice(-2))}

                            weekDay={item.shifts[0]?.weekday ?? ''}

                            hasRedAlarm={item.shifts.some(
                                (s) => s.code !== 'О' && s.code !== 'O' && s.hasRedAlarm
                            )}
                            hasYellowAlarm={item.shifts.some(
                                (s) => s.code !== 'О' && s.code !== 'O' && s.hasYellowAlarm
                            )}

                            stringDate={stringDate}

                            checkRealMonth={stringDate.slice(0, 7) === stringRealDateToday.slice(0, 7)}

                            isFutureDate={stringDate > stringRealDateToday}
                            isPastDate={stringDate < stringRealDateToday}
                            isToday={stringDate === stringRealDateToday}

                            dateStore={dateStore}

                            stringRealDateToday={stringRealDateToday}

                            selectedDateRef={selectedDateRef}

                            isUserSelectDate={isUserSelectDate}
                            selectDate={selectDate}
                        />

                    ))}

                </ul>

            </section>

            <section
                className={styles['main__list']}
            >

                <ul className={styles["main__dropdown"]}>

                    {shiftsWhoWorkToday.map((s) => (
                        
                        <BrigadeDropdown
                            key={s.id} 
                            shift={s}  
                        />

                    ))}

                </ul>

            </section>

        </main>
    )
}