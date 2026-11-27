import { brigadesMapper } from "@/entities/brigades/model/selectors/mapperBrigades";
import type { Brigade } from "@/entities/brigades/types/brigades.dto";
import { personsMapper } from "@/entities/persons/model/selector/selectorPersons";
import type { Persons } from "@/entities/persons/types/persons.dto";
import { createSelector } from "@reduxjs/toolkit";

interface BrigadesWithPeople {
    brigadeId: string;
    people: Persons[];
}

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

    (people, brigades): BrigadesWithPeople[] => {

        // сортируем бригады по номеру
        const sortBrigades: Brigade[] = [...brigades].sort((a, b) => {
            return a.number_brigade - b.number_brigade;
        });

        // проходимся по sortBrigades: Brigade[] 
        // и убираем дубликаты brigadeId
        const uniqueBrigadeIds: Set<string> = new Set([
            'no_brigade',
            ...sortBrigades.map((brigade) => brigade.id)
        ]);

        // создаем бригады с людьми, в которых они находятся
        const brigadesWithPeople: BrigadesWithPeople[] = [...uniqueBrigadeIds].map((brigadeId) => {

            const brigadePeople = people.filter(
                
                (person) => brigadeId === 'no_brigade'
                ? person.brigade_id === null
                : person.brigade_id === brigadeId
            );

            return {

                brigadeId,
                people: brigadePeople

            }

        });

        return brigadesWithPeople;
    }

);

export const filterOptionsSelector = createSelector (

    personsMapper,

    (people) => {

        const jobTitles = [...new Set(people.map((person) => person.job_title))]

        const blocks = [...new Set(people.map((person) => person.block))]

        const discharges = [...new Set(people.map((person) => person.discharge))]

        return {
            jobTitles,
            blocks,
            discharges
        }

    }

)