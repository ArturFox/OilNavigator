import type { RootState } from "@/app/store/store";
import { useGetBrigadesQuery } from "@/entities/brigades/api/getBrigades";
import type { Brigade } from "@/entities/brigades/types/brigades.dto";
import { useGetPersonReplacementQuery } from "@/entities/personReplacement/api/getPersonReplacement";
import { useGetPesonsQuery } from "@/entities/persons/api/getPersons";
import { useGetShiftsQuery } from "@/entities/shifts/api/getShifts";
import type { Shift, SortShift } from "@/entities/shifts/types/shifts.dto";
import { sortShiftMap } from "@/pages/Home/adminPage/model/selectorsAdminPage";
import { Calendar } from "@/shared/ui/Calendar/Calendar";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from './AdminScheduleChange.module.scss';
import { uniqueObjectArrSortAdminScheduleChang } from "@/pages/AdminScheduleChange/model/selectorsAdminScheduleChange";

export function AdminScheduleChange() {

    // вызываем API хуки 
    const personsQuery = useGetPesonsQuery();
    const brigadesQuery = useGetBrigadesQuery();
    const shiftsQuery = useGetShiftsQuery();
    const personsReplacementQuery = useGetPersonReplacementQuery();

    // селекторы
    const shiftMap: Map<string, SortShift[]> = useSelector(sortShiftMap);
    
    // получаем настоящию сегодняшнию дату
    const todayDate = useSelector((state: RootState) => state.date.todayDate);

    // получаем дату, когда пользователь нажимает на кнопки перелистывания месяца
    // приходит дата в формате "2026-10-01"
    //const stringDateToday = useSelector((state: RootState) => state.date.day);

    // получаем множество дней в расписание то есть уникальные дни
    const uniqueObjectArr: Shift[] = useSelector(uniqueObjectArrSortAdminScheduleChang);

    //const brigadesArr: Brigade[] = useSelector(brigadesArrAdminScheduleChange);

    // состояния
    const [selectBrigade, _] = useState<Brigade[]>([]);

    const entries: [string, SortShift[]][] = [...shiftMap.entries()];

    // const likeButtonRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (!likeButtonRef.current) return;

    //     new LikeButton(likeButtonRef.current);
    // }, []);

    if( personsQuery.isLoading ||
        brigadesQuery.isLoading ||
        shiftsQuery.isLoading ||
        personsReplacementQuery.isLoading
    ){
        return (
            <main>
                <span>
                    загрузка
                </span>
            </main>
        )
    }

    const date = new Date(entries[0][0]);
    
    return(
        <main
            className={styles['adminScheduleChange']}
        >

            <Calendar
                selectBrigade={selectBrigade}
                entries={entries}
                todayDate={todayDate}
                uniqueObjectArr={uniqueObjectArr}
                date={date}
            />

            {/* <div ref={likeButtonRef} /> */}

        </main>
    )
}
// export class LikeButton {

//     container: HTMLElement;
//     isLiked: boolean;

//     constructor(container: HTMLElement) {
//         this.container = container;
//         this.isLiked = false;

//         this.render();
//     }

//     render(): void {
//         this.container.innerHTML = `
//             <button class="like-btn">
//                 ${this.isLiked ? '❤️ Активно' : '🤍 Неактивно'}
//             </button>
//         `;

//         const button = this.container.querySelector(
//             '.like-btn'
//         ) as HTMLButtonElement;

//         button.addEventListener('click', () => this.toggleLike());
//     }

//     toggleLike(): void {
//         this.isLiked = !this.isLiked;
//         this.render();
//     }
// }