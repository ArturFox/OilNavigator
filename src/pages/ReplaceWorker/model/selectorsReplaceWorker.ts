import { createSelector } from "@reduxjs/toolkit";
import { brigadesMapper } from "../../../entities/brigades/model/selectors/brigades";
import type { Brigade } from "../../../entities/brigades/types/brigades.dto";
import { personsMapper } from "../../../entities/persons/model/selectors/persons";

export const brigadesSortArr = createSelector(

  brigadesMapper,

  (result): Brigade[] => {

    const brigadesSortArr = [...(result ?? [])].sort((a,b) => a.number_brigade - b.number_brigade);

    return brigadesSortArr;

  }

)

export const jobTitlePerson = createSelector(

    personsMapper,

    (result): string[] => {

        const mySet: Set<string> = new Set();

        result.forEach((person) => {
            
            if(person.job_title){
                mySet.add(person.job_title);
            }
        });

        return [...mySet];
    } 
)

export const blockPerson = createSelector(
    
    personsMapper,

    (result): string[] => {

        const mySet: Set<string> = new Set();

        result.forEach((person) => {

            if(person.block){
                mySet.add(person.block);
            }

        });

        return [...mySet];
    }
)

export const dischargePerson = createSelector(

    personsMapper,

    (result): number[] => {

        const mySet: Set<number> = new Set();

        result.forEach((person) => {

            if(person.discharge){
                mySet.add(person.discharge);
            }

        });

        return [...mySet];
    }
)