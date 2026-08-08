//src/mock/shifts.selectors.ts

import { createSelector } from "@reduxjs/toolkit";
import type { ShiftDto, SortShift } from "../../types/shifts.dto";
import type { RootState } from "../../../../app/store/store";
import { brigadesMap } from "../../../brigades/model/selectors/brigades";
import { getShiftsApi } from "../../api/getShifts";

// получаю массив объектов расписаний и раскидываю по id бригад 
// от API [
//          {                                      {
//            id: string,                            "brigade_id" => [
//            brigade_id: string;                                     { id, brigade_id, ... },
//            day_index: number;                                      { id, brigade_id, ... },
//            start_time: string | null;  =>  Map    ],
//            end_time: string | null;               "brigade_id" => [
//            label: string;                                          { id, brigade_id, ... },
//            code: string                           ],
//          }                                       }
//        ]
export const shift = createSelector(

  getShiftsApi.endpoints.getShifts.select(),

  (result) => {

    const map = new Map<string, ShiftDto[]>();

    result.data?.forEach((p) => {

      if(!map.has(p.brigade_id)){
        map.set(p.brigade_id, [])
      }

      map.get(p.brigade_id)!.push(p)
    })
    return map;
  }

)

// чтобы при нажатии на день в календаре того же месяца не происходили вычисления двух следующих селекторов 
// если только пользователь выберит другой месяц, то тогда будет персчет двух следующих селекторов
const selectMonth = createSelector(
  (state: RootState) => state.date.day,
  (day) => day.slice(0, 7)
);

// это чтобы нормолизовать дату из бд 2026-01-01 
// потом приводит к дате но тут может быть локальное время 
// поэтому вызываем toDateKey чтобы получить время 00:00 и все стабильно было 
function toDateKey(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// вычисляем на один месяц расписание для каждой бригады
export const createMonthShift = createSelector(
  
  brigadesMap,
  shift,
  selectMonth,
  (br, sh, mo) => {

    const map = new Map<string, SortShift[]>();

    const [year, month] = mo.split("-").map(Number);

    const daysInMonth = new Date(year, month, 0).getDate();

    Array.from(br.values()).forEach((oneBrigade) => {

      if (!oneBrigade.cycle_start_date) return;

      const baseDate = toDateKey(new Date(oneBrigade.cycle_start_date));

      const brigadePattern = (sh.get(oneBrigade.id) ?? []).sort((a,b) => a.day_index - b.day_index);

      if(brigadePattern.length === 0) return;

      for(let day = 1; day <= daysInMonth; day++){

        const currentDate = new Date(year, month - 1, day);

        const diff = Math.floor(
          (currentDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diff < 0) continue;

        const template =
          brigadePattern[diff % brigadePattern.length];

        if (!map.has(oneBrigade.id)) {
          map.set(oneBrigade.id, []);
        }

        const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${String(currentDate.getDate()).padStart(2,'0')}`;
        const dateRussian = `${String(currentDate.getDate()).padStart(2,'0')}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${currentDate.getFullYear()}`;

        map.get(oneBrigade.id)!.push({
          id: `${dateKey}-${oneBrigade.id}`,
          brigadeId: oneBrigade.id,
          startDate: dateKey,
          code: template.code,
          label: template.label,
          startTime: template.start_time,
          endTime: template.end_time,
          russianDate: dateRussian
        });
      }
    })

    return map;
  }
)


// на каждый день отсортировали бригады вначале кто ночью потом утром потом вечером и потом кто отдыхает
export const shiftMap = createSelector(

  createMonthShift,

  (shift) => {

    const sorted = Array.from(shift.values()).flat().sort((a,b) => {

        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);

        if (dateA.getTime() !== dateB.getTime()) {

          return dateA.getTime() - dateB.getTime();
        
        }

        const order = { "Н": 0, "У": 1, "В": 2, "О": 3 };

        return order[a.code as "Н" | "У" | "В" | "О"] - order[b.code as "Н" | "У" | "В" | "О"];

      }
    );

    const map = new Map<string, SortShift[]>();

    for (const shift of sorted) {

      if (!map.has(shift.startDate)) {

        map.set(shift.startDate, []);
    
      }

      map.get(shift.startDate)!.push({
        ...shift,
        startTime: shift.startTime?.slice(0,5) ?? null,
        endTime: shift.endTime?.slice(0,5) ?? null,
      });
    }

    return map;

  }
)