import type { Persons } from "@/entities/persons/types/persons.dto";
import { useState } from "react";
import { toast } from "sonner";

interface FilterSelected {
    brigadesId: (string | null)[];
    jobTitle: string[];
    block: string[];
    discharge: number[];
    searchUser: string;
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
        discharge: [],
        searchUser: '',
    });

    const applyFunctionFilters = () => {

        if(
            filters.block.length === 0 &&
            filters.brigadesId.length === 0 &&
            filters.jobTitle.length === 0 &&
            filters.discharge.length === 0
        ) {
            toast.error('Вы не выбрали фильтры');
            return
        }

        setIsApplyFilters(true);
        setIsOpenModalFilters(false);

    };

    const resetFunctionFilters = () => {

        setFilters({
            brigadesId: [],
            jobTitle: [],
            block: [],
            discharge: [],
            searchUser: ''
        });

        toast.success('Фильтры сбросили фильтры')

        setIsApplyFilters(false);

    };

    const filteredPeopelSort: BrigadesWithPeople[] = peopelSort.map((brigade) => {

        if (!isApplyFilters && filters.searchUser === '') {
            return brigade;
        }

        const filteredPeople: Persons[] = brigade.people.filter((person) => {

            const matchesBrigade: boolean =
                filters.brigadesId.length === 0 ||
                filters.brigadesId.includes(person.brigade_id)
            ;

            const matchesJobTitle: boolean =
                filters.jobTitle.length === 0 ||
                filters.jobTitle.includes(person.job_title)
            ;

            const matchesBlock: boolean =
                filters.block.length === 0 ||
                filters.block.includes(person.block)
            ;

            const matchesDischarge: boolean =
                filters.discharge.length === 0 ||
                filters.discharge.includes(person.discharge)
            ;

            const matchesSearchUser: boolean =
                filters.searchUser.length === 0 ||
                `${person.name} ${person.surname} ${person.other_surname}`
                .toLowerCase()
                .replace(/[^\p{L}\p{N}]/gu, '')
                .includes(
                    filters.searchUser
                    .toLowerCase()
                    .replace(/[^\p{L}\p{N}]/gu, '')
                )
            ;

            return (
                matchesBrigade &&
                matchesJobTitle &&
                matchesBlock &&
                matchesDischarge &&
                matchesSearchUser
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