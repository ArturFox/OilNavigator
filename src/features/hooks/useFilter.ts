import { useMemo, useState } from "react";
import type { PersonsWithStatus } from "../../entities/persons/types/persons.dto";

interface Props {
    peopleWithStatus: PersonsWithStatus[];
    personToReplace: PersonsWithStatus | undefined;
}

export interface FilterSelected {
    brigadesId: string[];
    jobTitle: string[];
    block: string[];
    discharge: number[];
}

export function useFilter (
    {
        peopleWithStatus,
        personToReplace
    }: Props
) {

    const [inputText, onInputText] = useState<string>('');

    const [filterApply, onfilterApply] = useState<boolean>(false);
    
    const [filters, onFilters] = useState<FilterSelected>({
        brigadesId: [],
        jobTitle: [],
        block: [],
        discharge: []
    });

    const filteredPeople = useMemo(() => {

        return peopleWithStatus.filter((person) => {

            if(!personToReplace){
                return true
            }
            
            if (person.id === personToReplace.id) {
                return false;
            }

            if (filterApply === true) {

                const brigadeMatch =
                    filters.brigadesId.length === 0 ||
                    (person.brigade_id !== null &&
                        filters.brigadesId.includes(person.brigade_id));

                const jobTitleMatch =
                    filters.jobTitle.length === 0 ||
                    filters.jobTitle.includes(person.job_title);

                const blockMatch =
                    filters.block.length === 0 ||
                    filters.block.includes(person.block);

                const dischargeMatch =
                    filters.discharge.length === 0 ||
                    filters.discharge.includes(person.discharge);

                return brigadeMatch && jobTitleMatch && blockMatch && dischargeMatch;
            }

            const searchWords = inputText
                .trim()
                .toLowerCase()
                .split(/\s+/)
                .filter(Boolean);

            if (!searchWords.length) {
                return true;
            }

            const fio = [
                person.surname,
                person.name,
                person.other_surname,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return searchWords.every((word) => fio.includes(word));
        });

    }, [peopleWithStatus, personToReplace, filterApply, filters, inputText]);

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