import type { Persons } from "@/entities/persons/types/persons.dto";
import { useState } from "react";

interface FilterSelected {
    brigadesId: (string | null)[];
    jobTitle: string[];
    block: string[];
    discharge: number[];
}

interface BrigadesWithPeople {
    brigadeId: string;
    people: Persons[];
}

interface Props {
    peopelSort: BrigadesWithPeople[]
}

export function useFilteredPeopelSort (
    {
        peopelSort
    }: Props
) {

    const [isOpenModalFilters, setIsOpenModalFilters] = useState<boolean>(false);

    const [isApplyFilters, setIsApplyFilters] = useState<boolean>(false);

    const [filters, setFilters] = useState<FilterSelected>({
        brigadesId: [],
        jobTitle: [],
        block: [],
        discharge: []
    });

    const applyFunctionFilters = () => {

        setIsApplyFilters(true);
        setIsOpenModalFilters(false);

    };

    const resetFunctionFilters = () => {

        setFilters({
            brigadesId: [],
            jobTitle: [],
            block: [],
            discharge: []
        });

        setIsApplyFilters(false);

    };

    const filteredPeopelSort: BrigadesWithPeople[] = peopelSort.map((brigade) => {

        if (!isApplyFilters) {
            return brigade;
        }

        const filteredPeople: Persons[] = brigade.people.filter((person) => {

            const matchesBrigade: boolean =
                filters.brigadesId.length === 0 ||
                filters.brigadesId.includes(person.brigade_id);

            const matchesJobTitle: boolean =
                filters.jobTitle.length === 0 ||
                filters.jobTitle.includes(person.job_title);

            const matchesBlock: boolean =
                filters.block.length === 0 ||
                filters.block.includes(person.block);

            const matchesDischarge: boolean =
                filters.discharge.length === 0 ||
                filters.discharge.includes(person.discharge);

            return (
                matchesBrigade &&
                matchesJobTitle &&
                matchesBlock &&
                matchesDischarge
            );
        });

        return {
            ...brigade,
            people: filteredPeople
        };
    })
    .filter((brigade) => brigade.people.length > 0);

    return {
        filters,
        setFilters,

        filteredPeopelSort,

        isOpenModalFilters,
        setIsOpenModalFilters,

        applyFunctionFilters,
        resetFunctionFilters
    }
}