import { brigadesMapper } from "@/entities/brigades/model/selectors/mapperBrigades";
import { personsMapper } from "@/entities/persons/model/selector/selectorPersons";
import type { Persons } from "@/entities/persons/types/persons.dto";
import { createSelector } from "@reduxjs/toolkit";

export const peopleMapWhereKeyItsPersonIdReplaseWorkerCoreAdd = createSelector(

    personsMapper,

    (persons): Map<string, Persons> => {

        const map = new Map<string, Persons>();

        persons.forEach((person) => {

            const key: string = person.id;

            if(!map.has(key)){
                map.set(key, person)
            }
        })

        return map;
    }
)

export const peopelSortForHisBrigades = createSelector(

    personsMapper,
    brigadesMapper,

    (people, brigades) => {

        const sortBrigades = [...brigades].sort((a, b) => {
            return a.number_brigade - b.number_brigade;
        });

        const s = new Set([
            'no_brigade',
            ...sortBrigades.map((brigade) => brigade.id)
        ]);

        const y = Array.from(s).map((brigadeId) => ({
            brigadeId,
            people: people.filter((person) =>
                brigadeId === 'no_brigade'
                    ? !person.brigade_id
                    : person.brigade_id === brigadeId
            )
        }));

        return y;
    }

);