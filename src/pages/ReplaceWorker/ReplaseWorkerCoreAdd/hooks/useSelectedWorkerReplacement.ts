import { useChangePersonBrigadeMutation, useGetPesonsQuery } from "@/entities/persons/api/getPersons";
import type { Persons } from "@/entities/persons/types/persons.dto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type IdSelectedUser = {
    id: string;
};

interface Props {

    peopleMap: Map<string, Persons>;
    brigadeIdParam: string | null

}

export function useSelectedWorkerReplacement(
    {
        peopleMap,
        brigadeIdParam
    }: Props
) {

    const navigate = useNavigate();

    const personsQuery = useGetPesonsQuery();

    const [changePersonBrigade] = useChangePersonBrigadeMutation();

    // состояние где хранится id человека 
    // на которого кликнул пользователь
    const [selectNewWorker, setSelectNewWorker] = useState<IdSelectedUser | null>(null);
    
    const [apply, setApply] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const newWorker: Persons | null = selectNewWorker 
        ? peopleMap.get(selectNewWorker.id) ?? null
        : null
    ;

    const newWorkerObj = newWorker
    ?  {
            id: newWorker.id,
            name: newWorker.name,
            surname: newWorker.surname,
            otherSurname: newWorker.other_surname,
            numberBrigade: newWorker.brigade_name?.number_brigade ?? null,
            jobTitle: newWorker.job_title,
            block: newWorker.block,
            discharge: newWorker.discharge,
            avalibleBlocks: newWorker.he_can ?? [],
            objectSelectUser: selectNewWorker,
            setApply: setApply,
            isLoadingNewWorkerCardProps: isLoading
        }
    : null;


    useEffect(() => {

        if (!apply || !newWorker || !brigadeIdParam) {
            return;
        }

        const updatePersonBrigade = async () => {

            try {

                setIsLoading(true);

                await changePersonBrigade({
                    idPerson: newWorker.id,
                    idClickNewBrigade: brigadeIdParam
                }).unwrap();

                await personsQuery.refetch();

                setIsLoading(false);

                setApply(false);

                navigate('/scheduleChangePage');

            } catch (error) {
                console.error(
                    'Ошибка при добавлении сотрудника в бригаду:',
                    error
                );

                setIsLoading(false);
                setApply(false);
            }
        };

        updatePersonBrigade();

    }, [
        apply,
        newWorker,
        brigadeIdParam,
        changePersonBrigade,
        navigate
    ]);

    useEffect(() => {

        if(!selectNewWorker){
            return
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }, [selectNewWorker])

    return {
        selectNewWorker,
        setSelectNewWorker,

        apply,
        setApply,

        newWorker,
        newWorkerObj,

        isLoading
    };

}