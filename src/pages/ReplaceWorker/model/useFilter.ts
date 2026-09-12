import { useMemo, useState } from "react";
import type { PersonsWithStatus } from "../../../entities/persons/types/persons.dto";
import type { FilterSelected } from "../types/typeReplaseWorker";
import type { SortShift } from "../../../entities/shifts/types/shifts.dto";

interface Props {
    personWhoWasReplacedId: PersonsWithStatus | null;
    brigadesAndDontBrigade: SortShift[];
    shiftsWithoutBrigadeToday: SortShift | undefined;
}

export function useFilter (
    {
        personWhoWasReplacedId,
        brigadesAndDontBrigade,
        shiftsWithoutBrigadeToday
    }: Props
) {

    const [filterApply, onfilterApply] = useState<boolean>(false);

    const [inputText, onInputText] = useState<string>('');
    
    const [filters, onFilters] = useState<FilterSelected>(

        {
            brigadesId: [],
            jobTitle: [],
            block: [],
            discharge: []
        }

    );

    // Сортируем бригады
    const shiftSortByBrigadeNumber = [...brigadesAndDontBrigade].sort((a, b) => {

        return a.brigade.number_brigade - b.brigade.number_brigade;

    });

    // Получаем массив id людей
    const peopleInBrigadesIds: Set<string> = new Set(

        shiftSortByBrigadeNumber
        .filter((b) => b.brigade.id !== 'no-brigade')
        .flatMap((b) => b.peopleOnThisDay.map((p) => p.id))

    );

    // В массиве 'peopleInBrigadesIds' находим человека из бригады 'no-brigade' 
    // Дальше записываем новый массив 'no-brigade'
    const peopleWithoutBrigadeToday =

        shiftsWithoutBrigadeToday?.peopleOnThisDay.filter((p) => {

            const isPersonInBrigadeToday: boolean = peopleInBrigadesIds.has(p.id);

            return !isPersonInBrigadeToday;

        }) ?? []
    ;

    // 1) Формируем новый массив бригад с обновлённым списком людей в 'no-brigade'
    // 2) и без заменяемого человека
    const shiftSortByBrigadeNumberAndWithoutPersonWhoWasReplaced: SortShift[] =

        shiftSortByBrigadeNumber.map((b) => {

            // 1)
            if (b.brigade.id === 'no-brigade') {

                return {

                    ...b,
                    peopleOnThisDay: peopleWithoutBrigadeToday

                };

            }

            // 2)
            const pp = b.peopleOnThisDay.filter((p) => p.id !== personWhoWasReplacedId?.id);

            return {
                ...b,
                peopleOnThisDay: pp
                
            }

        })
    ;

    const filteredPeople = useMemo(() => {

        if (
            !inputText &&
            filters.brigadesId.length === 0 &&
            filters.jobTitle.length === 0 &&
            filters.block.length === 0 &&
            filters.discharge.length === 0
        ) {
            return shiftSortByBrigadeNumberAndWithoutPersonWhoWasReplaced;
        }

        const m =  shiftSortByBrigadeNumberAndWithoutPersonWhoWasReplaced.map((b) => {

            const p = b.peopleOnThisDay.filter((p) => {

                if(inputText){

                    let searchWord = inputText
                    .trim()
                    .toLocaleLowerCase()
                    .split(/\s+/)
                    .filter(Boolean);

                    let fio = [
                        p.surname,
                        p.name,
                        p.other_surname
                    ]
                    .filter(Boolean)
                    .join(' ')
                    .toLocaleLowerCase();

                    return searchWord.every((word) => fio.includes(word));
                }

                const brigadeMatch: boolean = 
                    filters.brigadesId.length === 0 || 
                    (filters.brigadesId.includes(b.brigade.id));

                const jobTitleMatch = 
                    filters.jobTitle.length === 0 ||
                    filters.jobTitle.includes(p.job_title);

                const blockMatch = 
                    filters.block.length === 0 || 
                    filters.block.includes(p.block);

                const dischargeMatch = 
                    filters.discharge.length === 0 ||
                    filters.discharge.includes(p.discharge);

                return brigadeMatch && jobTitleMatch && blockMatch && dischargeMatch;
            })

            return {
                ...b,
                peopleOnThisDay: p
            }

        });

        return m;

    }, [ filters, inputText, shiftSortByBrigadeNumberAndWithoutPersonWhoWasReplaced]);

    return {
        filteredPeople,
        inputText,
        onInputText,
        filterApply,
        onfilterApply,
        filters,
        onFilters
    };
}