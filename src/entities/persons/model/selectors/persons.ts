//src/api/persons/persons.selector.ts

import { createSelector } from "@reduxjs/toolkit";
import { getPesonsApi } from "../../api/getPersons";
import type { PersonsDto } from "../../types/persons.dto";

export const personsMap = createSelector(
    
    getPesonsApi.endpoints.getPesons.select(),

    (result) => {

        const arrSort = [...(result.data ?? [])].sort((a, b) => b.discharge - a.discharge);

        const map = new Map<string, PersonsDto[]>();

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
    getPesonsApi.endpoints.getPesons.select(),

    (result) => {

        const data = [...result.data ?? []];

        const arrBlocks: string[] = [];

        data.forEach((person) => {
            if (!arrBlocks.includes(person.block)) {
                arrBlocks.push(person.block);
            }
        })

        return arrBlocks;
    }
)

export const personsVacationMap = createSelector(

    getPesonsApi.endpoints.getPesons.select(),

    (result) => {

        const map = new Map<string, PersonsDto[]>();

        const persons = result.data ?? [];

        persons.forEach((person) => {

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

export const personsBlock = createSelector(

    getPesonsApi.endpoints.getPesons.select(),

    (result) => {

        const map = new Map<string, PersonsDto[]>();

        result.data?.forEach((person) => {

            if(!map.has(person.block)){
                map.set(person.block, []);
            }

            map.get(person.block)!.push(person);
        })

        return map;

    }

)

export const createVacation = createSelector(

    personsBlock,

    (blocks) => {

        const arr = [...blocks.values()];

        for (let i = 0; i < arr.length; i++) {

            for (let j = 0; j < arr[i].length; j++) {

                const person = arr[i][j];

            }

        }
    }
)