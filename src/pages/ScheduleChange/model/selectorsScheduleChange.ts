import { createSelector } from "@reduxjs/toolkit";
import { brigadesMapper } from "../../../entities/brigades/model/selectors/brigades";
import type { Brigade } from "../../../entities/brigades/types/brigades.dto";
import { personsMapper } from "../../../entities/persons/model/selectors/persons";
import type { Persons } from "../../../entities/persons/types/persons.dto";

export const brigadeSortArrScheduleChange = createSelector(
    
    brigadesMapper,

    (brigades): Brigade[] => {

        const sortBrigades = [...brigades].sort(

            (a,b) => a.number_brigade - b.number_brigade

        )

        const noBrigadeItem: Brigade = {
            id: 'no_brigade',
            name: 'Без Бригады',
            cycle_start_date: null,
            installation_id: sortBrigades[0].installation_id,
            number_brigade: 0,
        }

        return [noBrigadeItem, ...sortBrigades];;

    }

)

export const peopleMapScheduleChange = createSelector(

    personsMapper,

    (people) => {

        const arrSort = [...people].sort((a, b) => (
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