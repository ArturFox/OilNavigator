//src/api/persons/persons.selectors.ts

import { createSelector } from "@reduxjs/toolkit";
//import type { RootState } from "../../store/new-store";
import { getPesonsApi } from "./persons.api";
import type { PersonsDto } from "./persons.dto";

const personsSelectorResult = getPesonsApi.endpoints.getPesons.select();

export const personsSelector = createSelector(
    personsSelectorResult,
    (result) => result.data ?? []
)

export const personsMap = createSelector(
    personsSelector,
    (persons) => {

        const map = new Map<string, PersonsDto[]>();

        persons.forEach((person) => {
      
            const key = person.brigade_id ?? 'no_brigade';

            if (!map.has(key)) {
                map.set(key, []);
            }

            map.get(key)!.push(person);

        });

        return map;

    }
)

// export const brigadesMapAlarm = createSelector(
//     (state: RootState) => state.date.day,
//     personsMap,
//     (day, brigades) => {

//         const todayDate = new Date();

//         const currentDayString = `${todayDate.getFullYear()}-${String(todayDate.getMonth()+1).padStart(2,'0')}-${String(todayDate.getDate()).padStart(2,'0')}`;

//         const stringDate =  day
//             ? day 
//             : currentDayString

//         const sortPeopleAlarm = Array.from(brigades.values())
//         .flat()
//         .map(f => {
        
//         const inVacation =
//             f.vacation_start &&
//             f.vacation_end &&
//             stringDate >= f.vacation_start &&
//             stringDate <= f.vacation_end;

//         const inSick =
//             f.sick_start &&
//             f.sick_end &&
//             stringDate >= f.sick_start &&
//             stringDate <= f.sick_end;

//         const status: string[] = [];

//         if (inVacation) {
//             status.push('В отпуске');
//         }

//         if (inSick) {
//             status.push('Больничный');
//         }

//         return {...f, status}
//         })

//         const filterAlarm = sortPeopleAlarm.filter(f => f.status.length > 0);

//         const sortfilterAlarm = filterAlarm.sort((a, b) => {

//             const aMin = a.vacation_end ?? a.sick_end ?? '9999-99-99';
//             const bMin = b.vacation_end ?? b.sick_end ?? '9999-99-99';

//             return aMin.localeCompare(bMin);
//         })

//         return sortfilterAlarm

//     }
// )
