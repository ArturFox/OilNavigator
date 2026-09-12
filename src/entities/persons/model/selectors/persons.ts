//src/api/persons/persons.selector.ts

import { createSelector } from "@reduxjs/toolkit";
import { getPesonsApi } from "../../api/getPersons";
import type { Persons } from "../../types/persons.dto";
import { mappperPerson } from "../mapper/mapper";

// получаем данные от апи
// делаем mapper 
export const personsMapper = createSelector(

    getPesonsApi.endpoints.getPesons.select(),

    (result): Persons[] => {
        
        const persons = result.data?.map((person) => mappperPerson(person)) ?? []

        return persons;

    }

);


// Применяется в 
// Page ReplaceWorker.tsx
export const arrSortedPeopleByDischarge = createSelector(

    personsMapper,

    (persons): Persons[] => {

        const sortedPersons = [...persons]
        .sort((a, b) => (
            b.discharge - a.discharge
        ));

        return sortedPersons;

    }

)

export const personsMap = createSelector(
    
    personsMapper,

    (persons): Map<string, Persons[]>  => {

        const arrSort = [...persons].sort((a, b) => (
            b.discharge - a.discharge
        ));

        const map = new Map<string, Persons[]>();

        arrSort.forEach((person) => {

            const key = person.brigade_id ?? 'no_brigade';

            if (!map.has(key)) {
                map.set(key, []);
            }

            map.get(key)!.push(person);
        })

        return map;
    }
)

export const allBlocks = createSelector(

    personsMapper,

    (persons): string[] => {

        const data = [...persons];

        const arrBlocks: string[] = [];

        data.forEach((person) => {
            if (!arrBlocks.includes(person.block)) {
                arrBlocks.push(person.block);
            }
        })

        return arrBlocks;
    }
)

// Применяется в
// Page CreateVacantion.tsx
export const personsVacationMap = createSelector(

    personsMapper,

    (persons) => {

        const map = new Map<string, Persons[]>();

        const data = [...persons];

        data.forEach((person) => {

            if(!person.vacation_start || !person.vacation_end){
                return
            }

            const start = new Date(person.vacation_start);
            const end = new Date(person.vacation_end);

            while(start <= end) {

                const date = start.toLocaleDateString('ru-RU');

                if(!map.has(date)) {
                    map.set(date, []);
                }

                map.get(date)!.push(person);

                start.setDate(start.getDate() + 1);
            }
        });

        return map;
    }
)