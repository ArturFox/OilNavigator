import type { Persons } from "@/entities/persons/types/persons.dto";
import type { SortShiftDay } from "@/entities/shifts/types/shifts.dto";
import { supabase } from "@/shared/api/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type IdSelectedUser = {
    id: string;
};

interface Props {

    currentWorkerWithProblems: Persons | null;
    shiftsToday: SortShiftDay | null;
    isLoading: boolean;
    brigadeIdParam: string | null;
    personId: string | null;
    dateStore: string;
    refetchData: () => void;

}

export function useSelectedWorkerReplace (
    {
        currentWorkerWithProblems,
        shiftsToday,
        isLoading,
        brigadeIdParam,
        personId,
        dateStore,
        refetchData
    }: Props
) {

    const navigate = useNavigate();

    const [isLoadingReplacePerson, setIsLoadingReplacePerson] = useState<boolean>(false);

    // состояние где хранится id человека 
    // на которого кликнул пользователь
    const [isSelectedNewWorker, setIsSelectedNewWorker] = useState<IdSelectedUser | null>(null);

    const [apply, setApply] = useState<boolean>(false);

    // Пока данные загружаются или отсутствуют,
    // не выполняем дальнейшие вычисления
    if (
        isLoading ||
        !currentWorkerWithProblems ||
        !shiftsToday
    ) {
        return {
            currentWorkerObj: null,
            newWorkerObj: null,
            isLoadingReplacePerson,
            isSelectedNewWorker,
            setIsSelectedNewWorker
        };
    }

    const currentWorkerObj = currentWorkerWithProblems
        ? {
            id: currentWorkerWithProblems.id,
            name: currentWorkerWithProblems.name,
            surname: currentWorkerWithProblems.surname,
            otherSurname: currentWorkerWithProblems.other_surname,
            numberBrigade: currentWorkerWithProblems.brigade_name?.number_brigade ?? null,
            jobTitle: currentWorkerWithProblems.job_title,
            block: currentWorkerWithProblems.block,
            discharge: currentWorkerWithProblems.discharge,
            avalibleBlocks: currentWorkerWithProblems.he_can ?? [],
            objectSelectUser: isSelectedNewWorker,
            setApply: setApply,
            redAlarm: currentWorkerWithProblems.redAlarm ?? [],
            yellowAlarm: currentWorkerWithProblems.yellowAlarm ?? [],
        }
        : null
    ;
    
    // Получили один объект выбранного дня
    // Map {

    //   date: "2026-11-28",

    //   shifts: [                                                 

    //     {
    //       id: "2026-11-28-b3",

    //       brigade: {},

    //       peopleOnThisDay: [],

    //       code: "Н",
    //       label: "Ночь",
    //       date: "2026-11-28",
    //       russianDate: "28-11-2026",
    //       startTime: "20:00",
    //       endTime: "08:00",
    //       isFutureDate: true,
    //       isPastDate: false,
    //       isToday: false,
    //       notHuman: true,
    //       howManyNotHuman: 5,
    //       weekday: "сб",
    //       hasRedAlarm: true,
    //       hasYellowAlarm: false,
    //       color: red,

    //     },
        
    //   ],

    //   personsWithoutBrigade: [],

    //   personsRemovedFromBrigade: []

    // }
    // Теперь преобразуем его вытащив людей из
    // shifts.peopleOnThisDay
    // personsWithoutBrigade
    // personsRemovedFromBrigade
    // И найдем оператора на которого кликнул пользователь
    const newWorker: Persons | null = isSelectedNewWorker && shiftsToday
    ? [
        ...shiftsToday.shifts.flatMap((shift) => shift.peopleOnThisDay),
        ...shiftsToday.personsWithoutBrigade,
        ...shiftsToday.personsRemovedFromBrigade
    ].find((person) => person.id === isSelectedNewWorker.id) ?? null
    : null;
    
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
            objectSelectUser: isSelectedNewWorker,
            setApply: setApply,
            redAlarm: newWorker.redAlarm ?? [],
            yellowAlarm: newWorker.yellowAlarm ?? [],
        }
    : null;

    useEffect(() => {
    
        if(!isSelectedNewWorker){
            return
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }, [isSelectedNewWorker])

    useEffect(() => {
    
        if (
            !apply || 
            !newWorker || 
            !brigadeIdParam || 
            !personId
        ) {
            return;
        }

        async function updatePersonBrigade (){

            if (!newWorker) return;

            try {

                setIsLoadingReplacePerson(true);

                const { error } = await supabase
                    .from('person_replacements')
                    .insert({
                        date: dateStore,
                        person_who_was_replaced_id: personId,
                        person_who_was_replaced_brigade_id: brigadeIdParam,
                        person_replaced_id: newWorker.id,
                        person_replaced_brigade_id: newWorker.brigade_id
                    })
                ;

                if (error) {
                    throw error;
                }

                await refetchData();

                navigate('/');

            } catch (error) {

                console.error(
                    'Ошибка при добавлении замены:',
                    error
                );

            } finally {

                setIsSelectedNewWorker(null);
                setIsLoadingReplacePerson(false);
                setApply(false);

            }

        };
    
        updatePersonBrigade();

    }, [
        apply,
        newWorker,
        brigadeIdParam,
        personId,
        dateStore,
        navigate
    ]);

    return {
        currentWorkerObj,
        newWorkerObj,
        isLoadingReplacePerson,
        isSelectedNewWorker,
        setIsSelectedNewWorker
    }

}