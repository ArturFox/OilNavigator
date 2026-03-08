//src/mock/shifts.selectors.ts

import { createSelector } from "@reduxjs/toolkit";
import { getShiftsApi } from "./shifts.api";
import {brigades} from "../brigades/brigades.selectors"
import type { RootState } from "../../store/new-store";
import type { ShiftDto, SortShift } from "./shifts.dto";
import { store } from '../../store/new-store' 
import { personsMap } from "../persons/persons.selector";

const selectShiftPattern = getShiftsApi.endpoints.getShifts.select();
const montDay = (state: RootState) => state.date.day;

export const shift = createSelector(
  selectShiftPattern,
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

function toDateKey(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export const createMonthShift = createSelector(
  
  brigades,
  shift,
  montDay,
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
          brigade: oneBrigade.id,
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

export const shiftMap = createSelector(
  createMonthShift,
  (shift) => {

    const sorted = Array.from(shift.values())
      .flat()
      .sort((a,b) => {

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


  const stringDate = store.getState().date.day
  const mapshiftSortDates = shiftMap(store.getState())
  const mapPerson = personsMap(store.getState())

  const arr = mapshiftSortDates.get(stringDate) ?? [];

  export const arrSort = arr.filter(f => f.code !== 'О');

  

  export const whoRest = arr.filter(f => f.code === 'О');
  const personWhoRest = whoRest.flatMap(p =>
    mapPerson.get(p.brigade) ?? []
  )
  const personWhoNotBrigade = mapPerson.get('no_brigade') ?? []
  export const slackers  = [...personWhoRest, ...personWhoNotBrigade]