import { createSelector } from "@reduxjs/toolkit";
import { getPersonReplacementApi } from "../../api/getPersonReplacement";
import type { PersonReplacementMapper } from "../../types/personReplacement.dto";
import { mappperPersonReplacement } from "../mapper/mapperPersonReplacement";

export const personsReplacementMapper = createSelector(

    getPersonReplacementApi.endpoints.getPersonReplacement.select(),

    (result): PersonReplacementMapper[] => {
        
        const persons = result.data?.map((person) => mappperPersonReplacement(person)) ?? []

        console.log(persons)

        return persons;

    }

);